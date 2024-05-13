import React, {createContext, useCallback, useState} from 'react';
import {Cube, FACE, generate_rubix_cube, get_rubix_cube_face} from './math/cube';
import {rotate_face} from './math/transforms';

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

/**
 * RubixCubeProvider component
 * Provides and sets a default RubixCubeContext to the application
 *
 * @param {{children: React.ReactNode}} props
 * @return {JSX.Element} The JSX RubixCubeProvider component
*/
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

/**
 * RubixCubeHooks interface
 * @member {function} rotateFace The rotateFace function that does a state update
 * @member {function} getFace The getFace function that returns a face of the cube
 * @member {number} cube_size The size of the cube
 * @member {Cube} cube The cube object
 *
 */
export interface RubixCubeHooks {
    /** Cube size */
    cube_size: number;
    /** Cube Matrix */
    cube: Cube;
    /** Rotate a face of the cube */
    rotateFace: (face_id: FACE) => void;
    /** Get a face of the cube */
    getFace: (face_id: FACE) => Cube;
};

/**
 * useRubixCube hook
 *
 * Returns the RubixCubeHooks that allows for global state management
 * of the cube and helper functions to manipulate the cube
 *
 * @return {RubixCubeHooks} The RubixCubeHooks object
 */
export function useRubixCube(): RubixCubeHooks {
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
    cube_size,
    cube,
    rotateFace,
    getFace,
  };
}

