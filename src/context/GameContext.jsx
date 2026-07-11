import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [health, setHealth] = useState(100);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentZone, setCurrentZone] = useState(0);
  
  const zoneNames = [
    'Mission Target', 
    'Core Systems', 
    'Combat History', 
    'Deployed Assets', 
    'Skill Galaxy', 
    'Comm Link',
    'Terminus'
  ];

  // Audio for UI
  const playSound = useCallback((type) => {
    try {
      let freq, typeOsc, duration;
      
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      if (type === 'shoot') {
        freq = 800;
        typeOsc = 'square';
        duration = 0.1;
        oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + duration);
      } else if (type === 'score') {
        freq = 1200;
        typeOsc = 'sine';
        duration = 0.2;
        oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
        oscillator.frequency.setValueAtTime(freq * 1.5, audioCtx.currentTime + 0.1);
      } else if (type === 'hover') {
        freq = 400;
        typeOsc = 'sine';
        duration = 0.05;
        oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      } else if (type === 'warp') {
        freq = 200;
        typeOsc = 'sawtooth';
        duration = 0.3;
        oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + duration);
      }
      
      oscillator.type = typeOsc;
      
      if (type !== 'hover') {
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
      }

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.log('Audio not supported or disabled', e);
    }
  }, []);

  const addScore = useCallback((points) => {
    setScore(s => {
      const newScore = s + points;
      // Level up logic
      if (newScore > level * 50) {
        setLevel(l => l + 1);
        playSound('score');
      }
      return newScore;
    });
    playSound('shoot');
  }, [level, playSound]);

  return (
    <GameContext.Provider value={{ 
      score, 
      addScore, 
      level, 
      health, 
      setHealth, 
      scrollProgress, 
      setScrollProgress,
      currentZone,
      setCurrentZone,
      zoneNames,
      playSound 
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
