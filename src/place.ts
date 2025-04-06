export type Place = { x: number; y: number; direction: 'up' | 'down' };

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
