import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, Text, OrbitControls, Billboard, Sparkles, Trail } from '@react-three/drei'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

const tags = [
  { name: 'Python', color: '#00D9FF', radius: 4, speed: 0.6 },
  { name: 'SQL', color: '#FF1493', radius: 5.5, speed: 0.5 },
  { name: 'JavaScript', color: '#10B981', radius: 7, speed: 0.4 },
  { name: 'Machine Learning', color: '#FFD700', radius: 8.5, speed: 0.35 },
  { name: 'Deep Learning', color: '#6A4C93', radius: 10, speed: 0.3 },
  { name: 'NLP', color: '#00D9FF', radius: 11.5, speed: 0.25 },
  { name: 'Pandas', color: '#FF1493', radius: 13, speed: 0.2 },
  { name: 'Scikit-learn', color: '#10B981', radius: 14.5, speed: 0.18 },
  { name: 'TensorFlow', color: '#FFD700', radius: 16, speed: 0.15 },
  { name: 'Streamlit', color: '#6A4C93', radius: 17.5, speed: 0.12 },
  { name: 'Flask', color: '#00D9FF', radius: 19, speed: 0.1 },
  { name: 'REST APIs', color: '#FF1493', radius: 20.5, speed: 0.08 },
]

const PlanetNode = ({ data, index }) => {
  const groupRef = useRef()
  const planetRef = useRef()
  const offset = useMemo(() => (index / tags.length) * Math.PI * 2, [index])
  const inclination = useMemo(() => (index % 2 === 0 ? 1 : -1) * (Math.random() * 0.3 + 0.1), [index])
  const hasRing = index % 3 === 0
  const planetRadius = hasRing ? 0.2 : 0.3

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.5
    const angle = time * data.speed + offset
    
    // Elliptical & tilted orbit for 3D realism
    const x = Math.cos(angle) * data.radius
    const z = Math.sin(angle) * data.radius
    const y = Math.sin(angle) * (data.radius * inclination)
    
    groupRef.current.position.set(x, y, z)
    
    if (planetRef.current) {
       planetRef.current.rotation.y += 0.01;
       planetRef.current.rotation.z += 0.005;
    }
  })

  return (
    <group ref={groupRef}>
      <Trail 
        width={1.2} 
        length={12} 
        color={new THREE.Color(data.color)} 
        attenuation={(t) => t * t}
      >
        <mesh ref={planetRef}>
          <sphereGeometry args={[planetRadius, 32, 32]} />
          <meshStandardMaterial 
            color={data.color} 
            emissive={data.color} 
            emissiveIntensity={1.5} 
            roughness={0.2}
            metalness={0.8}
          />
          {/* Atmosphere glow */}
          <mesh>
            <sphereGeometry args={[planetRadius * 1.3, 32, 32]} />
            <meshBasicMaterial 
              color={data.color} 
              transparent 
              opacity={0.2} 
              blending={THREE.AdditiveBlending} 
            />
          </mesh>

          {hasRing && (
            <mesh rotation={[Math.PI / 2.5, 0, 0]}>
              <torusGeometry args={[0.5, 0.015, 16, 64]} />
              <meshStandardMaterial 
                color={data.color} 
                emissive={data.color} 
                emissiveIntensity={2} 
                opacity={0.8} 
                transparent 
                side={THREE.DoubleSide} 
              />
            </mesh>
          )}
        </mesh>
      </Trail>
      
      <Billboard position={[0, 1.2, 0]}>
        <Text
          fontSize={0.5}
          color="#E8F0FF"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#000000"
        >
          {data.name}
        </Text>
      </Billboard>
    </group>
  )
}

const GalacticCore = () => {
  const coreRef = useRef()
  
  useFrame(() => {
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.002
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={coreRef}>
        {/* Bright inner core */}
        <mesh>
          <sphereGeometry args={[1.2, 64, 64]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        
        {/* Intense primary glow */}
        <mesh>
          <sphereGeometry args={[1.6, 64, 64]} />
          <meshBasicMaterial 
            color="#00D9FF" 
            transparent 
            opacity={0.4} 
            blending={THREE.AdditiveBlending} 
          />
        </mesh>
        
        {/* Smooth outer corona */}
        <mesh>
          <sphereGeometry args={[2.8, 64, 64]} />
          <meshBasicMaterial 
            color="#6A4C93" 
            transparent 
            opacity={0.15} 
            blending={THREE.AdditiveBlending} 
          />
        </mesh>
        
        {/* Subtle furthest glow */}
        <mesh>
          <sphereGeometry args={[4.5, 64, 64]} />
          <meshBasicMaterial 
            color="#FF1493" 
            transparent 
            opacity={0.05} 
            blending={THREE.AdditiveBlending} 
          />
        </mesh>
      </group>
      
      <Sparkles count={150} scale={12} size={2} speed={0.3} opacity={0.6} color="#FFD700" />
      <Sparkles count={300} scale={20} size={1.5} speed={0.1} opacity={0.4} color="#00D9FF" />

      <pointLight color="#00D9FF" intensity={10} distance={60} />
      <pointLight color="#6A4C93" intensity={8} distance={40} position={[0, -2, 0]} />
    </Float>
  )
}

const Skills = () => {
  return (
    <section id="skills" className="relative w-full h-[120vh] bg-space-black overflow-hidden flex flex-col">
      <div className="absolute top-10 left-0 w-full z-10 text-center pointer-events-none px-6 mt-12">
        <h2 className="text-sm text-neon-cyan tracking-[0.3em] font-semibold mb-3 drop-shadow-lg">EXPERTISE</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-stellar-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">The Skills Galaxy</h3>
        <p className="max-w-2xl mx-auto text-stellar-white/70 mt-4 backdrop-blur-sm bg-space-black/20 font-mono text-sm inline-block px-4 py-2 rounded-full border border-white/10">
          Drag to explore the Milky Way of technologies.
        </p>
      </div>

      <div className="flex-1 w-full h-full relative cursor-move">
        <Canvas camera={{ position: [0, 10, 25], fov: 60 }}>
          <ambientLight intensity={0.1} />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          
          <GalacticCore />
          
          {tags.map((tag, idx) => (
            <PlanetNode key={idx} data={tag} index={idx} />
          ))}

          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.2} />
          </EffectComposer>

          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            maxPolarAngle={Math.PI / 1.5} 
            minPolarAngle={Math.PI / 4}
            autoRotate
            autoRotateSpeed={0.3}
          />
        </Canvas>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-space-black to-transparent pointer-events-none z-10"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-space-black to-transparent pointer-events-none z-10"></div>
    </section>
  )
}

export default Skills
