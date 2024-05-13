import React from 'react';
import './styles.css';
import {cube_index_to_face_id} from '../../state/math/utils';


export interface SubFaceProps {
    sub_face_id: number;
}

/**
 * SubFace component
 * Renders a sub-face of a Rubix Cube face
 *
 * @param {SubFaceProps} props
 * @return {JSX.Element} The JSX SubFace component
 */
export default function SubFace({sub_face_id}: SubFaceProps) {
  const face_id = cube_index_to_face_id(sub_face_id, 3);

  return (
    <div className="sub_face">
      <div className={`sub_face__sticker ${face_id}`}></div>
    </div>
  );
}
