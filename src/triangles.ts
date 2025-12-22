/**
 * The triangles are defined clockwise from the top corner.
 */
export type Triangle = [number, number, number];

export type Rotation = 0 | 1 | 2;

export function rotateTriangle(triangle: Triangle, rotation: Rotation): Triangle {
    return triangle.map((_, i) => triangle[(i + 3 - rotation) % 3]) as Triangle;
}

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
