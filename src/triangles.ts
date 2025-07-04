/**
 * The triangles are defined clockwise from the top corner.
 */
export type Triangle = [number, number, number];
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
export function isEqualTriangle(tt: Triangle, t: Triangle): boolean {
    return (
        tt === t ||
        (tt[0] === t[0] && tt[1] === t[1] && tt[2] === t[2]) ||
        (tt[0] === t[2] && tt[1] === t[0] && tt[2] === t[1]) ||
        (tt[0] === t[1] && tt[1] === t[2] && tt[2] === t[0])
    );
}
