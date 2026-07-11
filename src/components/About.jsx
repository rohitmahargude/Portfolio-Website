import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stagger-item', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-24 relative bg-transparent flex items-center h-full">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 flex justify-center perspective-[1000px] stagger-item">
            <div className="animate-float-slow relative w-80 h-96 rounded-3xl bg-space-black/50 border border-white/20 overflow-hidden transform-gpu preserve-3d group cursor-pointer hover:-rotate-y-12 transition-transform duration-500 shadow-[0_0_30px_rgba(106,76,147,0.3)]">
              {/* Profile Image */}
              <img 
                src="/WhatsApp_Image_2026-03-05_at_9.11.23_PM-removebg-preview.png" 
                alt="Rohit Mahargude" 
                className="absolute inset-0 w-full h-full object-cover object-top scale-110 group-hover:scale-100 transition-transform duration-500 z-0 filter brightness-110 contrast-125" 
              />
              
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-space-black via-space-black/80 to-transparent z-10 transition-opacity duration-300"></div>
              
              <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end p-8">
                <p className="text-neon-cyan text-sm font-mono tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-lg">Location: India</p>
                <h3 className="text-3xl font-bold text-stellar-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Rohit Mahargude</h3>
              </div>
              
              {/* Corner Glint */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan rounded-full mix-blend-overlay filter blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"></div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-sm text-neon-cyan tracking-[0.3em] font-semibold mb-3 stagger-item">ABOUT ME</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-stellar-white mb-6 stagger-item drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Discover the logic behind the code.</h3>
            <p className="text-stellar-white/80 text-lg mb-10 leading-relaxed stagger-item font-light">
              Based in Pimpri-Chinchwad, Maharashtra, I am passionate about constructing intelligent systems that push boundaries. With a sharp focus on Artificial Intelligence, Deep Learning, and Real-time Systems, my mission is to synthesize data into actionable, high-impact technologies.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 stagger-item">
              
              {/* Achievement Card: Limitless E-Book */}
              <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-md overflow-hidden hover:border-neon-cyan transition-colors duration-500 cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* 3D Book Icon Effect */}
                <div className="w-12 h-14 mb-4 relative transform-gpu preserve-3d group-hover:rotate-y-12 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cosmic-purple to-neon-cyan rounded-sm shadow-lg border border-white/30 flex items-center justify-center overflow-hidden">
                    <div className="absolute left-0 w-1 h-full bg-white/40 mix-blend-overlay"></div>
                    <span className="text-[8px] font-black tracking-widest text-white/90 -rotate-90 origin-center whitespace-nowrap">LIMITLESS</span>
                  </div>
                </div>

                <h4 className="text-xs text-neon-cyan tracking-widest font-mono mb-1 uppercase">Published E-Book</h4>
                <p className="text-xl font-bold text-stellar-white leading-tight">Limitless: In the AI Era</p>
                
                {/* Glow effect */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-neon-cyan rounded-full mix-blend-screen filter blur-[40px] opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              </div>

              {/* Skill Core Card */}
              <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-md overflow-hidden hover:border-nebula-pink transition-colors duration-500 cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-br from-nebula-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex items-end gap-2 mb-4">
                  <h4 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-nebula-pink to-stellar-white">90</h4>
                  <span className="text-xl text-nebula-pink font-bold mb-1">%</span>
                </div>
                
                <h4 className="text-xs text-nebula-pink tracking-widest font-mono mb-1 uppercase">Core Proficiency</h4>
                <p className="text-lg font-bold text-stellar-white leading-tight">AI & Machine Learning Architecture</p>

                {/* Glow effect */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-nebula-pink rounded-full mix-blend-screen filter blur-[40px] opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
