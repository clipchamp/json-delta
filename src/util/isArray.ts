export function isArray<T>(o: unknown): o is T[] {
    return o instanceof Array;
}
