import React, { useRef, useState } from "react";
import Cube from "./components/Cube";
import { RubixCubeProvider } from "./state/cube_context";
import Controls from "./components/Controls";

export default function App() {
    const cubeRef = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });

    const onMouseDown = (event) => {
        setIsDragging(true);
        rotateCube(event);
        setInitialMousePosition({ x: event.clientX, y: event.clientY });
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
                x: rotation.x - dy * 0.001, // Scaling factor for smoother rotation
                y: rotation.y - dx * 0.001
            };

            cubeRef.current.style.transform = `rotateX(${newRotation.x}deg) rotateY(${newRotation.y}deg)`;
            
            setRotation(newRotation);
        }
    };

    return (
        <RubixCubeProvider>            
            <div id="cube_container"
                style={{transformStyle: "preserve-3d", position: "absolute", width: "100vw", height: "100vh"}}
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