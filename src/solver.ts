import { getCorners, Place } from './place';
import { PlacedTriangle, Rotation } from './placed-triangle';
import { isEqualTriangle, isTriangleFlat, Triangle, triangles } from './triangles';
import { shapes } from './shapes';
import { mapObject } from './tools';
import { CornerHeights, getCornerHeights, isEqualSolution, Solution } from './solution';
import * as fs from 'fs';

export function findAllSolutions() {
    const allSolutions = mapObject(shapes, (shape) => {
        const solutions: Solution[] = [];
        findSolutionsRecursive(shape, triangles, [], solutions);
        return solutions;
    });
    const folderPath = './solutions';
    fs.mkdirSync(folderPath, { recursive: true });

    mapObject(allSolutions, (solutions, shapeName) => {
        const filePath = `${folderPath}/${shapeName}.json`;
        fs.rmSync(filePath, { force: true });
        fs.appendFileSync(filePath, JSON.stringify(solutions));

        console.log(shapeName, solutions.length, filePath);
    });
}

function findSolutionsRecursive(
    shape: Place[],
    triangles: Triangle[],
    placedTriangles: PlacedTriangle[],
    solutions: PlacedTriangle[][],
) {
    // console.log(`${' '.repeat(shape.length)}/`);
    if (triangles.length === 0) {
        if (!solutions.some((s) => isEqualSolution(s, placedTriangles))) {
            solutions.push(placedTriangles);
            console.log(solutions.length);
        } else {
            // console.log('duplicate');
        }
    } else {
        const [place, ...remainingShape] = shape;
        const cornerHeights = getCornerHeights(placedTriangles);
        const distinctTriangles = triangles.filter((t, i) => i === triangles.findIndex((tt) => isEqualTriangle(tt, t)));
        for (const triangle of distinctTriangles) {
            for (const rotation of (isTriangleFlat(triangle) ? [0] : [0, 1, 2]) as Rotation[]) {
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
