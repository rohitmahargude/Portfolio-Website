import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const experiences = [
  {
    title: "AI Intern",
    company: "Persistent Systems",
    date: "Dec 2025 – Mar 2026",
    location: "Remote",
    description: "Worked as an AI Intern contributing to the development of FraudShield AI, an intelligent fraud detection system designed for health insurance claims. Focused on building smart solutions using artificial intelligence to identify suspicious patterns and improve claim validation processes.",
    responsibilities: [
      "Developed AI-based fraud detection logic",
      "Worked with Python for data processing and model integration",
      "Analyzed insurance claim data for anomaly detection",
      "Collaborated with team on AI model improvements"
    ],
    skills: ["Python", "Artificial Intelligence", "Data Analysis"],
    color: "#00D9FF"
  },
  {
    title: "Assembly Specialist Intern",
    company: "Trueview India",
    date: "Jun 2025 – Jul 2025",
    location: "On-site",
    description: "Worked as an Assembly Specialist Intern in the hardware manufacturing team, contributing to the production of smart TVs and display systems. Gained hands-on experience in assembling and ensuring the quality of electronic components.",
    responsibilities: [
      "Assembled high-quality display units and smart boards",
      "Ensured precision in hardware component integration",
      "Worked in a team-based manufacturing environment",
      "Maintained production quality standards"
    ],
    skills: ["Assembly Processes", "Hardware Handling", "Teamwork"],
    color: "#10B981"
  },
  {
    title: "Quality Checker Intern",
    company: "Dhoot Electrical Systems Pvt. Ltd.",
    date: "Jun 2024 – Jul 2024",
    location: "On-site",
    description: "Worked as a Quality Checker Intern focusing on maintaining product quality and ensuring compliance with industry standards. Gained practical experience in inspection processes and quality assurance techniques.",
    responsibilities: [
      "Performed product quality inspections",
      "Ensured adherence to quality standards",
      "Identified defects and reported issues",
      "Assisted in maintaining quality control processes"
    ],
    skills: ["Quality Assurance", "Inspection", "Analysis"],
    color: "#FF1493"
  },
  {
    title: "Teacher (Part-Time)",
    company: "Savitribai Phule Mahila Ekatma Samaj Mandal (SPMESM)",
    date: "Aug 2022 – Apr 2023",
    location: "",
    description: "Worked as a part-time teacher, focusing on student development and educational support. Contributed to creating a positive learning environment and helping students improve their academic performance.",
    responsibilities: [
      "Taught and guided students in academic subjects",
      "Developed learning materials and teaching strategies",
      "Supported student growth and development",
      "Maintained a collaborative and engaging classroom environment"
    ],
    skills: ["Communication", "Teaching", "Leadership"],
    color: "#FFD700"
  }
]

const Experience = () => {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    // Animate the central connecting timeline line matching scroll
    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      }
    )

    // Stagger the 3D cards
    const cards = gsap.utils.toArray('.exp-card')
    cards.forEach((card, idx) => {
      const isLeft = idx % 2 === 0
      gsap.fromTo(card, 
        { 
          x: isLeft ? -100 : 100, 
          opacity: 0,
          rotationY: isLeft ? 15 : -15,
          scale: 0.9
        },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 60%",
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        }
      )
    })
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="py-24 bg-space-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-sm text-neon-cyan tracking-[0.3em] font-semibold mb-3">CAREER PATH</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-stellar-white">Professional Experience</h3>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Timeline Graphic */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white/5 rounded-full hidden md:block">
            <div ref={lineRef} className="w-full h-full bg-gradient-to-b from-neon-cyan via-cosmic-purple to-nebula-pink rounded-full origin-top"></div>
          </div>

          <div className="flex flex-col space-y-12 md:space-y-24">
            {experiences.map((exp, idx) => {
              const isLeft = idx % 2 === 0
              
              return (
                <div key={idx} className={`flex flex-col md:flex-row items-center justify-between w-full ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-space-black bg-neon-cyan z-20 shadow-[0_0_15px_rgba(0,217,255,0.8)]" style={{ backgroundColor: exp.color, boxShadow: `0 0 15px ${exp.color}80` }}></div>
                  
                  {/* Space filler for alternating layout */}
                  <div className="hidden md:block w-5/12"></div>
                  
                  {/* Card Content */}
                  <div className="w-full md:w-5/12 perspective-[1000px] animate-float-slow">
                    <div className={`exp-card transform-gpu preserve-3d bg-space-blue/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/30 transition-colors relative overflow-hidden group`}>
                      
                      {/* Subdued Glow effect behind card */}
                      <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 pointer-events-none" style={{ backgroundColor: exp.color }}></div>

                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-2xl font-bold text-stellar-white drop-shadow-md">{exp.title}</h4>
                          <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: exp.color }}>{exp.company}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-xs font-mono text-stellar-white/50 mb-6 space-x-4">
                        <span className="bg-white/5 px-2 py-1 rounded inline-block">{exp.date}</span>
                        {exp.location && <span className="inline-block">{exp.location}</span>}
                      </div>

                      <p className="text-sm text-stellar-white/70 leading-relaxed mb-6">
                        {exp.description}
                      </p>

                      <ul className="space-y-2 mb-6">
                        {exp.responsibilities.map((task, i) => (
                          <li key={i} className="text-sm text-stellar-white/80 flex items-start">
                            <span className="mr-2 outline-none" style={{ color: exp.color }}>▹</span>
                            {task}
                          </li>
                        ))}
                      </ul>

                      <div className="border-t border-white/10 pt-4 flex flex-wrap gap-2">
                        {exp.skills.map((skill, i) => (
                          <span key={i} className="text-xs font-mono px-3 py-1 rounded-full bg-space-black/50 border border-white/5 text-stellar-white/60 group-hover:text-stellar-white transition-colors">
                            {skill}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
