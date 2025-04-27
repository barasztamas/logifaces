export type Place = { x: number; y: number; direction: 'up' | 'down' };
type PlaceCorner = { x: number; y: number };

/**
 * @returns the corners of the place clockwise from the top / top right corner
 */
export function getCorners({ x, y, direction }: Place): [PlaceCorner, PlaceCorner, PlaceCorner] {
    if (direction === 'up') {
        return [
            { x, y: y + 1 },
            { x: x + 1, y },
            { x, y },
        ];
    }
    return [
        { x: x + 1, y: y + 1 },
        { x: x + 1, y },
        { x, y: y + 1 },
    ];
}
