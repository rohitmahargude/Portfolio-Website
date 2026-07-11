import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas } from '@react-three/fiber'
import { Float, PresentationControls, Image } from '@react-three/drei'

// 3D Card using Drei's Image component to render the provided images
const CardImageModel = ({ url, color }) => (
  <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
    <group>
      <Image url={url} scale={[3.5, 2.5, 1]} position={[0, 0, 0]} transparent opacity={0.9} />
      {/* Small floating decorative wireframe behind the image */}
      <mesh position={[0, 0, -0.5]}>
        <planeGeometry args={[3.8, 2.8]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  </Float>
)

const projects = [
  {
    title: "Women Safety Alert System",
    role: "Python | IoT | Real-time Systems",
    color: "#FF1744",
    accent: "from-[#FF1744]/20",
    image: "/Gemini_Generated_Image_6ju8bg6ju8bg6ju8.png",
    description: "Real-time emergency alert system with location tracking, one-touch activation, ensuring women's safety.",
  },
  {
    title: "FlowChat AI Chatbot",
    role: "NLP | TensorFlow | Streamlit",
    color: "#00D9FF",
    accent: "from-[#00D9FF]/20",
    image: "/Gemini_Generated_Image_i2ztvti2ztvti2zt.png",
    description: "Conversational AI built for parsing and processing large datasets, providing context-aware answers.",
  },
  {
    title: "FraudShield AI",
    role: "Scikit-learn | Pandas | ML",
    color: "#FF6B35",
    accent: "from-[#FF6B35]/20",
    image: "/Gemini_Generated_Image_qs471qqs471qqs47.png",
    description: "Machine learning fraud detection pipeline assessing risk in healthcare claims effortlessly in real-time.",
  }
]

const Projects = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    // Playing card dealing effect
    const cards = gsap.utils.toArray('.project-card')
    
    gsap.fromTo(cards, 
      { 
        y: 800,           // Come from far off bottom
        x: (i) => (i === 1 ? 0 : i === 0 ? 300 : -300), // Start clustered in center
        opacity: 0, 
        scale: 0.4, 
        rotationZ: (i) => (i === 1 ? 0 : i === 0 ? 45 : -45), // Splayed like a fan
        rotationX: 45
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "back.out(1.2)", // Bouncy snap into place like slamming a card down
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 10%",
          scrub: 1,
        }
      }
    )

    // Parallax the background glow
    gsap.to('.proj-bg-glow', {
      y: 300,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    })
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="py-24 bg-space-black relative overflow-hidden">
      <div className="proj-bg-glow absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cosmic-purple/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm text-neon-cyan tracking-[0.3em] font-semibold mb-3">PORTFOLIO</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-stellar-white">Featured Projects</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-32">
          {projects.map((project, idx) => (
            <div key={idx} className={`project-card bg-space-blue rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-colors group cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}>
              <div className={`w-full h-64 bg-gradient-to-b ${project.accent} to-space-blue relative`}>
                <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                  <ambientLight intensity={1} />
                  <PresentationControls global config={{ mass: 2, tension: 500 }} snap={{ mass: 4, tension: 1500 }}>
                    <CardImageModel url={project.image} color={project.color} />
                  </PresentationControls>
                </Canvas>
                <div className="absolute top-4 right-4 text-xs font-mono tracking-widest text-stellar-white/80 bg-space-black/50 border border-white/20 px-2 py-1 rounded backdrop-blur-md z-10 pointer-events-none">
                  3D Interactive
                </div>
              </div>

              <div className="p-6">
                <span className="text-xs font-semibold tracking-wider text-stellar-white/60 uppercase" style={{ color: project.color }}>{project.role}</span>
                <h4 className="text-2xl font-bold text-stellar-white mt-2 mb-3">{project.title}</h4>
                <p className="text-stellar-white/70 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                <span className="inline-flex items-center text-sm font-semibold text-stellar-white group-hover:text-neon-cyan transition-colors">
                  Explore Project
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
