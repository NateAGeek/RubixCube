import exp from "constants";
import { FACE_ORDER, generate_rubix_cube, index_to_face_rubix_cube } from "../cube";
import { rubix_cube_to_string } from "../utils";

describe('cube', () => {
    it('should generate a rubix cube', () => {
        const rubix_cube = generate_rubix_cube(3, 3, 3);
        
        // Make sure the length is correct
        expect(rubix_cube.length).toBe(27);
        // Make sure every value is unique and is incrementing in order
        for (let i = 0; i < rubix_cube.length; i++) {
            expect(rubix_cube[i]).toBe(i);
        }
    });

    it('should convert index to face', () => {
        const rubix_cube = generate_rubix_cube(3, 3, 3);
        for (let face in FACE_ORDER) {
            for (let i = 0; i < 9; i++) {
                expect(index_to_face_rubix_cube(i, 3, 3, 3)).toBe(`${FACE_ORDER[face]} ${i}`);
            }
        }
    })

    it('should produce a debugging string of a rubix cube', () => {
        const rubix_cube = generate_rubix_cube(3, 3, 3);
        const rubix_cube_str = rubix_cube_to_string(rubix_cube, 3, 3, 3);
        console.log(rubix_cube_str)
    });
});
