import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { gsap } from 'gsap';

const HUD = () => {
  const { score, level, health, scrollProgress, currentZone, zoneNames } = useGame();

  useEffect(() => {
    // Animate score change
    gsap.fromTo('.score-text', 
      { scale: 1.5, color: '#FFD700' }, 
      { scale: 1, color: '#00D9FF', duration: 0.5 }
    );
  }, [score]);

  useEffect(() => {
    // Animate level up
    if (level > 1) {
      gsap.fromTo('.level-text', 
        { scale: 2, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.3)' }
      );
    }
  }, [level]);

  useEffect(() => {
    // Animate zone change
    gsap.fromTo('.zone-text', 
      { opacity: 0, x: 20 }, 
      { opacity: 1, x: 0, duration: 0.5 }
    );
  }, [currentZone]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-6">
      {/* Top HUD */}
      <div className="flex justify-between items-start w-full">
        {/* Top Left: Score and Level */}
        <div className="flex flex-col gap-2">
          <div className="bg-space-black/60 border border-neon-cyan/50 backdrop-blur-md px-6 py-2 rounded-tr-2xl rounded-bl-2xl shadow-[0_0_15px_rgba(0,217,255,0.3)]">
            <span className="text-stellar-white/70 text-xs tracking-[0.2em] uppercase font-mono">Score</span>
            <div className="text-3xl font-black text-neon-cyan score-text font-mono tracking-wider">
              {score.toString().padStart(6, '0')}
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-space-black/60 border border-cosmic-purple/50 backdrop-blur-md px-4 py-1.5 rounded-r-full shadow-[0_0_10px_rgba(106,76,147,0.3)] w-max">
            <div className="w-6 h-6 rounded-full bg-cosmic-purple flex items-center justify-center text-xs font-bold text-white">
              L
            </div>
            <span className="text-stellar-white font-mono font-bold tracking-widest level-text">
              RANK {level}
            </span>
          </div>
        </div>

        {/* Top Right: Mission/Status */}
        <div className="text-right flex flex-col items-end gap-2">
          <div className="bg-space-black/60 border border-neon-cyan/30 backdrop-blur-md px-6 py-3 rounded-tl-2xl rounded-br-2xl flex flex-col items-end shadow-[0_0_15px_rgba(0,217,255,0.1)]">
             <span className="text-stellar-white/50 text-[10px] tracking-[0.3em] uppercase mb-1">Current Level</span>
             <span className="text-neon-cyan text-lg font-mono font-bold uppercase tracking-wider zone-text">
               {zoneNames[Math.min(currentZone, zoneNames.length - 1)] || 'Exploring'}
             </span>
          </div>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="flex justify-between items-end w-full">
        {/* Bottom Left: Health/Energy (Scroll Progress) */}
        <div className="w-64 flex flex-col gap-1.5">
          <div className="flex justify-between items-end">
            <span className="text-neon-cyan text-xs font-mono font-bold tracking-widest">SYS_ENERGY</span>
            <span className="text-stellar-white text-xs font-mono">{Math.round(scrollProgress)}%</span>
          </div>
          <div className="w-full h-3 bg-space-black/80 border border-stellar-white/20 rounded-full overflow-hidden p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-neon-cyan to-cosmic-purple rounded-full relative"
              style={{ width: `${scrollProgress}%` }}
            >
              <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/40 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
        
        {/* Bottom Right: Radar/Minimap placeholder */}
        <div className="w-24 h-24 rounded-full border border-neon-cyan/40 bg-space-black/40 backdrop-blur-sm relative overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(0,217,255,0.1)]">
           <div className="absolute inset-0 border-4 border-neon-cyan/10 rounded-full"></div>
           <div className="w-full h-[1px] bg-neon-cyan/20 absolute"></div>
           <div className="w-[1px] h-full bg-neon-cyan/20 absolute"></div>
           {/* Radar scan line */}
           <div className="absolute w-1/2 h-1/2 top-0 right-0 bg-gradient-to-bl from-neon-cyan/30 to-transparent origin-bottom-left animate-[spin_4s_linear_infinite]"></div>
           {/* Player dot */}
           <div className="w-2 h-2 rounded-full bg-stellar-white shadow-[0_0_5px_#fff]"></div>
        </div>
      </div>
      
      {/* Custom Crosshair Center Indicator */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none opacity-30 border border-stellar-white/50 rounded-full flex items-center justify-center">
         <div className="w-1 h-1 bg-neon-cyan rounded-full"></div>
      </div> */}
    </div>
  );
};

export default HUD;
