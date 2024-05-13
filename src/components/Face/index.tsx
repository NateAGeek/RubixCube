import React from 'react';
import {FACE} from '../../state/math/cube';
import './styles.css';
import SubFace from '../SubFace';
import {useRubixCube} from '../../state/cube_context';

export interface FaceProps {
    face: FACE;
}

/**
 * Face component
 * Renders a single face of the Rubix Cube
 *
 * @param {FaceProps} props
 * @return {JSX.Element} The JSX Face component
 */
export default function Face({face}: FaceProps) {
  const {getFace} = useRubixCube();
  const face_data = getFace(face).toArray();

  return (
    <div className="face" id={'face_' + face}>
      {face_data.map((row, row_index) =>
        row.map((sub_face_id, col_index) => (
          <SubFace key={col_index} sub_face_id={sub_face_id} />
        ),
        ))}
    </div>
  );
}
