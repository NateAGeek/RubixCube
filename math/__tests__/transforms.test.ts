import * as math from 'mathjs';
import { FACE_ORDER, generate_rubix_cube } from "../cube";
import { cube_face_to_string } from '../utils';
import { rotate_face } from '../transforms';


describe('transforms', () => {
    describe('Rotate a face', () => {
        it('should rotate a F face', () => {
            const w = 3;
            const h = 3;
            
            const rubix_cube = generate_rubix_cube(w, h);
            let face_index = FACE_ORDER.indexOf("F");
            let faceData = rubix_cube.subset(math.index(
                math.range(face_index * h, (face_index + 1) * h), 
                math.range(0, w)
            ));

            let face_strings = cube_face_to_string(faceData, w, h);
            expect(face_strings).toBe(`+----------+
| F0 F1 F2 |
| F3 F4 F5 |
| F6 F7 F8 |
+----------+`);
            rotate_face(rubix_cube, "F");
            faceData = rubix_cube.subset(math.index(
                math.range(face_index * h, (face_index + 1) * h), 
                math.range(0, w)
            ));
            face_strings = cube_face_to_string(faceData, w, h);
            expect(face_strings).toBe(`+----------+
| F6 F3 F0 |
| F7 F4 F1 |
| F8 F5 F2 |
+----------+`);
            
        });
    });
})