import {FACE, generate_rubix_cube, get_rubix_cube_face} from '../cube';
import {cube_face_to_string, rubix_cube_to_string} from '../utils';
import {rotate_face} from '../transforms';


describe('transforms', () => {
  describe('Rotate a face', () => {
    it('should rotate a F face', () => {
      const cube_size = 3;
      const face = FACE.F;

      // Rotate the F face of a 3x3 cube
      const rubix_cube = generate_rubix_cube(cube_size);

      let faceData = get_rubix_cube_face(rubix_cube, face, cube_size);

      // Confirm the face is in the correct initial position
      let face_strings = cube_face_to_string(faceData, cube_size);
      expect(face_strings).toBe(
        '+----------+\n' +
                '| F0 F1 F2 |\n' +
                '| F3 F4 F5 |\n' +
                '| F6 F7 F8 |\n' +
                '+----------+',
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
      rotate_face(rubix_cube, face);
      faceData = get_rubix_cube_face(rubix_cube, face, cube_size);
      face_strings = cube_face_to_string(faceData, cube_size);
      expect(face_strings).toBe(
        '+----------+\n' +
                '| F6 F3 F0 |\n' +
                '| F7 F4 F1 |\n' +
                '| F8 F5 F2 |\n' +
                '+----------+',
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
      rotate_face(rubix_cube, face);
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
      rotate_face(rubix_cube, face);
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
      rotate_face(rubix_cube, face);
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
      faceData = get_rubix_cube_face(rubix_cube, face, cube_size);
      face_strings = cube_face_to_string(faceData, cube_size);
      expect(face_strings).toBe(
        '+----------+\n' +
                '| F0 F1 F2 |\n' +
                '| F3 F4 F5 |\n' +
                '| F6 F7 F8 |\n' +
                '+----------+',
      );
    });
    it('should rotate a B face', () => {
      const cube_size = 3;
      const face = FACE.B;

      // Rotate the F face of a 3x3 cube
      const rubix_cube = generate_rubix_cube(cube_size);

      let faceData = get_rubix_cube_face(rubix_cube, face, cube_size);

      // Confirm the face is in the correct initial position
      let face_strings = cube_face_to_string(faceData, cube_size);
      expect(face_strings).toBe(
        '+----------+\n' +
                '| B0 B1 B2 |\n' +
                '| B3 B4 B5 |\n' +
                '| B6 B7 B8 |\n' +
                '+----------+',
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
      rotate_face(rubix_cube, face);
      faceData = get_rubix_cube_face(rubix_cube, face, cube_size);
      face_strings = cube_face_to_string(faceData, cube_size);
      expect(face_strings).toBe(
        '+----------+\n' +
                '| B6 B3 B0 |\n' +
                '| B7 B4 B1 |\n' +
                '| B8 B5 B2 |\n' +
                '+----------+',
      );

      // Confirm sides are rotated correctly 90 degrees
      rubix_cube_str = rubix_cube_to_string(rubix_cube, cube_size);
      expect(rubix_cube_str).toBe(
        '            +----------+            \n' +
                '            | L6 L3 L0 |            \n' +
                '            | U3 U4 U5 |            \n' +
                '            | U6 U7 U8 |            \n' +
                '            +----------+            \n' +
                '+----------++----------++----------++----------+\n' +
                '| D6 L1 L2 || F0 F1 F2 || R0 R1 U0 || B6 B3 B0 |\n' +
                '| D7 L4 L5 || F3 F4 F5 || R3 R4 U1 || B7 B4 B1 |\n' +
                '| D8 L7 L8 || F6 F7 F8 || R6 R7 U2 || B8 B5 B2 |\n' +
                '+----------++----------++----------++----------+\n' +
                '            +----------+            \n' +
                '            | D0 D1 D2 |            \n' +
                '            | D3 D4 D5 |            \n' +
                '            | R8 R5 R2 |            \n' +
                '            +----------+            \n');


      // Confirm sides are rotated correctly 180 degrees
      rotate_face(rubix_cube, face);
      rubix_cube_str = rubix_cube_to_string(rubix_cube, cube_size);
      expect(rubix_cube_str).toBe(
        '            +----------+            \n' +
                '            | D8 D7 D6 |            \n' +
                '            | U3 U4 U5 |            \n' +
                '            | U6 U7 U8 |            \n' +
                '            +----------+            \n' +
                '+----------++----------++----------++----------+\n' +
                '| R8 L1 L2 || F0 F1 F2 || R0 R1 L6 || B8 B7 B6 |\n' +
                '| R5 L4 L5 || F3 F4 F5 || R3 R4 L3 || B5 B4 B3 |\n' +
                '| R2 L7 L8 || F6 F7 F8 || R6 R7 L0 || B2 B1 B0 |\n' +
                '+----------++----------++----------++----------+\n' +
                '            +----------+            \n' +
                '            | D0 D1 D2 |            \n' +
                '            | D3 D4 D5 |            \n' +
                '            | U2 U1 U0 |            \n' +
                '            +----------+            \n');

      // Confirm sides are rotated correctly 270 degrees
      rotate_face(rubix_cube, face);
      rubix_cube_str = rubix_cube_to_string(rubix_cube, cube_size);
      expect(rubix_cube_str).toBe(
        '            +----------+            \n' +
                '            | R2 R5 R8 |            \n' +
                '            | U3 U4 U5 |            \n' +
                '            | U6 U7 U8 |            \n' +
                '            +----------+            \n' +
                '+----------++----------++----------++----------+\n' +
                '| U2 L1 L2 || F0 F1 F2 || R0 R1 D8 || B2 B5 B8 |\n' +
                '| U1 L4 L5 || F3 F4 F5 || R3 R4 D7 || B1 B4 B7 |\n' +
                '| U0 L7 L8 || F6 F7 F8 || R6 R7 D6 || B0 B3 B6 |\n' +
                '+----------++----------++----------++----------+\n' +
                '            +----------+            \n' +
                '            | D0 D1 D2 |            \n' +
                '            | D3 D4 D5 |            \n' +
                '            | L0 L3 L6 |            \n' +
                '            +----------+            \n');

      // Confirm the face is in the correct final position rotated back
      rotate_face(rubix_cube, face);
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
      faceData = get_rubix_cube_face(rubix_cube, face, cube_size);
      face_strings = cube_face_to_string(faceData, cube_size);
      expect(face_strings).toBe(
        '+----------+\n' +
                '| B0 B1 B2 |\n' +
                '| B3 B4 B5 |\n' +
                '| B6 B7 B8 |\n' +
                '+----------+',
      );
    });
    it('should rotate a L face', () => {
      const cube_size = 3;
      const face = FACE.L;

      // Rotate the L face of a 3x3 cube
      const rubix_cube = generate_rubix_cube(cube_size);

      let faceData = get_rubix_cube_face(rubix_cube, face, cube_size);

      // Confirm the face is in the correct initial position
      let face_strings = cube_face_to_string(faceData, cube_size);
      expect(face_strings).toBe(
        '+----------+\n' +
                '| L0 L1 L2 |\n' +
                '| L3 L4 L5 |\n' +
                '| L6 L7 L8 |\n' +
                '+----------+',
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
      rotate_face(rubix_cube, face);
      faceData = get_rubix_cube_face(rubix_cube, face, cube_size);
      face_strings = cube_face_to_string(faceData, cube_size);
      expect(face_strings).toBe(
        '+----------+\n' +
                '| L6 L3 L0 |\n' +
                '| L7 L4 L1 |\n' +
                '| L8 L5 L2 |\n' +
                '+----------+',
      );

      // Confirm sides are rotated correctly 90 degrees
      rubix_cube_str = rubix_cube_to_string(rubix_cube, cube_size);
      expect(rubix_cube_str).toBe(
        '            +----------+            \n' +
                '            | B8 U1 U2 |            \n' +
                '            | B5 U4 U5 |            \n' +
                '            | B2 U7 U8 |            \n' +
                '            +----------+            \n' +
                '+----------++----------++----------++----------+\n' +
                '| L6 L3 L0 || U0 F1 F2 || R0 R1 R2 || B0 B1 D6 |\n' +
                '| L7 L4 L1 || U3 F4 F5 || R3 R4 R5 || B3 B4 D3 |\n' +
                '| L8 L5 L2 || U6 F7 F8 || R6 R7 R8 || B6 B7 D0 |\n' +
                '+----------++----------++----------++----------+\n' +
                '            +----------+            \n' +
                '            | F0 D1 D2 |            \n' +
                '            | F3 D4 D5 |            \n' +
                '            | F6 D7 D8 |            \n' +
                '            +----------+            \n');

      // Confirm sides are rotated correctly 180 degrees
      rotate_face(rubix_cube, face);
      rubix_cube_str = rubix_cube_to_string(rubix_cube, cube_size);
      expect(rubix_cube_str).toBe(
        '            +----------+            \n' +
                '            | D0 U1 U2 |            \n' +
                '            | D3 U4 U5 |            \n' +
                '            | D6 U7 U8 |            \n' +
                '            +----------+            \n' +
                '+----------++----------++----------++----------+\n' +
                '| L8 L7 L6 || B8 F1 F2 || R0 R1 R2 || B0 B1 F6 |\n' +
                '| L5 L4 L3 || B5 F4 F5 || R3 R4 R5 || B3 B4 F3 |\n' +
                '| L2 L1 L0 || B2 F7 F8 || R6 R7 R8 || B6 B7 F0 |\n' +
                '+----------++----------++----------++----------+\n' +
                '            +----------+            \n' +
                '            | U0 D1 D2 |            \n' +
                '            | U3 D4 D5 |            \n' +
                '            | U6 D7 D8 |            \n' +
                '            +----------+            \n');

      // Confirm sides are rotated correctly 270 degrees
      rotate_face(rubix_cube, face);
      rubix_cube_str = rubix_cube_to_string(rubix_cube, cube_size);
      expect(rubix_cube_str).toBe(
        '            +----------+            \n' +
                '            | F0 U1 U2 |            \n' +
                '            | F3 U4 U5 |            \n' +
                '            | F6 U7 U8 |            \n' +
                '            +----------+            \n' +
                '+----------++----------++----------++----------+\n' +
                '| L2 L5 L8 || D0 F1 F2 || R0 R1 R2 || B0 B1 U6 |\n' +
                '| L1 L4 L7 || D3 F4 F5 || R3 R4 R5 || B3 B4 U3 |\n' +
                '| L0 L3 L6 || D6 F7 F8 || R6 R7 R8 || B6 B7 U0 |\n' +
                '+----------++----------++----------++----------+\n' +
                '            +----------+            \n' +
                '            | B8 D1 D2 |            \n' +
                '            | B5 D4 D5 |            \n' +
                '            | B2 D7 D8 |            \n' +
                '            +----------+            \n');

      // Confirm the face is in the correct final position rotated back
      rotate_face(rubix_cube, face);
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
    });
    it('should rotate a R face', () => {
      const cube_size = 3;
      const face = FACE.R;

      // Rotate the R face of a 3x3 cube
      const rubix_cube = generate_rubix_cube(cube_size);

      let faceData = get_rubix_cube_face(rubix_cube, face, cube_size);

      // Confirm the face is in the correct initial position
      let face_strings = cube_face_to_string(faceData, cube_size);
      expect(face_strings).toBe(
        '+----------+\n' +
            '| R0 R1 R2 |\n' +
            '| R3 R4 R5 |\n' +
            '| R6 R7 R8 |\n' +
            '+----------+',
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
      rotate_face(rubix_cube, face);
      faceData = get_rubix_cube_face(rubix_cube, face, cube_size);
      face_strings = cube_face_to_string(faceData, cube_size);
      expect(face_strings).toBe(
        '+----------+\n' +
            '| R6 R3 R0 |\n' +
            '| R7 R4 R1 |\n' +
            '| R8 R5 R2 |\n' +
            '+----------+',
      );

      // Confirm sides are rotated correctly 90 degrees
      rubix_cube_str = rubix_cube_to_string(rubix_cube, cube_size);
      expect(rubix_cube_str).toBe(
        '            +----------+            \n' +
            '            | U0 U1 F2 |            \n' +
            '            | U3 U4 F5 |            \n' +
            '            | U6 U7 F8 |            \n' +
            '            +----------+            \n' +
            '+----------++----------++----------++----------+\n' +
            '| L0 L1 L2 || F0 F1 D2 || R6 R3 R0 || U8 B1 B2 |\n' +
            '| L3 L4 L5 || F3 F4 D5 || R7 R4 R1 || U5 B4 B5 |\n' +
            '| L6 L7 L8 || F6 F7 D8 || R8 R5 R2 || U2 B7 B8 |\n' +
            '+----------++----------++----------++----------+\n' +
            '            +----------+            \n' +
            '            | D0 D1 B6 |            \n' +
            '            | D3 D4 B3 |            \n' +
            '            | D6 D7 B0 |            \n' +
            '            +----------+            \n');

      // Confirm sides are rotated correctly 180 degrees
      rotate_face(rubix_cube, face);
      rubix_cube_str = rubix_cube_to_string(rubix_cube, cube_size);
      expect(rubix_cube_str).toBe(
        '            +----------+            \n' +
            '            | U0 U1 D2 |            \n' +
            '            | U3 U4 D5 |            \n' +
            '            | U6 U7 D8 |            \n' +
            '            +----------+            \n' +
            '+----------++----------++----------++----------+\n' +
            '| L0 L1 L2 || F0 F1 B6 || R8 R7 R6 || F8 B1 B2 |\n' +
            '| L3 L4 L5 || F3 F4 B3 || R5 R4 R3 || F5 B4 B5 |\n' +
            '| L6 L7 L8 || F6 F7 B0 || R2 R1 R0 || F2 B7 B8 |\n' +
            '+----------++----------++----------++----------+\n' +
            '            +----------+            \n' +
            '            | D0 D1 U2 |            \n' +
            '            | D3 D4 U5 |            \n' +
            '            | D6 D7 U8 |            \n' +
            '            +----------+            \n');

      // Confirm sides are rotated correctly 270 degrees
      rotate_face(rubix_cube, face);
      rubix_cube_str = rubix_cube_to_string(rubix_cube, cube_size);
      expect(rubix_cube_str).toBe(
        '            +----------+            \n' +
            '            | U0 U1 B6 |            \n' +
            '            | U3 U4 B3 |            \n' +
            '            | U6 U7 B0 |            \n' +
            '            +----------+            \n' +
            '+----------++----------++----------++----------+\n' +
            '| L0 L1 L2 || F0 F1 U2 || R2 R5 R8 || D8 B1 B2 |\n' +
            '| L3 L4 L5 || F3 F4 U5 || R1 R4 R7 || D5 B4 B5 |\n' +
            '| L6 L7 L8 || F6 F7 U8 || R0 R3 R6 || D2 B7 B8 |\n' +
            '+----------++----------++----------++----------+\n' +
            '            +----------+            \n' +
            '            | D0 D1 F2 |            \n' +
            '            | D3 D4 F5 |            \n' +
            '            | D6 D7 F8 |            \n' +
            '            +----------+            \n');

      // Confirm the face is in the correct final position rotated back
      rotate_face(rubix_cube, face);
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
    });
    it('should rotate a U face', () => {
      const cube_size = 3;
      const face = FACE.U;

      // Rotate the R face of a 3x3 cube
      const rubix_cube = generate_rubix_cube(cube_size);

      let faceData = get_rubix_cube_face(rubix_cube, face, cube_size);

      // Confirm the face is in the correct initial position
      let face_strings = cube_face_to_string(faceData, cube_size);
      expect(face_strings).toBe(
        '+----------+\n' +
            '| U0 U1 U2 |\n' +
            '| U3 U4 U5 |\n' +
            '| U6 U7 U8 |\n' +
            '+----------+',
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
      rotate_face(rubix_cube, face);
      faceData = get_rubix_cube_face(rubix_cube, face, cube_size);
      face_strings = cube_face_to_string(faceData, cube_size);
      expect(face_strings).toBe(
        '+----------+\n' +
            '| U6 U3 U0 |\n' +
            '| U7 U4 U1 |\n' +
            '| U8 U5 U2 |\n' +
            '+----------+',
      );

      // Confirm sides are rotated correctly 90 degrees
      rubix_cube_str = rubix_cube_to_string(rubix_cube, cube_size);
      expect(rubix_cube_str).toBe(
        '            +----------+            \n' +
            '            | U6 U3 U0 |            \n' +
            '            | U7 U4 U1 |            \n' +
            '            | U8 U5 U2 |            \n' +
            '            +----------+            \n' +
            '+----------++----------++----------++----------+\n' +
            '| F0 F1 F2 || R0 R1 R2 || B0 B1 B2 || L0 L1 L2 |\n' +
            '| L3 L4 L5 || F3 F4 F5 || R3 R4 R5 || B3 B4 B5 |\n' +
            '| L6 L7 L8 || F6 F7 F8 || R6 R7 R8 || B6 B7 B8 |\n' +
            '+----------++----------++----------++----------+\n' +
            '            +----------+            \n' +
            '            | D0 D1 D2 |            \n' +
            '            | D3 D4 D5 |            \n' +
            '            | D6 D7 D8 |            \n' +
            '            +----------+            \n');

      // Confirm sides are rotated correctly 180 degrees
      rotate_face(rubix_cube, face);
      rubix_cube_str = rubix_cube_to_string(rubix_cube, cube_size);
      expect(rubix_cube_str).toBe(
        '            +----------+            \n' +
            '            | U8 U7 U6 |            \n' +
            '            | U5 U4 U3 |            \n' +
            '            | U2 U1 U0 |            \n' +
            '            +----------+            \n' +
            '+----------++----------++----------++----------+\n' +
            '| R0 R1 R2 || B0 B1 B2 || L0 L1 L2 || F0 F1 F2 |\n' +
            '| L3 L4 L5 || F3 F4 F5 || R3 R4 R5 || B3 B4 B5 |\n' +
            '| L6 L7 L8 || F6 F7 F8 || R6 R7 R8 || B6 B7 B8 |\n' +
            '+----------++----------++----------++----------+\n' +
            '            +----------+            \n' +
            '            | D0 D1 D2 |            \n' +
            '            | D3 D4 D5 |            \n' +
            '            | D6 D7 D8 |            \n' +
            '            +----------+            \n');

      // Confirm sides are rotated correctly 270 degrees
      rotate_face(rubix_cube, face);
      rubix_cube_str = rubix_cube_to_string(rubix_cube, cube_size);
      expect(rubix_cube_str).toBe(
        '            +----------+            \n' +
            '            | U2 U5 U8 |            \n' +
            '            | U1 U4 U7 |            \n' +
            '            | U0 U3 U6 |            \n' +
            '            +----------+            \n' +
            '+----------++----------++----------++----------+\n' +
            '| B0 B1 B2 || L0 L1 L2 || F0 F1 F2 || R0 R1 R2 |\n' +
            '| L3 L4 L5 || F3 F4 F5 || R3 R4 R5 || B3 B4 B5 |\n' +
            '| L6 L7 L8 || F6 F7 F8 || R6 R7 R8 || B6 B7 B8 |\n' +
            '+----------++----------++----------++----------+\n' +
            '            +----------+            \n' +
            '            | D0 D1 D2 |            \n' +
            '            | D3 D4 D5 |            \n' +
            '            | D6 D7 D8 |            \n' +
            '            +----------+            \n');

      // Confirm the face is in the correct final position rotated back
      rotate_face(rubix_cube, face);
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
    });
    it('should rotate a D face', () => {
      const cube_size = 3;
      const face = FACE.D;

      // Rotate the R face of a 3x3 cube
      const rubix_cube = generate_rubix_cube(cube_size);

      let faceData = get_rubix_cube_face(rubix_cube, face, cube_size);

      // Confirm the face is in the correct initial position
      let face_strings = cube_face_to_string(faceData, cube_size);
      expect(face_strings).toBe(
        '+----------+\n' +
            '| D0 D1 D2 |\n' +
            '| D3 D4 D5 |\n' +
            '| D6 D7 D8 |\n' +
            '+----------+',
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
      rotate_face(rubix_cube, face);
      faceData = get_rubix_cube_face(rubix_cube, face, cube_size);
      face_strings = cube_face_to_string(faceData, cube_size);
      expect(face_strings).toBe(
        '+----------+\n' +
            '| D6 D3 D0 |\n' +
            '| D7 D4 D1 |\n' +
            '| D8 D5 D2 |\n' +
            '+----------+',
      );

      // Confirm sides are rotated correctly 90 degrees
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
            '| B6 B7 B8 || L6 L7 L8 || F6 F7 F8 || R6 R7 R8 |\n' +
            '+----------++----------++----------++----------+\n' +
            '            +----------+            \n' +
            '            | D6 D3 D0 |            \n' +
            '            | D7 D4 D1 |            \n' +
            '            | D8 D5 D2 |            \n' +
            '            +----------+            \n');

      // Confirm sides are rotated correctly 180 degrees
      rotate_face(rubix_cube, face);
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
            '| R6 R7 R8 || B6 B7 B8 || L6 L7 L8 || F6 F7 F8 |\n' +
            '+----------++----------++----------++----------+\n' +
            '            +----------+            \n' +
            '            | D8 D7 D6 |            \n' +
            '            | D5 D4 D3 |            \n' +
            '            | D2 D1 D0 |            \n' +
            '            +----------+            \n');

      // Confirm sides are rotated correctly 270 degrees
      rotate_face(rubix_cube, face);
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
            '| F6 F7 F8 || R6 R7 R8 || B6 B7 B8 || L6 L7 L8 |\n' +
            '+----------++----------++----------++----------+\n' +
            '            +----------+            \n' +
            '            | D2 D5 D8 |            \n' +
            '            | D1 D4 D7 |            \n' +
            '            | D0 D3 D6 |            \n' +
            '            +----------+            \n');

      // Confirm the face is in the correct final position rotated back
      rotate_face(rubix_cube, face);
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
    });
  });
});
