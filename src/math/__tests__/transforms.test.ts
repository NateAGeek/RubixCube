import * as math from 'mathjs';
import { FACE, FACE_ORDER, generate_rubix_cube } from "../cube";
import { cube_face_to_string, rubix_cube_to_string } from '../utils';
import { rotate_face, rubix_cube_get_face } from '../transforms';


describe('transforms', () => {
    describe('Rotate a face', () => {
        it('should rotate a F face', () => {
            const cube_size = 3;
            
            // Rotate the F face of a 3x3 cube
            const rubix_cube = generate_rubix_cube(cube_size);

            let faceData = rubix_cube_get_face(rubix_cube, FACE.F, cube_size);

            // Confirm the face is in the correct initial position
            let face_strings = cube_face_to_string(faceData, cube_size);
            expect(face_strings).toBe(
                '+----------+\n' +
                '| F0 F1 F2 |\n' +   
                '| F3 F4 F5 |\n' +
                '| F6 F7 F8 |\n' +
                '+----------+'
            );
            let rubix_cube_str = rubix_cube_to_string(rubix_cube, cube_size);
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
            

            // Rotate the face 90 degrees
            rotate_face(rubix_cube, FACE.F);
            faceData = rubix_cube_get_face(rubix_cube, FACE.F, cube_size); 
            face_strings = cube_face_to_string(faceData, cube_size);
            expect(face_strings).toBe(
                '+----------+\n' +
                '| F6 F3 F0 |\n' +
                '| F7 F4 F1 |\n' +
                '| F8 F5 F2 |\n' +
                '+----------+'
            );

            // Confirm sides are rotated correctly 90 degrees
            rubix_cube_str = rubix_cube_to_string(rubix_cube, cube_size);
            expect(rubix_cube_str).toBe(
                '            +----------+            \n' +
                '            | U0 U1 U2 |            \n' +
                '            | U3 U4 U5 |            \n' +
                '            | L8 L5 L2 |            \n' +
                '            +----------+            \n' +
                '+----------++----------++----------++----------+\n' +
                '| L0 L1 D0 || F6 F3 F0 || U6 R1 R2 || B0 B1 B2 |\n' +
                '| L3 L4 D1 || F7 F4 F1 || U7 R4 R5 || B3 B4 B5 |\n' +
                '| L6 L7 D2 || F8 F5 F2 || U8 R7 R8 || B6 B7 B8 |\n' +
                '+----------++----------++----------++----------+\n' +
                '            +----------+            \n' +
                '            | R6 R3 R0 |            \n' +
                '            | D3 D4 D5 |            \n' +
                '            | D6 D7 D8 |            \n' +
                '            +----------+            \n');

            // Confirm sides are rotated correctly 180 degrees
            rotate_face(rubix_cube, FACE.F);
            rubix_cube_str = rubix_cube_to_string(rubix_cube, cube_size);
            expect(rubix_cube_str).toBe(
                '            +----------+            \n' +
                '            | U0 U1 U2 |            \n' +
                '            | U3 U4 U5 |            \n' +
                '            | D2 D1 D0 |            \n' +
                '            +----------+            \n' +
                '+----------++----------++----------++----------+\n' +
                '| L0 L1 R6 || F8 F7 F6 || L8 R1 R2 || B0 B1 B2 |\n' +
                '| L3 L4 R3 || F5 F4 F3 || L5 R4 R5 || B3 B4 B5 |\n' +
                '| L6 L7 R0 || F2 F1 F0 || L2 R7 R8 || B6 B7 B8 |\n' +
                '+----------++----------++----------++----------+\n' +
                '            +----------+            \n' +
                '            | U8 U7 U6 |            \n' +
                '            | D3 D4 D5 |            \n' +
                '            | D6 D7 D8 |            \n' +
                '            +----------+            \n');

            // Confirm sides are rotated correctly 270 degrees
            rotate_face(rubix_cube, FACE.F);
            rubix_cube_str = rubix_cube_to_string(rubix_cube, cube_size);
            expect(rubix_cube_str).toBe(
                '            +----------+            \n' +
                '            | U0 U1 U2 |            \n' +
                '            | U3 U4 U5 |            \n' +
                '            | R0 R3 R6 |            \n' +
                '            +----------+            \n' +
                '+----------++----------++----------++----------+\n' +
                '| L0 L1 U8 || F2 F5 F8 || D2 R1 R2 || B0 B1 B2 |\n' +
                '| L3 L4 U7 || F1 F4 F7 || D1 R4 R5 || B3 B4 B5 |\n' +
                '| L6 L7 U6 || F0 F3 F6 || D0 R7 R8 || B6 B7 B8 |\n' +
                '+----------++----------++----------++----------+\n' +
                '            +----------+            \n' +
                '            | L2 L5 L8 |            \n' +
                '            | D3 D4 D5 |            \n' +
                '            | D6 D7 D8 |            \n' +
                '            +----------+            \n');
            
            // Confirm the face is in the correct final position rotated back
            rotate_face(rubix_cube, FACE.F);
            rubix_cube_str = rubix_cube_to_string(rubix_cube, cube_size);
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
            
            // Confirm the face is in the correct final position rotated back
            faceData = rubix_cube_get_face(rubix_cube, FACE.F, cube_size);
            face_strings = cube_face_to_string(faceData, cube_size);
            expect(face_strings).toBe(
                '+----------+\n' +
                '| F0 F1 F2 |\n' +   
                '| F3 F4 F5 |\n' +
                '| F6 F7 F8 |\n' +
                '+----------+'
            );
        });
    });
})