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
    setIsDragging(true);
    rotateCube(event);
    setInitialMousePosition({x: event.clientX, y: event.clientY});
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
    if (cubeRef.current) {
      const dx = event.clientX - initialMousePosition.x;
      const dy = event.clientY - initialMousePosition.y;

      // Update the rotation based on the difference in position
      const newRotation = {
        x: rotation.x - dy * 0.005, // Scaling factor for smoother rotation
        y: rotation.y + dx * 0.005,
      };

      cubeRef.current.style.transform = `translate(-50%, -50%) rotateX(${newRotation.x}deg) rotateY(${newRotation.y}deg)`;
      setRotation(newRotation);
    }
  };

  return (
    <RubixCubeProvider>
      <div
        id="app_container"
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
