import { Place } from './place';

export type Shape = Place[];
const ShapeRotations = [0, 1, 2, 3, 4, 5] as const;
export type ShapeRotation = (typeof ShapeRotations)[number];

export function getRotationSymmetries(_shape: Shape): ShapeRotation[] {
    const shape = normalizeShape(_shape);
    return ShapeRotations.filter((rotation) => JSON.stringify(shape) === JSON.stringify(rotateShape(shape, rotation)));
}

export function getShapeRotations(shape: Shape): Shape[] {
    return ShapeRotations.map((rotation) => normalizeShape(rotateShape(shape, rotation)));
}

export function rotateShape(shape: Shape, rotation: ShapeRotation): Shape {
    if (rotation === 0) {
        return shape;
    }
    const rotatedShape: Shape = shape.map(({ x, y, direction }) => ({
        x: x + y + (direction === 'up' ? 0 : 1),
        y: -x,
        direction: direction === 'up' ? 'down' : 'up',
    }));
    return rotateShape(rotatedShape, (rotation - 1) as ShapeRotation);
}

export function normalizeShape(shape: Shape): Shape {
    const minX = Math.min(...shape.map(({ x }) => x));
    const minY = Math.min(...shape.map(({ y }) => y));
    return shape
        .map(({ x, y, direction }) => ({
            x: x - minX,
            y: y - minY,
            direction,
        }))
        .sort((a, b) => a.x - b.x || a.y - b.y || a.direction.localeCompare(b.direction));
}

export const shapes: { [key: string]: Shape } = {
    triangle: normalizeShape([
        { x: 1, y: 1, direction: 'up' },
        { x: 1, y: 1, direction: 'down' },
        { x: 2, y: 1, direction: 'up' },
        { x: 2, y: 1, direction: 'down' },
        { x: 3, y: 1, direction: 'up' },
        { x: 3, y: 1, direction: 'down' },
        { x: 4, y: 1, direction: 'up' },
        { x: 1, y: 2, direction: 'up' },
        { x: 1, y: 2, direction: 'down' },
        { x: 2, y: 2, direction: 'up' },
        { x: 2, y: 2, direction: 'down' },
        { x: 3, y: 2, direction: 'up' },
        { x: 1, y: 3, direction: 'up' },
        { x: 1, y: 3, direction: 'down' },
        { x: 2, y: 3, direction: 'up' },
        { x: 1, y: 4, direction: 'up' },
    ]),
};
