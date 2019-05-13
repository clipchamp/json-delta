import { isArray } from './isArray';
import { DiffInsert, DiffPart } from '../index';

export function isInsert<T>(d: DiffPart<T>): d is DiffInsert<T> {
    return isArray(d[0]);
}
