import React, { useState, useEffect } from 'react';
import Particle from './components/Particle';
import Button from '@mui/material/Button';

interface ParticleState {
  color: string;
  position: {
    x: number;
    y: number;
    vx: number;
    vy: number;
  };
}

const screenWidth = 1500; // Ancho de la pantalla
const screenHeight = 700; // Alto de la pantalla

const App: React.FC = () => {
  const rojo = 'ec7063';
  const azul = '5dade2';
  // Ajustes para lograr una órbita más notoria
  const initialX1 = 750; // Posición inicial de la partícula1 en el centro
  const initialY1 = 350; // Posición inicial de la partícula1 en el centro
  const initialX2 = 900; // Posición inicial de la partícula2
  const initialY2 = 350; // Posición inicial de la partícula2

  const initialVx1 = 2; // Partícula1 comienza en reposo
  const initialVy1 = 3; // Velocidad inicial de la partícula1
  const initialVy2 = 1; // Partícula2 comienza en reposo

  const G = 0.5; // Gravitational constant (ajustar según sea necesario)
  const dt = 1; // Time step (ajustar según sea necesario)

  const calculateGravity = (m1: number, m2: number, distance: number): number => {
    const force = (G * m1 * m2) / Math.pow(distance, 2);
    return force;
  };

  const [vx2, setVx2] = useState(0);

  const [particleStates, setParticleStates] = useState<{
    particle1: ParticleState;
    particle2: ParticleState;
  }>({
    particle1: { color: rojo, position: { x: initialX1, y: initialY1, vx: initialVx1, vy: initialVy1 } },
    particle2: { color: azul, position: { x: initialX2, y: initialY2, vx: vx2, vy: initialVy2 } },
  });

  const handleSetInitialVx = () => {
    setParticleStates({
      particle1: { color: rojo, position: { x: initialX1, y: initialY1, vx: initialVx1, vy: initialVy1 } },
      particle2: { color: azul, position: { x: initialX2, y: initialY2, vx: vx2, vy: initialVy2 } },
    });
  };

  const updateParticlePositions = () => {
    setParticleStates((prevState) => {
      const { particle1, particle2 } = prevState;

      const distance12 = Math.sqrt(
        Math.pow(particle2.position.x - particle1.position.x, 2) +
        Math.pow(particle2.position.y - particle1.position.y, 2)
      );

      const force12 = calculateGravity(100, 10, distance12);

      const ax1 = (force12 * (particle2.position.x - particle1.position.x)) / distance12;
      const ay1 = (force12 * (particle2.position.y - particle1.position.y)) / distance12;

      const ax2 = -ax1;
      const ay2 = -ay1;

      particle1.position.vx += ax1 * dt;
      particle1.position.vy += ay1 * dt;

      particle2.position.vx += ax2 * dt;
      particle2.position.vy += ay2 * dt;

      particle1.position.x += particle1.position.vx * dt;
      particle1.position.y += particle1.position.vy * dt;

      particle2.position.x += particle2.position.vx * dt;
      particle2.position.y += particle2.position.vy * dt;

      // Centro la posición de las partículas en la pantalla
      const centerOffsetX = screenWidth / 2 - particle1.position.x;
      const centerOffsetY = screenHeight / 2 - particle1.position.y;

      particle1.position.x += centerOffsetX;
      particle1.position.y += centerOffsetY;

      particle2.position.x += centerOffsetX;
      particle2.position.y += centerOffsetY;

      return {
        particle1,
        particle2,
      };
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateParticlePositions();
    }, 10);

    return () => clearInterval(intervalId);
  }, [vx2]);

  return (
    <div style={{ position: 'relative', width: screenWidth, height: screenHeight, overflow: 'hidden' }}>
      <div style={{display:'flex', flexDirection:'column',width:'150px'}}>
      <input
        type="range"
        min="0"
        max="4"
        value={vx2}
        onChange={(e) => setVx2(parseInt(e.target.value))}
      />
      <Button variant="outlined" color="primary" size="small" style={{marginTop:'10px'}}
      onClick={handleSetInitialVx}>Reiniciar Simulación</Button>

      </div>
      <Particle color={rojo} position={particleStates.particle1.position} />
      <Particle color={azul} position={particleStates.particle2.position} />
    </div>
  );
};

export default App;

