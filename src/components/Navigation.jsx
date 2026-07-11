import { useState, useEffect } from 'react'
import { gsap } from 'gsap'

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo('.nav-item', 
      { y: -20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    )
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-space-blue/80 backdrop-blur-md py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="nav-item text-2xl font-bold tracking-tighter text-stellar-white hover:text-neon-cyan transition-colors duration-300 drop-shadow-[0_0_10px_rgba(0,217,255,0.3)]">
          RM<span className="text-neon-cyan">.</span>
        </a>
        
        <div className="hidden md:flex space-x-8">
          {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="nav-item text-sm font-medium text-stellar-white/80 hover:text-neon-cyan hover:drop-shadow-[0_0_8px_rgba(0,217,255,0.5)] transition-all duration-300"
            >
              {item}
            </a>
          ))}
        </div>
        
        <button className="nav-item md:hidden text-stellar-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Navigation
