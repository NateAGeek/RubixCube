import React from "react";
import { useRubixCube } from "../../state/cube_context";
import { FACE } from "../../math/cube";
import { rubix_cube_to_string } from "../../math/utils";

export default function Controls() {

    const {cube_size, cube, rotateFace} = useRubixCube();

    return (
        <div id="controls">
            {Object.values(FACE).filter((face) => face != FACE.NA).map((face) => (
                <button onClick={() => {
                    rotateFace(face);
                    console.log(rubix_cube_to_string(cube, cube_size));
                    console.log(`Rotate ${face.toString()}`);
                }}>Rotate {face.toString()}</button>
            ))}
        </div>
    );
}