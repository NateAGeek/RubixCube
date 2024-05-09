export const FACE_ORDER = ['F', 'B', 'L', 'R', 'U', 'D'];

export function generate_rubix_cube(rubix_cube_w = 3, rubix_cube_h = 3, rubix_cube_d = 3) {
    const rubix_cube = new Array(rubix_cube_w * rubix_cube_h * rubix_cube_d).map((_, i) => {
        return i;
    });

    return rubix_cube;
}

export function index_to_face_rubix_cube(index: number, w: number, h: number, d: number) {
    const face = Math.floor(index / (w * h));
    const face_index = index % (w * h);
    return `${FACE_ORDER[face]} ${face_index}`;
}