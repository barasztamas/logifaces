import { getCorners, Place } from './place';
import { CornerHeights, getCornerHeights, PlacedTriangle } from './placed-triangle';
import { Triangle } from './triangles';

function findAllSolutions() {}

function findSolutionsRecursive(
    shape: Place[],
    triangles: Triangle[],
    placedTriangles: PlacedTriangle[],
    solutions: PlacedTriangle[][],
) {
    if (shape.length === 0) {
        solutions.push(placedTriangles);
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
}

function isValidCombination(cornerHeights: CornerHeights, placedTriangle: PlacedTriangle) {
    const corners = getCorners(placedTriangle.place);
    for (let i = 0; i < 3; i++) {
        const { x, y } = corners[i];
        const height = placedTriangle.triangle[(i + placedTriangle.rotation) % 3];
        if (cornerHeights[x][y] && cornerHeights[x][y] !== height) {
            return false;
        }
    }
    return true;
}
