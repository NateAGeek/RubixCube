import * as math from "mathjs";

export enum FACE {
    NA = "na",
    F = "F",
    B = "B",
    L = "L",
    R = "R",
    U = "U",
    D = "D",
}
// The order of the faces on the cube
export const FACE_ORDER = [FACE.F, FACE.B, FACE.L, FACE.R, FACE.U, FACE.D];
export type Cube = math.Matrix;

// Adjacent faces for each face of a cube, excluding NA
export const ADJACENT_FACES: Record<Exclude<FACE, FACE.NA>, FACE[]> = {
    [FACE.F]: [FACE.U, FACE.R, FACE.D, FACE.L],
    [FACE.B]: [FACE.D, FACE.L, FACE.U, FACE.R],
    [FACE.L]: [FACE.D, FACE.B, FACE.U, FACE.F],
    [FACE.R]: [FACE.U, FACE.B, FACE.D, FACE.F],
    [FACE.U]: [FACE.B, FACE.R, FACE.F, FACE.L],
    [FACE.D]: [FACE.F, FACE.R, FACE.B, FACE.L],
};

export function generate_rubix_cube(cube_size: number = 3): Cube {
    // Generate a cube_size x cube_size x FACE_ORDER.length matrix with values from 0 to create unique subface ids
    const rubix_cube = Array.from({length: cube_size * cube_size * FACE_ORDER.length}, (_, i) => i);

    // Reshape the matrix to a cube_size * FACE_ORDER.length x cube_size matrix
    return math.matrix(
        math.reshape(
            rubix_cube,
            [cube_size * FACE_ORDER.length, cube_size]
        )
    );
}

export function get_rubix_cube_face(cube: Cube, face: FACE, cube_size: number = 3): math.Matrix {
    const face_index = FACE_ORDER.indexOf(face);

    return cube.subset(math.index(
        math.range(face_index * cube_size, (face_index + 1) * cube_size),
        math.range(0, cube_size)
    ));
}

