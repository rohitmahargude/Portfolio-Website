import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGame } from '../context/GameContext'

const Hero = () => {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const imageRef = useRef(null)
  const { playSound } = useGame()

  useEffect(() => {
    // Parallax and fade effect tied directly to scroll
    gsap.to(contentRef.current, {
      y: 150,
      opacity: 0,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: 100,
        scale: 1.1,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })
    }
  }, [])

  return (
    <section ref={heroRef} id="home" className="relative w-full h-screen overflow-hidden bg-space-blue flex flex-col md:flex-row items-center justify-center pt-20">
      
      {/* Background Video Component */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 mix-blend-screen filter brightness-125 pointer-events-none"
      >
        <source src="/generate_cinematic_short_202604031536.mp4" type="video/mp4" />
      </video>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center h-full pointer-events-none">
        {/* Text Content */}
        <div ref={contentRef} className="w-full max-w-4xl text-center mb-12 md:mb-0">
          <h2 className="text-neon-cyan font-semibold tracking-[0.2em] uppercase mb-4 text-sm md:text-base animate-fade-in-up drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]">
            Mission Target Detected
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-stellar-white via-neon-cyan to-cosmic-purple drop-shadow-[0_0_20px_rgba(0,217,255,0.4)] animate-slide-up">
            Rohit Mahargude
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-stellar-white/80 font-light leading-relaxed animate-fade-in-up delay-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Level 99 AI Architect. Building intelligent systems that solve real-world problems through artificial intelligence and deep learning.
          </p>
          
          <div className="mt-10 pointer-events-auto flex flex-wrap gap-6 justify-center">
            <a 
              href="#projects" 
              onMouseEnter={() => playSound('hover')}
              className="px-8 py-3 rounded-none border-2 border-neon-cyan bg-space-black/50 text-neon-cyan font-mono font-bold tracking-widest hover:bg-neon-cyan hover:text-space-black hover:shadow-[0_0_20px_rgba(0,217,255,0.8)] transition-all duration-300 cursor-pointer uppercase"
            >
              [ View Missions ]
            </a>
            <a 
              href="#contact" 
              onMouseEnter={() => playSound('hover')}
              className="px-8 py-3 rounded-none border-2 border-cosmic-purple/50 text-stellar-white font-mono font-bold tracking-widest hover:bg-cosmic-purple/20 hover:border-cosmic-purple transition-all duration-300 cursor-pointer backdrop-blur-sm uppercase"
            >
              [ Comm Link ]
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce opacity-70 pointer-events-none">
        <span className="text-xs tracking-widest text-stellar-white uppercase mb-2 font-mono">Scroll to Continue</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-stellar-white to-transparent"></div>
      </div>
    </section>
  )
}

export default Hero
