import {matrix, reshape} from "mathjs";

export const FACE_ORDER = ['F', 'B', 'L', 'R', 'U', 'D'];

export function generate_rubix_cube(rubix_cube_w = 3, rubix_cube_h = 3) {
    const rubix_cube = Array.from({length: rubix_cube_w * rubix_cube_h * FACE_ORDER.length}, (_, i) => i);
    return matrix(reshape(rubix_cube, [rubix_cube_h * FACE_ORDER.length, rubix_cube_w]));
}