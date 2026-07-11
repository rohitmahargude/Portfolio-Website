const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-space-black relative overflow-hidden">
      {/* Dynamic Glow Behind Contact Card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex justify-center">
        <div className="w-full max-w-3xl bg-space-blue/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 text-center transform hover:scale-[1.02] transition-transform duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <h2 className="text-sm text-neon-cyan tracking-[0.3em] font-semibold mb-3">GET IN TOUCH</h2>
          <h3 className="text-4xl md:text-6xl font-bold text-stellar-white mb-6">Let's build the future.</h3>
          <p className="text-stellar-white/70 text-lg mb-10 max-w-xl mx-auto">
            Whether you have a question, an exciting project, or just want to say hi, I am always open to exploring new frontiers in AI and development.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
            <a href="mailto:rohitmahargude05@gmail.com" className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-neon-cyan to-cosmic-purple text-stellar-white font-bold tracking-wider hover:shadow-[0_0_30px_rgba(0,217,255,0.6)] transition-shadow duration-300 transform hover:-translate-y-1">
              EMAIL ME
            </a>
            <a href="tel:+919022337064" className="inline-block px-10 py-4 rounded-full border border-neon-cyan/50 text-stellar-white font-bold tracking-wider hover:bg-neon-cyan/10 hover:border-neon-cyan transition-all duration-300 transform hover:-translate-y-1">
              CALL: +91 9022337064
            </a>
          </div>

          <div className="flex justify-center space-x-6 text-stellar-white/50">
            <a href="#" className="hover:text-neon-cyan transition-colors">LinkedIn</a>
            <span>/</span>
            <a href="#" className="hover:text-neon-cyan transition-colors">GitHub</a>
            <span>/</span>
            <a href="mailto:rohitmahargude05@gmail.com" className="hover:text-neon-cyan transition-colors">rohitmahargude05@gmail.com</a>
          </div>
        </div>
      </div>
      
      {/* Floating Particles in CSS */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-neon-cyan rounded-full filter blur-[2px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-32 w-6 h-6 bg-nebula-pink rounded-full filter blur-[4px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  )
}

export default Contact
