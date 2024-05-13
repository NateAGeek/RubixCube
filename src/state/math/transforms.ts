import * as math from 'mathjs';
import {ADJACENT_FACES, Cube, FACE, FACE_ORDER, get_rubix_cube_face, rubix_cube_get_column, rubix_cube_get_row} from './cube';

/**
 * Given a cube and a face, rotate the face 90 degrees
 * and returns the updated cube.
 *
 * @param {Cube} cube The cube to rotate
 * @param {FACE} face The face to rotate
 * @param {number} cube_size The size of the cube
 * @return {Cube} The cube with the face rotated 90 degrees
 */
export function rotate_face(cube: Cube, face: FACE, cube_size: number = 3) {
  // Get the face data for the selected face
  const face_index = FACE_ORDER.indexOf(face);
  const face_data = get_rubix_cube_face(cube, face, cube_size);

  // Rotate the face 90 degrees
  const transposed_face = math.transpose(face_data);
  const rotated_face = transposed_face.map((value, index, matrix) => {
    return matrix.subset(math.index(index[0], cube_size - index[1] - 1));
  });

  // Update the cube with the rotated face
  cube = cube.subset(math.index(
    math.range(face_index * cube_size, (face_index + 1) * cube_size),
    math.range(0, cube_size),
  ), rotated_face);

  // Based on the face, rotate the adjacent faces
  switch (face) {
  case FACE.F:
  case FACE.B:
    return rotate_F_B(cube, face, cube_size);
  case FACE.L:
    return rotate_L(cube, face, cube_size);
  case FACE.R:
    return rotate_R(cube, face, cube_size);
  case FACE.U:
    return rotate_U(cube, face, cube_size);
  case FACE.D:
    return rotate_D(cube, face, cube_size);
  default:
    return cube;
  }
}

/**
 * Rotate the adjacent faces for the F and B sides.
 *
 * This operation uses the look up table of adjacent faces.
 * Then, base base on the face, the adjacent rows and columns are swapped.
 *
 * @param {Cube} cube The cube to rotate adjacent faces
 * @param {FACE} face The face that was rotated
 * @param {number} cube_size The size of the cube
 * @return {Cube} The cube with the adjacent faces rotated
 */
export function rotate_F_B(cube: math.Matrix, face: FACE, cube_size: number = 3) {
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
    0,
  ), math.reshape(bottom_row, [cube_size, 1]));

  // Swap the right column of the second face with the top row of the third face
  adjacent_face = next_adjacent_face;
  next_adjacent_face = adjacent_faces[2];
  next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

  const top_row = rubix_cube_get_row(cube, next_adjacent_face, 0, cube_size);

  cube.subset(math.index(
    next_adjacent_face_index * cube_size,
    math.range(0, cube_size),
  ), math.reshape(right_column, [1, cube_size]));


  // Swap the top row of the third face with the right column of the fourth face
  adjacent_face = next_adjacent_face;
  next_adjacent_face = adjacent_faces[3];
  next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

  // Need to reverse the array to match the orientation of the face
  const left_column = rubix_cube_get_column(cube, next_adjacent_face, cube_size - 1, cube_size).toArray().reverse();

  cube.subset(math.index(
    math.range(next_adjacent_face_index * cube_size, (next_adjacent_face_index + 1) * cube_size),
    cube_size - 1,
  ), math.reshape(top_row, [cube_size, 1]));

  // Swap the right column of the fourth face with the bottom row of the first face
  adjacent_face = next_adjacent_face;
  next_adjacent_face = adjacent_faces[0];
  next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

  cube.subset(math.index(
    next_adjacent_face_index * cube_size + cube_size - 1,
    math.range(0, cube_size),
  ), math.reshape(left_column, [1, cube_size]));

  return cube;
}

/**
 * Rotate the adjacent faces for the L side.
 *
 * This operation uses the look up table of adjacent faces.
 * Then, base base on the face, the adjacent columns are
 * swapped in a clockwise manner.
 *
 * @param {Cube} cube The cube to rotate adjacent faces
 * @param {FACE} face The face that was rotated
 * @param {number} cube_size The size of the cube
 * @return {Cube} The cube with the adjacent faces rotated
 */
export function rotate_L(cube: math.Matrix, face: FACE, cube_size: number = 3) {
  // Rotate the adjacent faces.
  // Although the operation could be done with a loop, with swaps of mods and indexing,
  // the code is more readable this way but is tied to a 6 face cube...

  // Prepare the adjacent faces variables
  const adjacent_faces = ADJACENT_FACES[face];
  let adjacent_face = adjacent_faces[0];
  let next_adjacent_face = adjacent_faces[1];
  let next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

  const U_column = rubix_cube_get_column(cube, adjacent_face, 0, cube_size);

  // Need to reverse the array to match the orientation of the face
  const F_column = rubix_cube_get_column(cube, next_adjacent_face, 0, cube_size);

  cube.subset(math.index(
    math.range(next_adjacent_face_index * cube_size, (next_adjacent_face_index + 1) * cube_size),
    0,
  ), U_column);

  // Swap the right column of the second face with the bottom column of the third face
  adjacent_face = next_adjacent_face;
  next_adjacent_face = adjacent_faces[2];
  next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

  const D_column = rubix_cube_get_column(cube, next_adjacent_face, 0, cube_size).toArray().reverse();

  cube.subset(math.index(
    math.range(next_adjacent_face_index * cube_size, (next_adjacent_face_index + 1) * cube_size),
    0,
  ), F_column);

  // Swap the bottom column of the third face with the top column of the fourth face
  adjacent_face = next_adjacent_face;
  next_adjacent_face = adjacent_faces[3];
  next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

  const B_column = rubix_cube_get_column(cube, next_adjacent_face, cube_size - 1, cube_size).toArray().reverse();

  cube.subset(math.index(
    math.range(next_adjacent_face_index * cube_size, (next_adjacent_face_index + 1) * cube_size),
    cube_size - 1,
  ), D_column);

  // Swap the top column of the fourth face with the top column of the first face
  adjacent_face = next_adjacent_face;
  next_adjacent_face = adjacent_faces[0];
  next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

  cube.subset(math.index(
    math.range(next_adjacent_face_index * cube_size, (next_adjacent_face_index + 1) * cube_size),
    0,
  ), B_column);

  return cube;
}

/**
 * Rotate the adjacent faces for the R side.
 *
 * This operation uses the look up table of adjacent faces.
 * Then, base base on the face, the adjacent columns are
 * swapped in a clockwise manner.
 *
 * @param {Cube} cube The cube to rotate adjacent faces
 * @param {FACE} face The face that was rotated
 * @param {number} cube_size The size of the cube
 * @return {Cube} The cube with the adjacent faces rotated
 */
export function rotate_R(cube: math.Matrix, face: FACE, cube_size: number = 3) {
  // Rotate the adjacent faces.
  // Although the operation could be done with a loop, with swaps of mods and indexing,
  // the code is more readable this way but is tied to a 6 face cube...

  // Prepare the adjacent faces variables
  const adjacent_faces = ADJACENT_FACES[face];
  let adjacent_face = adjacent_faces[0];
  let next_adjacent_face = adjacent_faces[1];
  let next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

  const U_column = rubix_cube_get_column(cube, adjacent_face, cube_size - 1, cube_size).toArray().reverse();

  // Need to reverse the array to match the orientation of the face
  const B_column = rubix_cube_get_column(cube, next_adjacent_face, 0, cube_size).toArray().reverse();

  cube.subset(math.index(
    math.range(next_adjacent_face_index * cube_size, (next_adjacent_face_index + 1) * cube_size),
    0,
  ), U_column);

  // Swap the right column of the second face with the bottom column of the third face
  adjacent_face = next_adjacent_face;
  next_adjacent_face = adjacent_faces[2];
  next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

  const D_column = rubix_cube_get_column(cube, next_adjacent_face, cube_size - 1, cube_size);

  cube.subset(math.index(
    math.range(next_adjacent_face_index * cube_size, (next_adjacent_face_index + 1) * cube_size),
    cube_size - 1,
  ), B_column);

  // Swap the bottom column of the third face with the top column of the fourth face
  adjacent_face = next_adjacent_face;
  next_adjacent_face = adjacent_faces[3];
  next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

  const F_column = rubix_cube_get_column(cube, next_adjacent_face, cube_size - 1, cube_size);

  cube.subset(math.index(
    math.range(next_adjacent_face_index * cube_size, (next_adjacent_face_index + 1) * cube_size),
    cube_size - 1,
  ), D_column);

  // Swap the top column of the fourth face with the top column of the first face
  adjacent_face = next_adjacent_face;
  next_adjacent_face = adjacent_faces[0];
  next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

  cube.subset(math.index(
    math.range(next_adjacent_face_index * cube_size, (next_adjacent_face_index + 1) * cube_size),
    cube_size - 1,
  ), F_column);

  return cube;
}

/**
 * Rotate the adjacent faces for the U side.
 *
 * This operation uses the look up table of adjacent faces.
 * Then, base base on the face, the adjacent top rows are
 * swapped in a clockwise manner.
 *
 * @param {Cube} cube The cube to rotate adjacent faces
 * @param {FACE} face The face that was rotated
 * @param {number} cube_size The size of the cube
 * @return {Cube} The cube with the adjacent faces rotated
 */
export function rotate_U(cube: math.Matrix, face: FACE, cube_size: number = 3) {
  // Rotate the adjacent faces.
  // Although the operation could be done with a loop, with swaps of mods and indexing,
  // the code is more readable this way but is tied to a 6 face cube...

  // Prepare the adjacent faces variables
  const adjacent_faces = ADJACENT_FACES[face];
  let adjacent_face = adjacent_faces[0];
  let next_adjacent_face = adjacent_faces[1];
  let next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

  const B_row = rubix_cube_get_row(cube, adjacent_face, 0, cube_size);

  // Need to reverse the array to match the orientation of the face
  const R_row = rubix_cube_get_row(cube, next_adjacent_face, 0, cube_size);

  cube.subset(math.index(
    next_adjacent_face_index * cube_size,
    math.range(0, cube_size),
  ), B_row);

  // Swap the right column of the second face with the bottom column of the third face
  adjacent_face = next_adjacent_face;
  next_adjacent_face = adjacent_faces[2];
  next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

  const F_row = rubix_cube_get_row(cube, next_adjacent_face, 0, cube_size).toArray().reverse();

  cube.subset(math.index(
    next_adjacent_face_index * cube_size,
    math.range(0, cube_size),
  ), R_row);

  // Swap the bottom column of the third face with the top column of the fourth face
  adjacent_face = next_adjacent_face;
  next_adjacent_face = adjacent_faces[3];
  next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

  const L_row = rubix_cube_get_row(cube, next_adjacent_face, 0, cube_size).toArray().reverse();

  cube.subset(math.index(
    next_adjacent_face_index * cube_size,
    math.range(0, cube_size),
  ), F_row);

  // Swap the top column of the fourth face with the top column of the first face
  adjacent_face = next_adjacent_face;
  next_adjacent_face = adjacent_faces[0];
  next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

  cube.subset(math.index(
    next_adjacent_face_index * cube_size,
    math.range(0, cube_size),
  ), L_row);

  return cube;
}

/**
 * Rotate the adjacent faces for the D side.
 *
 * This operation uses the look up table of adjacent faces.
 * Then, base base on the face, the adjacent bottom rows are
 * swapped in a clockwise manner.
 *
 * @param {Cube} cube The cube to rotate adjacent faces
 * @param {FACE} face The face that was rotated
 * @param {number} cube_size The size of the cube
 * @return {Cube} The cube with the adjacent faces rotated
 */
export function rotate_D(cube: math.Matrix, face: FACE, cube_size: number = 3) {
  // Rotate the adjacent faces.
  // Although the operation could be done with a loop, with swaps of mods and indexing,
  // the code is more readable this way but is tied to a 6 face cube...

  // Prepare the adjacent faces variables
  const adjacent_faces = ADJACENT_FACES[face];
  let adjacent_face = adjacent_faces[0];
  let next_adjacent_face = adjacent_faces[1];
  let next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

  const F_row = rubix_cube_get_row(cube, adjacent_face, cube_size - 1, cube_size);

  // Need to reverse the array to match the orientation of the face
  const R_row = rubix_cube_get_row(cube, next_adjacent_face, cube_size - 1, cube_size);

  cube.subset(math.index(
    next_adjacent_face_index * cube_size + cube_size - 1,
    math.range(0, cube_size),
  ), F_row);

  // Swap the right column of the second face with the bottom column of the third face
  adjacent_face = next_adjacent_face;
  next_adjacent_face = adjacent_faces[2];
  next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

  const B_row = rubix_cube_get_row(cube, next_adjacent_face, cube_size - 1, cube_size).toArray().reverse();

  cube.subset(math.index(
    next_adjacent_face_index * cube_size + cube_size - 1,
    math.range(0, cube_size),
  ), R_row);

  // Swap the bottom column of the third face with the top column of the fourth face
  adjacent_face = next_adjacent_face;
  next_adjacent_face = adjacent_faces[3];
  next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

  const L_row = rubix_cube_get_row(cube, next_adjacent_face, cube_size - 1, cube_size).toArray().reverse();

  cube.subset(math.index(
    next_adjacent_face_index * cube_size + cube_size - 1,
    math.range(0, cube_size),
  ), B_row);

  // Swap the top column of the fourth face with the top column of the first face
  adjacent_face = next_adjacent_face;
  next_adjacent_face = adjacent_faces[0];
  next_adjacent_face_index = FACE_ORDER.indexOf(next_adjacent_face);

  cube.subset(math.index(
    next_adjacent_face_index * cube_size + cube_size - 1,
    math.range(0, cube_size),
  ), L_row);

  return cube;
}
