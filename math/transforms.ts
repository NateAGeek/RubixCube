import * as math from 'mathjs';
import { FACE_ORDER } from './cube';

export function rotate_face(cube: math.Matrix, face: string, w: number = 3, h: number = 3) {
    const face_index = FACE_ORDER.indexOf(face);

    const face_data = cube.subset(math.index(
        math.range(face_index * h, (face_index + 1) * h),
        math.range(0, w)
    ));

    // Rotate the face 90 degrees
    let transposed_face = math.transpose(face_data);
    console.log(transposed_face);
    const rotated_face = transposed_face.map((value, index, matrix) => {
        return matrix.subset(math.index(index[0], w - index[1] - 1));
    });
    
    cube.subset(math.index(
        math.range(face_index * h, (face_index + 1) * h),
        math.range(0, w)
    ), rotated_face);

    console.log()
}