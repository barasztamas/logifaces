type CornerHeight = 1 | 2 | 3;

/**
 * The triangles are defined clockwise from the top corner.
 */
export type Triangle = [CornerHeight, CornerHeight, CornerHeight];
export const triangles: Triangle[] = [
    [1, 1, 1],
    [1, 1, 2],
    [1, 1, 2],
    [2, 2, 1],
    [1, 1, 3],
    [1, 3, 3],
    [2, 3, 3],
    [3, 3, 3],
    [3, 3, 2],
    [1, 2, 3],
    [1, 3, 2],
    [1, 3, 2],
    [2, 2, 3],
    [2, 2, 3],
    [1, 2, 3],
    [2, 3, 3],
];

export function isTriangleFlat(triangle: Triangle) {
    return triangle[0] === triangle[1] && triangle[1] === triangle[2];
}
