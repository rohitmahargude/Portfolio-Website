import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import HUD from './components/HUD'
import GiantPlanet from './components/GiantPlanet'
import { useGame } from './context/GameContext'

function App() {
  const { setScrollProgress, currentZone, setCurrentZone, playSound } = useGame()
  const mainRef = useRef(null)

  const handleScroll = (e) => {
    const target = e.target;
    const scrollHeight = target.scrollHeight - target.clientHeight;
    if (scrollHeight > 0) {
      const progress = (target.scrollTop / scrollHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      
      const newZone = Math.round(target.scrollTop / window.innerHeight);
      if (newZone !== currentZone) {
         setCurrentZone(newZone);
         playSound('warp');
      }
    }
  }

  return (
    <div className="bg-transparent text-stellar-white h-screen w-full overflow-hidden selection:bg-neon-cyan/30 selection:text-stellar-white relative game-cursor">
      
      {/* Background 3D Layer (Global Entity) */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[#030610]">
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <ambientLight intensity={0.2} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={1.5} />
          <GiantPlanet currentZone={currentZone} />
          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
          </EffectComposer>
        </Canvas>
      </div>

      <HUD />
      <Navigation />
      
      {/* Game Levels Snap Container */}
      <main 
        ref={mainRef}
        onScroll={handleScroll}
        className="snap-container absolute inset-0 z-10"
      >
        <div className="snap-section relative"><Hero /></div>
        <div className="snap-section relative"><About /></div>
        <div className="snap-section relative"><Experience /></div>
        <div className="snap-section relative"><Projects /></div>
        <div className="snap-section relative"><Skills /></div>
        <div className="snap-section relative"><Contact /></div>
        <div className="snap-section relative"><Footer /></div>
      </main>
    </div>
  )
}

export default App
