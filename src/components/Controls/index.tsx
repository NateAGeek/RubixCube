import React from 'react';
import {useRubixCube} from '../../state/cube_context';
import {FACE} from '../../state/math/cube';
import './styles.css';

/**
 * Controls component
 * Renders the controls for the Rubix Cube that will
 * allow the user to rotate the faces of the cube
 *
 * @return {JSX.Element} The JSX Controls component
 */
export default function Controls() {
  const {rotateFace} = useRubixCube();

  return (
    <div id="controls">
      {Object.values(FACE).filter((face) => face != FACE.NA).map((face) => (
        <button key={'control-' + face} onClick={() => {
          rotateFace(face);
        }}>Rotate {face.toString()}</button>
      ))}
    </div>
  );
}
