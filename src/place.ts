export type Place = { x: number; y: number; direction: 'up' | 'down' };
type PlaceCorner = { x: number; y: number };

/**
 * @returns the corners of the place clockwise from the top / top right corner
 */
export function getCorners(place: Place): [PlaceCorner, PlaceCorner, PlaceCorner] {
    const { x, y, direction } = place;
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

function neighbourValue(p: Place) {
    return p.x + p.y + p.direction === 'up' ? -1 : 0;
}
export function isNeighbour(a: Place, b: Place) {
    if (a.direction === b.direction) {
        return false;
    }
    if (a.x === b.x && a.y === b.y) {
        return true;
    }
    if ((a.x === b.x || a.y === b.y) && neighbourValue(a) === neighbourValue(b)) {
        return true;
    }
    return false;
}
