import { useRef, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useGame } from '../context/GameContext'

// --- Asteroid Component ---
const Asteroid = ({ initialPosition, initialRotation, speed, orbitRadius, onHit }) => {
  const meshRef = useRef()
  const [exploded, setExploded] = useState(false)
  const angleRef = useRef(Math.random() * Math.PI * 2)

  useFrame((state, delta) => {
    if (!exploded && meshRef.current) {
      angleRef.current += speed * delta
      // Orbit around the center of the planet (0,0,0 local)
      meshRef.current.position.x = Math.sin(angleRef.current) * orbitRadius
      meshRef.current.position.z = Math.cos(angleRef.current) * orbitRadius
      
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  const handleClick = (e) => {
    e.stopPropagation()
    if (!exploded) {
      setExploded(true)
      onHit()
    }
  }

  if (exploded) {
    return (
      <group position={meshRef.current?.position || initialPosition}>
        <Sparkles count={40} scale={4} size={6} speed={3} opacity={1} color="#FF1493" />
        <Sparkles count={20} scale={2} size={8} speed={1} opacity={0.8} color="#00D9FF" />
      </group>
    )
  }

  return (
    <mesh 
      ref={meshRef} 
      position={initialPosition} 
      rotation={initialRotation}
      onClick={handleClick}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'crosshair'; }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}
    >
      <dodecahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial 
        color="#2A2A3A" 
        roughness={0.8} 
        emissive="#FF1493" 
        emissiveIntensity={0.2}
        wireframe={false}
      />
      {/* Target indicator ring */}
      <mesh>
        <torusGeometry args={[2.5, 0.05, 8, 32]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.3} />
      </mesh>
    </mesh>
  )
}

// --- Main Giant Planet Component ---
const GiantPlanet = ({ currentZone = 0 }) => {
  const planetRef = useRef()
  const atmosphereRef = useRef()
  const ringsRef = useRef()
  const { addScore } = useGame()
  const { camera } = useThree()

  // Define camera waypoints for each zone to give cinematic fly-bys
  // The planet is positioned at [15, 0, -20]
  const cameraWaypoints = useMemo(() => [
    { pos: [0, 0, 15], lookAt: [15, 0, -20] },           // 0: Hero - Distant view
    { pos: [5, 10, 5], lookAt: [15, 0, -20] },           // 1: About - High orbit
    { pos: [10, -5, 0], lookAt: [15, 0, -20] },          // 2: Experience - Low orbit, looking up
    { pos: [25, 0, 10], lookAt: [15, 0, -20] },          // 3: Projects - Far right side
    { pos: [5, 5, -5], lookAt: [15, 0, -20] },           // 4: Skills - Inside the ring system
    { pos: [-5, 15, -10], lookAt: [15, 0, -20] },        // 5: Contact - Top down view
    { pos: [0, 0, 30], lookAt: [15, 0, -20] }            // 6: Footer - Zoomed out
  ], []);

  // Generate initial asteroids
  const asteroids = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      speed: (Math.random() * 0.2) + 0.1,
      orbitRadius: 25 + Math.random() * 15,
      position: [0, (Math.random() - 0.5) * 20, 0], // Base Y offset
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0]
    }))
  }, [])

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()

    // Rotate planet slowly
    if (planetRef.current) {
      planetRef.current.rotation.y = time * 0.05
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = time * 0.06
      // Pulse atmosphere
      atmosphereRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.01)
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = time * 0.02
    }

    // Camera cinematic interpolation
    const targetCam = cameraWaypoints[Math.min(currentZone, cameraWaypoints.length - 1)]
    camera.position.lerp(new THREE.Vector3(...targetCam.pos), 0.03)
    
    // Lerp the lookAt
    // Instead of forcing lookAt instantly, we lerp a target vector
    const lookTarget = new THREE.Vector3(...targetCam.lookAt)
    const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position)
    currentLookAt.lerp(lookTarget, 0.03)
    camera.lookAt(currentLookAt)
  })

  return (
    <group position={[15, 0, -20]}>
      {/* Massive Planet Core */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[20, 64, 64]} />
        <meshStandardMaterial 
          color="#0a0a1a" 
          roughness={0.7} 
          metalness={0.2}
          emissive="#6A4C93"
          emissiveIntensity={0.2}
          wireframe={true} // Sci-fi wireframe base
        />
        {/* Solid inner core so we don't see through both sides of the wireframe fully */}
        <mesh>
          <sphereGeometry args={[19.8, 32, 32]} />
          <meshBasicMaterial color="#020205" />
        </mesh>
      </mesh>

      {/* Glowing Atmosphere Layer */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[21, 64, 64]} />
        <meshBasicMaterial 
          color="#00D9FF" 
          transparent 
          opacity={0.15} 
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Majestic Planetary Rings */}
      <mesh ref={ringsRef} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[32, 0.1, 16, 100]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
        <mesh>
          <torusGeometry args={[34, 0.05, 16, 100]} />
          <meshBasicMaterial color="#FF1493" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh>
          <torusGeometry args={[28, 0.8, 16, 100]} />
          <meshBasicMaterial color="#6A4C93" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
        </mesh>
      </mesh>

      {/* Asteroid Swarm (The Game Elements) */}
      <group rotation={[Math.PI / 6, 0, Math.PI / 8]}>
        {asteroids.map((ast) => (
          <Asteroid 
            key={ast.id}
            initialPosition={ast.position}
            initialRotation={ast.rotation}
            speed={ast.speed}
            orbitRadius={ast.orbitRadius}
            onHit={() => addScore(100)}
          />
        ))}
      </group>

      {/* Giant Sun/Light Source off to the side */}
      <pointLight position={[-40, 20, 20]} color="#ffffff" intensity={5} distance={200} />
      <pointLight position={[0, -20, 0]} color="#FF1493" intensity={2} distance={100} />
    </group>
  )
}

export default GiantPlanet
