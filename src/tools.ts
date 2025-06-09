export function mapObject<K extends PropertyKey, V0, V>(
    object: Record<K, V0>,
    mapFn: ((value: V0) => V) | ((value: V0, key: K) => V),
): Record<K, V> {
    return Object.fromEntries(Object.entries(object).map(([k, v]) => [k, mapFn(v as V0, k as K)])) as Record<K, V>;
}
