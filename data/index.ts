import { Shape } from '../src/shapes';
import { Triangle } from '../src/triangles';
import { chanukiah } from './chanukiah';
import { original } from './original';

export const dataSets: { [set: string]: { triangles: Triangle[]; shapes: { [shape: string]: Shape } } } = {
    original,
    chanukiah,
};
