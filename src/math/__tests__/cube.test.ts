import { FACE_ORDER, generate_rubix_cube } from "../cube";
import { rubix_cube_to_string, cube_index_to_sub_face_id, cube_face_to_string } from "../utils";
import * as math from "mathjs";

describe('cube', () => {
    it('should generate a rubix cube', () => {
        const cube_size = 3;
        const rubix_cube = generate_rubix_cube(cube_size);
        
        // Make sure the length is correct
        expect(math.multiply(...rubix_cube.size())).toBe(cube_size * cube_size * FACE_ORDER.length);
        // Make sure every value is unique and is incrementing in order
        let flat_rubix_cube =math.flatten(rubix_cube);
        for (let i = 0; i < cube_size * cube_size * FACE_ORDER.length; i++) {
            expect(flat_rubix_cube.get([i])).toBe(i);
        }
    });

    it('should convert index to face', () => {
        const cube_size = 3;

        let sub_faces: string[] = [];
        for (let [face_index, face] of FACE_ORDER.entries()) {
            for (let i = (face_index * cube_size * cube_size); i < (face_index + 1) * cube_size * cube_size; i++) {
                sub_faces.push(cube_index_to_sub_face_id(i,));
                expect(sub_faces[sub_faces.length - 1]).toBe(`${face}${i % (cube_size * cube_size)}`);
            }
        }
        expect(sub_faces.length).toBe(54);
    })

    it('should produce a debugging string of a face', () => {
        const cube_size = 3;
        const face = math.matrix(math.reshape(Array.from({length: cube_size * cube_size}, (_, i) => i), [cube_size, cube_size]));
        const face_str = cube_face_to_string(face, cube_size);
        expect(face_str).toBe(
            '+----------+\n' +
            '| F0 F1 F2 |\n' +
            '| F3 F4 F5 |\n' +
            '| F6 F7 F8 |\n' +
            '+----------+');
    });

    it('should produce a debugging string of a rubix cube', () => {
        const cube_size = 3;

        const rubix_cube = generate_rubix_cube(3);
        const rubix_cube_str = rubix_cube_to_string(rubix_cube, cube_size);
        expect(rubix_cube_str).toBe(
        '            +----------+            \n' +
        '            | U0 U1 U2 |            \n' +
        '            | U3 U4 U5 |            \n' +
        '            | U6 U7 U8 |            \n' +
        '            +----------+            \n' +
        '+----------++----------++----------++----------+\n' +
        '| L0 L1 L2 || F0 F1 F2 || R0 R1 R2 || B0 B1 B2 |\n' +
        '| L3 L4 L5 || F3 F4 F5 || R3 R4 R5 || B3 B4 B5 |\n' +
        '| L6 L7 L8 || F6 F7 F8 || R6 R7 R8 || B6 B7 B8 |\n' +
        '+----------++----------++----------++----------+\n' +
        '            +----------+            \n' +
        '            | D0 D1 D2 |            \n' +
        '            | D3 D4 D5 |            \n' +
        '            | D6 D7 D8 |            \n' +
        '            +----------+            \n');
    });
});
