import React, {useRef, useState} from 'react';
import Cube from '../components/Cube';
import {RubixCubeProvider} from '../state/cube_context';
import Controls from '../components/Controls';
import './styles.css';

/**
 * The main application component that handles the mouse events for rotating the cube.
 * - Contains the RubixCubeProvider to provide the state to the components.
 * - Contains the Cube component that renders the cube.
 * - Contains the Controls component that renders the controls for the cube.
 *
 * @return {JSX.Element} The main application component.
 */
export default function App() {
  const cubeRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({x: 0, y: 0});
  const [initialMousePosition, setInitialMousePosition] = useState({x: 0, y: 0});

  const onMouseDown = (event) => {
    let clientX = 0;
    let clientY = 0;
    if (event.type === 'touchstart') {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    setIsDragging(true);
    setInitialMousePosition({x: clientX ? clientX : 0, y: clientY ? clientY : 0});
  };

  const onMouseMove = (event) => {
    if (isDragging) {
      rotateCube(event);
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const rotateCube = (event) => {
    let clientX = 0;
    let clientY = 0;

    if (event.type === 'touchmove' || event.type === 'touchstart') {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    if (cubeRef.current) {
      console.log(initialMousePosition);
      console.log(clientX, clientY);
      console.log(rotation);

      const dx = clientX - initialMousePosition.x;
      const dy = clientY - initialMousePosition.y;

      // Update the rotation based on the difference in position
      const newRotation = {
        x: rotation.x - dy * 0.005, // Scaling factor for smoother rotation
        y: rotation.y + dx * 0.005,
      };
      console.log(newRotation);

      cubeRef.current.style.transform = `translate(-50%, -50%) rotateX(${newRotation.x}deg) rotateY(${newRotation.y}deg)`;
      setRotation(newRotation);
    }
  };

  return (
    <RubixCubeProvider>
      <div
        id="app_container"
        onTouchStart={onMouseDown}
        onTouchMove={onMouseMove}
        onTouchEnd={onMouseUp}
        onTouchCancel={onMouseLeave}

        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <Controls />
        <Cube ref={cubeRef}/>
      </div>
    </RubixCubeProvider>
  );
}
