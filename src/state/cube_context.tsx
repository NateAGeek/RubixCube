import React, { createContext, useCallback, useState } from "react";
import { Cube, FACE, generate_rubix_cube, get_rubix_cube_face } from "../math/cube";
import { rotate_face } from "../math/transforms";

const RUBIX_CUBE_SIZE = 3;

export interface RubixCubeState {
    cube_size: number;
    cube: Cube;
}

type RubixCubeContextType = [
    RubixCubeState,
    React.Dispatch<React.SetStateAction<RubixCubeState>>
];

export const RubixCubeContext = createContext<RubixCubeContextType | null>(null);

export function RubixCubeProvider({children}: {children: React.ReactNode}) {
    const cubeContextState = useState({
        cube_size: RUBIX_CUBE_SIZE,
        cube: generate_rubix_cube(RUBIX_CUBE_SIZE),
    });
    return (
        <RubixCubeContext.Provider value={cubeContextState}>
            {children}
        </RubixCubeContext.Provider>
    );
}

export function useRubixCube() {
    const rubixCubeContext = React.useContext(RubixCubeContext);
    if (rubixCubeContext === null) {
        throw new Error('useCube must be used within a RubixCubeContext.Provider');
    }

    const [{cube, cube_size}, setCubeState] = rubixCubeContext;

    const getFace = useCallback((face_id: FACE) => {
        return get_rubix_cube_face(cube, face_id, cube_size);
    }, [cube, cube_size]);

    const rotateFace = useCallback((face_id: FACE) => {
        setCubeState((prev) => {
            return {
                ...prev,
                cube: rotate_face(prev.cube, face_id, cube_size),
            };
        });
    }, [cube, cube_size]);

    return {
        rotateFace,
        getFace,
        cube_size,
        cube,
    }
}

