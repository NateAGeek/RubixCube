import * as math from "mathjs";
import { FACE_ORDER } from "./cube";

export function index_to_face_rubix_cube(index: number, w: number, h: number) {
    const face = Math.floor(index / (w * h));
    const face_index = index % (w * h);
    return `${FACE_ORDER[face]}${face_index}`;
}

export function cube_face_to_string(matrix: math.Matrix, w: number, h: number) {
    let rows: string[] = [];
    
    for (let i = 0; i < matrix.size()[0]; i++) {
        let row_string = "| ";
        for (let j = 0; j < matrix.size()[1]; j++) {
            row_string += index_to_face_rubix_cube(matrix.get([i, j]), w, h) + " ";
        }
        row_string += "|\n";
        rows.push(row_string);
    }

    let heading_string = "+" + "-".repeat(Math.max(...rows.map(v => v.length)) - 3) + "+";

    return heading_string + "\n" + rows.join("") + heading_string;
}

const PRINT_FORMAT = [
    [" ", "U", " "], 
    ["L", "F", "R", "B"],
    [" ", "D", " "]
]

export function rubix_cube_to_string(cube: math.Matrix,  w: number, h: number) {
    let result = "\n";

    for (let format_index_y = 0; format_index_y < PRINT_FORMAT.length; format_index_y++) {
        let row_strings = Array(h + 2).fill("");

        for (let format_index_x = 0; format_index_x < PRINT_FORMAT[format_index_y].length; format_index_x++) {
            let face_label = PRINT_FORMAT[format_index_y][format_index_x];
            
            if (face_label === " ") {
                for (let i = 0; i < row_strings.length; i++) {
                    row_strings[i] += " ".repeat(w * 4);
                }
                continue;
            }

            let face_index = FACE_ORDER.indexOf(face_label);
            let faceData = cube.subset(math.index(
                math.range(face_index * h, (face_index + 1) * h), 
                math.range(0, w)
            ));

            let face_strings = cube_face_to_string(faceData, w, h).split("\n");
            for (let i = 0; i < face_strings.length; i++) {
                row_strings[i] += face_strings[i];
            }
        }

        result += row_strings.join("\n") + "\n";
    }

    return result;
}