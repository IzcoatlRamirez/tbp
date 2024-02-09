
import {CSSProperties } from 'react';

export interface ParticlePositions {
    color?: string;
    position: {
        x: number;
        y: number;
        vx: number; 
        vy: number; 
    }
}

const Particle = ({color,position:{x,y,vx,vy}}:ParticlePositions) => {
  const particleStyle: CSSProperties = {
    position: 'absolute',
    width: '30px',
    height: '30px',
    backgroundColor: `#${color}`,
    borderRadius: '50%',
    left: `${x}px`,
    top: `${y}px`,
    transform: `translate(-50%, -50%) translate(${vx}px, ${vy}px)`, // Aplica las velocidades
  };

  return (
    <div style={particleStyle}></div>
  );
};
export default Particle;
