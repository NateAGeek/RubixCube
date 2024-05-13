import * as math from 'mathjs';

export enum FACE {
    /* eslint-disable no-unused-vars */
    NA = 'na',
    F = 'F',
    B = 'B',
    L = 'L',
    R = 'R',
    U = 'U',
    D = 'D',
    /* eslint-enable no-unused-vars */
}
// The order of the faces on the cube
export const FACE_ORDER = [FACE.F, FACE.B, FACE.L, FACE.R, FACE.U, FACE.D];
export type Cube = math.Matrix;

// Adjacent faces for each face of a cube, excluding NA, in clockwise order
export const ADJACENT_FACES: Record<Exclude<FACE, FACE.NA>, FACE[]> = {
  [FACE.F]: [FACE.U, FACE.R, FACE.D, FACE.L],
  [FACE.B]: [FACE.D, FACE.L, FACE.U, FACE.R],
  [FACE.L]: [FACE.U, FACE.F, FACE.D, FACE.B],
  [FACE.R]: [FACE.U, FACE.B, FACE.D, FACE.F],
  [FACE.U]: [FACE.B, FACE.R, FACE.F, FACE.L],
  [FACE.D]: [FACE.F, FACE.R, FACE.B, FACE.L],
};

/**
 * Generate a cube_size x cube_size x FACE_ORDER.length matrix
 * with values from 0 to create unique subface ids
 *
 * @param {number} cube_size The face size of the cube to generate
 * @return {Cube} a cube_size x cube_size x FACE_ORDER.length matrix
 */
export function generate_rubix_cube(cube_size: number = 3): Cube {
  // Generate a cube_size x cube_size x FACE_ORDER.length matrix with values from 0 to create unique subface ids
  const rubix_cube = Array.from({length: cube_size * cube_size * FACE_ORDER.length}, (_, i) => i);

  // Reshape the matrix to a cube_size * FACE_ORDER.length x cube_size matrix
  return math.matrix(
    math.reshape(
      rubix_cube,
      [cube_size * FACE_ORDER.length, cube_size],
    ),
  );
}

/**
 * Returns the face of the cube matrix that is passed in as a parameter
 *
 * @param {Cube} cube The Cube matrix to get the face from
 * @param {FACE} face The face to get from the cube
 * @param {number} cube_size The size of the cube
 * @return {math.Matrix} The face matrix from the cube
 */
export function get_rubix_cube_face(cube: Cube, face: FACE, cube_size: number = 3): math.Matrix {
  const face_index = FACE_ORDER.indexOf(face);

  return cube.subset(math.index(
    math.range(face_index * cube_size, (face_index + 1) * cube_size),
    math.range(0, cube_size),
  ));
}

/**
 * Returns the row of the cube matrix that is passed in as a parameter
 *
 * @param {Cube} cube The cube matrix to get the row from
 * @param {FACE} face The face to get the row from
 * @param {number} row_index The row index to get from the face
 * @param {number} cube_size The size of the cube
 * @return {math.Matrix}The row matrix from the face
 */
export function rubix_cube_get_row(cube: Cube, face: FACE, row_index: number, cube_size: number = 3): math.Matrix {
  const face_index = FACE_ORDER.indexOf(face);

  return cube.subset(math.index(
    face_index * cube_size + row_index,
    math.range(0, cube_size),
  ));
}

/**
 * Returns the column of the cube matrix that is passed in as a parameter
 *
 * @param {Cube} cube The cube matrix to get the column from
 * @param {FACE} face The face to get the column from
 * @param {number} column_index The column index to get from the face
 * @param {number} cube_size The size of the cube
 * @return {math.Matrix} The column matrix from the face
 */
export function rubix_cube_get_column(cube: math.Matrix, face: FACE, column_index: number, cube_size: number = 3): math.Matrix {
  const face_index = FACE_ORDER.indexOf(face);

  return cube.subset(math.index(
    math.range(face_index * cube_size, (face_index + 1) * cube_size),
    column_index,
  ));
}

