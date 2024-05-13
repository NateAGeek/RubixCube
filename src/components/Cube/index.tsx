import React, {forwardRef} from 'react';
import './styles.css';
import {FACE_ORDER} from '../../state/math/cube';
import Face from '../Face';

/**
 * Cube component
 * Renders the Rubix Cube with all their faces and sub-faces
 *
 * Note:
 * This component is a forward ref component for the cube
 * allowing the parent to reference the cube element used
 * within the App to apply transforms and rotations
 *
 * returns {React.ForwardRefExoticComponent<React.RefAttributes<HTMLDivElement>>} The forward ref cube component
 */
export default forwardRef<HTMLDivElement>(function Cube(props, ref) {
  return (
    <div ref={ref} id="cube">
      {FACE_ORDER.map((face) => (
        <Face key={face} face={face} />
      ))}
    </div>
  );
});
