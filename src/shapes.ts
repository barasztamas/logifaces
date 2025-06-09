import { Place } from './place';
import { mapObject } from './tools';

export type Shape = Place[];
export const shapeRotations = [0, 1, 2, 3, 4, 5] as const;
export type ShapeRotation = (typeof shapeRotations)[number];

export function getRotationSymmetries(_shape: Shape): ShapeRotation[] {
    const shape = normalizeShape(_shape);
    return shapeRotations.filter(
        (rotation) => JSON.stringify(shape) === JSON.stringify(normalizeShape(rotateShape(shape, rotation))),
    );
}

export function getShapeRotations(shape: Shape): Shape[] {
    return shapeRotations.map((rotation) => normalizeShape(rotateShape(shape, rotation)));
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
        .sort((a, b) => a.y - b.y || a.x - b.x || b.direction.localeCompare(a.direction));
}

const shapes: { [key: string]: Shape } = {
    mill_falcon: [
        { x: 2, y: 1, direction: 'down' },
        { x: 4, y: 1, direction: 'down' },
        { x: 1, y: 2, direction: 'down' },
        { x: 2, y: 2, direction: 'up' },
        { x: 2, y: 2, direction: 'down' },
        { x: 3, y: 2, direction: 'up' },
        { x: 3, y: 2, direction: 'down' },
        { x: 4, y: 2, direction: 'up' },
        { x: 4, y: 2, direction: 'down' },
        { x: 1, y: 3, direction: 'up' },
        { x: 1, y: 3, direction: 'down' },
        { x: 2, y: 3, direction: 'up' },
        { x: 2, y: 3, direction: 'down' },
        { x: 3, y: 3, direction: 'up' },
        { x: 3, y: 3, direction: 'down' },
        { x: 4, y: 3, direction: 'up' },
    ],
    meadow: [
        { x: 1, y: 1, direction: 'down' },
        { x: 2, y: 1, direction: 'down' },
        { x: 3, y: 1, direction: 'down' },
        { x: 1, y: 2, direction: 'up' },
        { x: 1, y: 2, direction: 'down' },
        { x: 2, y: 2, direction: 'up' },
        { x: 2, y: 2, direction: 'down' },
        { x: 3, y: 2, direction: 'up' },
        { x: 0, y: 3, direction: 'down' },
        { x: 1, y: 3, direction: 'up' },
        { x: 1, y: 3, direction: 'down' },
        { x: 2, y: 3, direction: 'up' },
        { x: 2, y: 3, direction: 'down' },
        { x: 0, y: 4, direction: 'up' },
        { x: 1, y: 4, direction: 'up' },
        { x: 2, y: 4, direction: 'up' },
    ],
    parallelogram: [1, 2, 3, 4]
        .map((x) => [1, 2].map((y) => (['up', 'down'] as const).map((direction) => ({ x, y, direction }))))
        .flat(2),
    triangle: [
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
    ],
    ship: [
        { x: 2, y: 1, direction: 'down' },
        { x: 3, y: 1, direction: 'up' },
        { x: 3, y: 1, direction: 'down' },
        { x: 4, y: 1, direction: 'up' },
        { x: 1, y: 2, direction: 'down' },
        { x: 2, y: 2, direction: 'up' },
        { x: 2, y: 2, direction: 'down' },
        { x: 3, y: 2, direction: 'up' },
        { x: 3, y: 2, direction: 'down' },
        { x: 1, y: 3, direction: 'up' },
        { x: 1, y: 3, direction: 'down' },
        { x: 2, y: 3, direction: 'up' },
        { x: 2, y: 3, direction: 'down' },
        { x: 3, y: 3, direction: 'up' },
        { x: 3, y: 3, direction: 'down' },
        { x: 1, y: 4, direction: 'up' },
    ],
    snake: [
        { x: 3, y: 2, direction: 'up' },
        { x: 3, y: 1, direction: 'down' },
        { x: 4, y: 1, direction: 'up' },
        { x: 4, y: 1, direction: 'down' },
        { x: 4, y: 2, direction: 'up' },
        { x: 4, y: 2, direction: 'down' },
        { x: 4, y: 3, direction: 'up' },
        { x: 3, y: 3, direction: 'down' },
        { x: 3, y: 4, direction: 'up' },
        { x: 2, y: 4, direction: 'down' },
        { x: 2, y: 4, direction: 'up' },
        { x: 1, y: 4, direction: 'down' },
        { x: 1, y: 4, direction: 'up' },
        { x: 1, y: 3, direction: 'down' },
        { x: 1, y: 3, direction: 'up' },
        { x: 1, y: 2, direction: 'down' },
    ],
    ring: [
        { x: 3, y: 1, direction: 'down' },
        { x: 4, y: 1, direction: 'up' },
        { x: 4, y: 1, direction: 'down' },
        { x: 4, y: 2, direction: 'up' },
        { x: 4, y: 2, direction: 'down' },
        { x: 4, y: 3, direction: 'up' },
        { x: 3, y: 3, direction: 'down' },
        { x: 3, y: 4, direction: 'up' },
        { x: 2, y: 4, direction: 'down' },
        { x: 2, y: 4, direction: 'up' },
        { x: 1, y: 4, direction: 'down' },
        { x: 1, y: 4, direction: 'up' },
        { x: 1, y: 3, direction: 'down' },
        { x: 2, y: 3, direction: 'up' },
        { x: 2, y: 2, direction: 'down' },
        { x: 3, y: 2, direction: 'up' },
    ],
    tie_fighter: [
        { x: 1, y: 1, direction: 'down' },
        { x: 2, y: 1, direction: 'up' },
        { x: 2, y: 1, direction: 'down' },
        { x: 1, y: 2, direction: 'up' },
        { x: 1, y: 2, direction: 'down' },
        { x: 2, y: 2, direction: 'up' },
        { x: 2, y: 2, direction: 'down' },
        { x: 3, y: 2, direction: 'up' },
        { x: 0, y: 3, direction: 'down' },
        { x: 1, y: 3, direction: 'up' },
        { x: 1, y: 3, direction: 'down' },
        { x: 2, y: 3, direction: 'up' },
        { x: 2, y: 3, direction: 'down' },
        { x: 0, y: 4, direction: 'up' },
        { x: 0, y: 4, direction: 'down' },
        { x: 1, y: 4, direction: 'up' },
    ],
    arrow: [
        { x: 2, y: 1, direction: 'down' },
        { x: 3, y: 1, direction: 'up' },
        { x: 3, y: 1, direction: 'down' },
        { x: 4, y: 1, direction: 'up' },
        { x: 1, y: 2, direction: 'down' },
        { x: 2, y: 2, direction: 'up' },
        { x: 2, y: 2, direction: 'down' },
        { x: 3, y: 2, direction: 'up' },
        { x: 1, y: 3, direction: 'up' },
        { x: 1, y: 3, direction: 'down' },
        { x: 2, y: 3, direction: 'up' },
        { x: 2, y: 3, direction: 'down' },
        { x: 1, y: 4, direction: 'up' },
        { x: 1, y: 4, direction: 'down' },
        { x: 2, y: 4, direction: 'up' },
        { x: 2, y: 4, direction: 'down' },
    ],
};

export const normalizedShapes = mapObject(shapes, normalizeShape);
