import { FACE_ORDER, generate_rubix_cube } from "../cube";
import { rubix_cube_to_string, index_to_face_rubix_cube } from "../utils";
import * as math from "mathjs";

describe('cube', () => {
    it('should generate a rubix cube', () => {
        const rubix_cube = generate_rubix_cube(3, 3);
        
        // Make sure the length is correct
        expect(math.multiply(...rubix_cube.size())).toBe(54);
        // Make sure every value is unique and is incrementing in order
        let flat_rubix_cube =math.flatten(rubix_cube);
        for (let i = 0; i < 54; i++) {
            expect(flat_rubix_cube.get([i])).toBe(i);
        }
    });

    it('should convert index to face', () => {
        let sub_faces: string[] = [];
        for (let [face_index, face] of FACE_ORDER.entries()) {
            for (let i = (face_index * 3 * 3); i < (face_index + 1) * 3 * 3; i++) {
                sub_faces.push(index_to_face_rubix_cube(i, 3, 3));
                expect(sub_faces[sub_faces.length - 1]).toBe(`${face}${i % (3 * 3)}`);
            }
        }
        expect(sub_faces.length).toBe(54);
    })

    it('should produce a debugging string of a rubix cube', () => {
        const rubix_cube = generate_rubix_cube(3, 3);
        const rubix_cube_str = rubix_cube_to_string(rubix_cube, 3, 3);
        expect(rubix_cube_str).toBe(`
            +----------+            
            | U0 U1 U2 |            
            | U3 U4 U5 |            
            | U6 U7 U8 |            
            +----------+            
+----------++----------++----------++----------+
| L0 L1 L2 || F0 F1 F2 || R0 R1 R2 || B0 B1 B2 |
| L3 L4 L5 || F3 F4 F5 || R3 R4 R5 || B3 B4 B5 |
| L6 L7 L8 || F6 F7 F8 || R6 R7 R8 || B6 B7 B8 |
+----------++----------++----------++----------+
            +----------+            
            | D0 D1 D2 |            
            | D3 D4 D5 |            
            | D6 D7 D8 |            
            +----------+            
`);
    });
});
