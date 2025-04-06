import { Place } from './place';

export const shapes: { [key: string]: Place[] } = {
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
};
