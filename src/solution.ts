import { getCorners } from './place';
import { PlacedTriangle } from './placed-triangle';
import { rotateTriangle, Rotation } from './triangles';
import { rotateShape, Shape, ShapeRotation, shapeRotations } from './shapes';

export type Solution = PlacedTriangle[];

function rotateSolution(solution: Solution, rotateBy: ShapeRotation) {
    if (rotateBy === 0) {
        return solution;
    }
    const rotatedSolution: Solution = solution.map(({ place, triangle }) => ({
        place: rotateShape([place], 1)[0],
        triangle: rotateTriangle(triangle, (place.direction === 'up' ? 0 : 1) as Rotation),
    }));
    return rotateSolution(rotatedSolution, (rotateBy - 1) as ShapeRotation);
}

function normalizeSolution(solution: Solution): Solution {
    const minX = Math.min(...solution.map(({ place }) => place.x));
    const minY = Math.min(...solution.map(({ place }) => place.y));
    return solution
        .map(({ triangle, place: { x, y, direction } }) => ({
            triangle,
            place: {
                x: x - minX,
                y: y - minY,
                direction,
            },
        }))
        .sort(({ place: a }, { place: b }) => {
            return a.y - b.y || a.x - b.x || b.direction.localeCompare(a.direction);
        });
}

export type CornerHeights = number[][];
export function getCornerHeights(placedTriangles: Solution): CornerHeights {
    const cornerHeights: CornerHeights = [];
    for (const { place, triangle } of placedTriangles) {
        const corners = getCorners(place);
        for (let i = 0; i < 3; i++) {
            const { x, y } = corners[i];
            const height = triangle[i];
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
    for (const rotation of shapeRotations) {
        const rotatedB = rotateSolution(b, rotation);
        const normalizedB = normalizeSolution(rotatedB);
        if (
            JSON.stringify(shapeOfSolution(normalizedA)) === JSON.stringify(shapeOfSolution(normalizedB)) &&
            JSON.stringify(getCornerHeights(normalizedA)) === JSON.stringify(getCornerHeights(normalizedB))
        )
            return true;
    }
    return false;
}
