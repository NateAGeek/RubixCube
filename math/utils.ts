
export function rubix_cube_to_string(cube: number[],  w: number, h: number, d: number) {
    let rubix_cube_str = '';
    for (let i = 0; i < d; i++) {
        for (let j = 0; j < h; j++) {
            let row = '';
            for (let k = 0; k < w; k++) {
                row += `${cube[i * w * h + j * w + k]} `;
            }
            rubix_cube_str += row + '\n';
        }
        rubix_cube_str += '\n';
    }
}