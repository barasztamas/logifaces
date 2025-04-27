import { getCorners, Place } from './place';
import { Triangle } from './triangles';

export type PlacedTriangle = { place: Place; triangle: Triangle; rotation: 0 | 1 | 2 };

export type CornerHeights = number[][];
export function getCornerHeights(placedTriangles: PlacedTriangle[]): CornerHeights {
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
