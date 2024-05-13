import React, { forwardRef, useRef, useState } from 'react';
import './styles.css';
import { FACE_ORDER } from '../../math/cube';
import Face from '../Face';

export default forwardRef<HTMLDivElement>(function Cube(props, ref) {
    return (
        <div ref={ref} id="cube">
            {FACE_ORDER.map((face) => (
                <Face key={face} face={face} />
            ))}
        </div>
    );
});