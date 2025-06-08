import { Place } from './place';
import { Triangle } from './triangles';

export type Rotation = 0 | 1 | 2;

export type PlacedTriangle = { place: Place; triangle: Triangle; rotation: Rotation };
