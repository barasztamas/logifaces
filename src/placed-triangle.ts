import { Place } from './place';
import { rotateTriangle, Rotation, Triangle } from './triangles';

export type PlacedTriangle = { place: Place; triangle: Triangle };

export function placeTriangle(place: Place, triangle: Triangle, rotation: Rotation): PlacedTriangle {
    return { place, triangle: rotateTriangle(triangle, rotation) };
}
