import { PlacedTriangle, Rotation } from './placed-triangle';
import { normalizeShape, rotateShape, ShapeRotation } from './shapes';

export type Solution = PlacedTriangle[];

function rotateSolution(solution: Solution, rotateBy: ShapeRotation) {
    if (rotateBy === 0) {
        return solution;
    }
    const rotatedSolution: Solution = solution.map(({ place, rotation, triangle }) => ({
        place: rotateShape([place], rotation)[0],
        rotation: place.direction === 'up' ? rotation : (((rotation + 1) % 3) as Rotation),
        triangle,
    }));
    return rotateSolution(rotatedSolution, (rotateBy - 1) as ShapeRotation);
}

function normalizeSolution(solution: Solution): Solution {
    const minX = Math.min(...solution.map(({ place }) => place.x));
    const minY = Math.min(...solution.map(({ place }) => place.y));
    return solution
        .map(({ rotation, triangle, place: { x, y, direction } }) => ({
            rotation,
            triangle,
            place: {
                x: x - minX,
                y: y - minY,
                direction,
            },
        }))
        .sort(
            (a, b) =>
                a.place.x - b.place.x || a.place.y - b.place.y || a.place.direction.localeCompare(b.place.direction),
        );
}
