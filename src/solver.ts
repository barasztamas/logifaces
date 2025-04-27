import { getCorners, Place } from './place';
import { CornerHeights, getCornerHeights, PlacedTriangle } from './placed-triangle';
import { Triangle, triangles } from './triangles';
import { shapes } from './shapes';
import { mapObject } from './tools';

export function findAllSolutions() {
    const allSolutions = mapObject(shapes, (shape, name) => {
        const solutions: PlacedTriangle[][] = [];
        findSolutionsRecursive(shape, triangles, [], solutions);
        return solutions;
    });
    console.log(JSON.stringify(mapObject(allSolutions, (s) => ({ s: s[0], l: s.length, c: getCornerHeights(s[0]) }))));
}

function findSolutionsRecursive(
    shape: Place[],
    triangles: Triangle[],
    placedTriangles: PlacedTriangle[],
    solutions: PlacedTriangle[][],
) {
    // console.log(`${' '.repeat(shape.length)}/`);
    if (shape.length === 0) {
        solutions.push(placedTriangles);
        console.log(solutions.length);
    } else {
        const [place, ...remainingShape] = shape;
        const cornerHeights = getCornerHeights(placedTriangles);
        for (const triangle of triangles) {
            for (const rotation of [0, 1, 2] as const) {
                const placedTriangle = { place, triangle, rotation };
                if (isValidCombination(cornerHeights, placedTriangle)) {
                    const remainingTriangles = triangles.filter((t) => t !== triangle);
                    findSolutionsRecursive(
                        remainingShape,
                        remainingTriangles,
                        [...placedTriangles, placedTriangle],
                        solutions,
                    );
                }
            }
        }
    }
    // console.log(`${' '.repeat(shape.length)}\\`);
}

function isValidCombination(cornerHeights: CornerHeights, { place, triangle, rotation }: PlacedTriangle) {
    const corners = getCorners(place);
    for (let i = 0; i < 3; i++) {
        const { x, y } = corners[i];
        const height = triangle[(i + 3 - rotation) % 3];
        if (cornerHeights[x]?.[y] && cornerHeights[x][y] !== height) {
            return false;
        }
    }
    return true;
}
