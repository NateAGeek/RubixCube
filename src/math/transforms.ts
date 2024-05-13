import * as math from 'mathjs';
import { ADJACENT_FACES, FACE as Face, FACE_ORDER } from './cube';

export function rotate_face(cube: math.Matrix, face: Face, cube_size: number = 3) {
    const face_index = FACE_ORDER.indexOf(face);
    
    const face_data = rubix_cube_get_face(cube, face, cube_size);

    // Rotate the face 90 degrees
    let transposed_face = math.transpose(face_data);
    const rotated_face = transposed_face.map((value, index, matrix) => {
        return matrix.subset(math.index(index[0], cube_size - index[1] - 1));
    });
    
    cube.subset(math.index(
        math.range(face_index * cube_size, (face_index + 1) * cube_size),
        math.range(0, cube_size)
    ), rotated_face);

    // Rotate the adjacent faces.
    // Although the operation could be done with a loop, with swaps of mods and indexing, 
    // the code is more readable this way but is tied to a 6 face cube...

    // Prepare the adjacent faces variables
    const adjacent_faces = ADJACENT_FACES[face];
    let adjacent_face = adjacent_faces[0];
    let next_adjacent_face = adjacent_faces[1];
    let next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

    // Swap the bottom row of the first face with the right column of the second face and stash the second face to swap with the third face
    const bottom_row = rubix_cube_get_row(cube, adjacent_face, cube_size - 1, cube_size);

    // Need to reverse the array to match the orientation of the face
    const right_column = rubix_cube_get_column(cube, next_adjacent_face, 0, cube_size).toArray().reverse();
    
    cube.subset(math.index(
        math.range(next_adjacent_face_index * cube_size, (next_adjacent_face_index + 1) * cube_size),
        0
    ), math.reshape(bottom_row, [cube_size, 1]));

    // Swap the right column of the second face with the top row of the third face
    adjacent_face = next_adjacent_face;
    next_adjacent_face = adjacent_faces[2];
    next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

    const top_row = rubix_cube_get_row(cube, next_adjacent_face, 0, cube_size);

    cube.subset(math.index(
        next_adjacent_face_index * cube_size,
        math.range(0, cube_size)
    ), math.reshape(right_column, [1, cube_size]));


    // Swap the top row of the third face with the right column of the fourth face
    adjacent_face = next_adjacent_face;
    next_adjacent_face = adjacent_faces[3];
    next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

    // Need to reverse the array to match the orientation of the face
    const left_column = rubix_cube_get_column(cube, next_adjacent_face, cube_size - 1, cube_size).toArray().reverse();
    
    cube.subset(math.index(
        math.range(next_adjacent_face_index * cube_size, (next_adjacent_face_index + 1) * cube_size),
        cube_size - 1
    ), math.reshape(top_row, [cube_size, 1]));

    // Swap the right column of the fourth face with the bottom row of the first face
    adjacent_face = next_adjacent_face;
    next_adjacent_face = adjacent_faces[0];
    next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

    cube.subset(math.index(
        next_adjacent_face_index * cube_size + cube_size - 1,
        math.range(0, cube_size)
    ), math.reshape(left_column, [1, cube_size]));

    return cube;
}

export function rubix_cube_get_face(cube: math.Matrix, face: Face, cube_size: number = 3): math.Matrix {
    const face_index = FACE_ORDER.indexOf(face);

    return cube.subset(math.index(
        math.range(face_index * cube_size, (face_index + 1) * cube_size),
        math.range(0, cube_size)
    ));
}

export function rubix_cube_get_row(cube: math.Matrix, face: Face, row_index: number, cube_size: number = 3): math.Matrix {
    const face_index = FACE_ORDER.indexOf(face);

    return cube.subset(math.index(
        face_index * cube_size + row_index,
        math.range(0, cube_size)
    ));
}

export function rubix_cube_get_column(cube: math.Matrix, face: Face, column_index: number, cube_size: number = 3): math.Matrix {
    const face_index = FACE_ORDER.indexOf(face);

    return cube.subset(math.index(
        math.range(face_index * cube_size, (face_index + 1) * cube_size),
        column_index
    ));
}
