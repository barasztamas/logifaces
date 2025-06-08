import { getCorners } from './place';
import { PlacedTriangle, Rotation } from './placed-triangle';
import { getRotationSymmetries, rotateShape, Shape, ShapeRotation } from './shapes';
import { isEqualTriangle } from './triangles';

export type Solution = PlacedTriangle[];

function rotateSolution(solution: Solution, rotateBy: ShapeRotation) {
    if (rotateBy === 0) {
        return solution;
    }
    const rotatedSolution: Solution = solution.map(({ place, rotation, triangle }) => ({
        place: rotateShape([place], 1)[0],
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

export type CornerHeights = number[][];
export function getCornerHeights(placedTriangles: Solution): CornerHeights {
    const cornerHeights: CornerHeights = [];
    for (const { place, triangle, rotation } of placedTriangles) {
        const corners = getCorners(place);
        for (let i = 0; i < 3; i++) {
            const { x, y } = corners[i];
            const height = triangle[(i + 3 - rotation) % 3];
            if (!cornerHeights[x]) {
                cornerHeights[x] = [];
            }
            if (cornerHeights[x][y] && cornerHeights[x][y] !== height) {
                throw new Error(`Inconsistent height at (${x}, ${y}): ${cornerHeights[x][y]} vs ${height}`);
            }
            cornerHeights[x][y] = height;
        }
    }
    return cornerHeights;
}

function shapeOfSolution(solution: Solution): Shape {
    return solution.map(({ place }) => place);
}

export function isEqualSolution(a: Solution, b: Solution): boolean {
    if (a === b) return true;

    if (a.length !== b.length) return false;

    const normalizedA = normalizeSolution(a);
    const rotations = getRotationSymmetries(shapeOfSolution(a));
    for (const rotation of rotations) {
        const rotatedB = rotateSolution(b, rotation);
        const normalizedB = normalizeSolution(rotatedB);

        if (
            JSON.stringify(shapeOfSolution(normalizedA)) === JSON.stringify(shapeOfSolution(normalizedB)) &&
            JSON.stringify(getCornerHeights(normalizedA)) === JSON.stringify(getCornerHeights(normalizedB)) &&
            normalizedB.every(({ triangle }, index) => isEqualTriangle(triangle, normalizedA[index].triangle))
        )
            return true;
    }
    return false;
}
