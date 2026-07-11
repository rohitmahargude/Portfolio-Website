const Footer = () => {
  return (
    <footer className="bg-space-black py-12 relative overflow-hidden border-t border-white/10">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-cosmic-purple to-transparent opacity-50 blur-[2px]"></div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {/* Brand Col */}
          <div>
            <h3 className="text-2xl font-bold text-stellar-white mb-4">Rohit Mahargude</h3>
            <p className="text-stellar-white/60 text-sm max-w-xs mx-auto md:mx-0">
              Building intelligent systems that solve real-world problems.
            </p>
          </div>

          {/* Nav Col */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <h4 className="font-semibold text-neon-cyan mb-2 tracking-wider text-sm">EXPLORE</h4>
            {['Home', 'About', 'Projects', 'Skills'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-stellar-white/60 hover:text-stellar-white transition-colors text-sm">
                {link}
              </a>
            ))}
          </div>

          {/* Socials Col */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h4 className="font-semibold text-neon-cyan mb-2 tracking-wider text-sm">CONNECT</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-space-blue border border-white/10 flex items-center justify-center hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all">
                <span className="text-sm">GH</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-space-blue border border-white/10 flex items-center justify-center hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all">
                <span className="text-sm">IN</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-space-blue border border-white/10 flex items-center justify-center hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all">
                <span className="text-sm">TW</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stellar-white/40">
            &copy; {new Date().getFullYear()} Rohit Mahargude. All rights reserved.
          </p>
          <div className="text-xs text-stellar-white/40 flex items-center gap-2">
            Designed with <span className="text-nebula-pink">❤</span> & Antigravity Physics
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
