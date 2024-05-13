import * as math from 'mathjs';
import {FACE, FACE_ORDER} from './cube';

export function cube_index_to_sub_face_id(index: number, cube_size: number = 3) {
  const face = cube_index_to_face_id(index, cube_size);
  const face_index = index % (cube_size * cube_size);
  return `${face}${face_index}`;
}

export function cube_index_to_face_id(index: number, cube_size: number = 3) {
  return FACE_ORDER[Math.floor(index / (cube_size * cube_size))];
}

export function cube_face_to_string(matrix: math.Matrix, cube_size: number = 3) {
  const rows: string[] = [];

  for (let i = 0; i < matrix.size()[0]; i++) {
    let row_string = '| ';
    for (let j = 0; j < matrix.size()[1]; j++) {
      row_string += cube_index_to_sub_face_id(matrix.get([i, j]), cube_size) + ' ';
    }
    row_string += '|\n';
    rows.push(row_string);
  }

  const heading_string = '+' + '-'.repeat(Math.max(...rows.map((v) => v.length)) - 3) + '+';

  return heading_string + '\n' + rows.join('') + heading_string;
}

const PRINT_FORMAT = [
  [FACE.NA, FACE.U, FACE.NA],
  [FACE.L, FACE.F, FACE.R, FACE.B],
  [FACE.NA, FACE.D, FACE.NA],
];

export function rubix_cube_to_string(cube: math.Matrix, cube_size: number = 3) {
  let result = '';

  for (let format_index_y = 0; format_index_y < PRINT_FORMAT.length; format_index_y++) {
    const row_strings = Array(cube_size + 2).fill('');

    for (let format_index_x = 0; format_index_x < PRINT_FORMAT[format_index_y].length; format_index_x++) {
      const face_label = PRINT_FORMAT[format_index_y][format_index_x];

      if (face_label === FACE.NA) {
        for (let i = 0; i < row_strings.length; i++) {
          row_strings[i] += ' '.repeat(cube_size * 4);
        }
        continue;
      }

      const face_index = FACE_ORDER.indexOf(face_label);
      const faceData = cube.subset(math.index(
        math.range(face_index * cube_size, (face_index + 1) * cube_size),
        math.range(0, cube_size),
      ));

      const face_strings = cube_face_to_string(faceData, cube_size).split('\n');
      for (let i = 0; i < face_strings.length; i++) {
        row_strings[i] += face_strings[i];
      }
    }

    result += row_strings.join('\n') + '\n';
  }

  return result;
}

export function rubix_cube_get_row(cube: math.Matrix, face: FACE, row_index: number, cube_size: number = 3): math.Matrix {
  const face_index = FACE_ORDER.indexOf(face);

  return cube.subset(math.index(
    face_index * cube_size + row_index,
    math.range(0, cube_size),
  ));
}

export function rubix_cube_get_column(cube: math.Matrix, face: FACE, column_index: number, cube_size: number = 3): math.Matrix {
  const face_index = FACE_ORDER.indexOf(face);

  return cube.subset(math.index(
    math.range(face_index * cube_size, (face_index + 1) * cube_size),
    column_index,
  ));
}
