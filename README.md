# json-delta

_Forked from [corps/json-delta](https://github.com/corps/json-delta)_

## Why a fork?

This for provides typings in the npm package. This fork will also be used to try and become
more active for projects.

## About `json-delta`

json-delta is an efficient, JSON oriented javascript object delta calculator and applier.
It provides a configurable threshold (tolerance) after which the diff calculator will short circuit
a more complex delta analysis, useful for calculating deltas on very large objects that may from
time to time be fully replaced.

Unlike similar libraries, json-delta sacrifices certain features and makes certain sane assumptions
that allow it to perform.

For instance, it treats `undefined` as `null` and does not preserve constructor or prototype-bound
behaviors.  Arrays are not diffed recursively -- any elements with property changes result in single
replacement delta of that element.  Objects are diffed recursively, however, so only the deepest
nodes of a structure have their changes tracked.

`diff(a, b, tolerance?)` returns a simple array describing the changes needed to transform a to b.
It will return null if a and b are deeply equal, and will return a single replacement delta if
more than tolerance (number) of changes are found.

`applyDiff(a, diff)` returns an object that would be deeply equal to b.

`applyDiff` will not mutate the original a, although it may share references to container objects
not changed in the patching.  It uses shallow copying on any container that changes.


```javascript
var jd = require("json-delta");
var diff = jd.diff([1, 2, 3], [1, 2, 3, 4]);
console.log(jd.applyDiff([1, 2, 3], diff));
```

## Installation

```
npm i @clipchamp/json-delta
```

## Using `json-delta`

`json-delta` supplies two pretty main/important functions, at least for clipchamp.

### `diff<T>`

`diff<T>` takes two objects, and will return to you a `Diff<T>`. This diff
object can only be applied to the type of object (supplied by `T`). For example:

```typescript
const coordinates1: Coordinates = {
    x: 1,
    y: 0
};
const coordinates2: Coordinates = {
    x: 1,
    y: 1
};
// This will result in the type of Diff<Coordinates>
const diffBetweenCoordinates = diff(coordinates1, coordinates2);
```

The resulting diff will be something like:
```typescript
const someDiff = {
    y: 0 => 1
}
```

### `applyDiff<T>`

`applyDiff<T>` will allow you to apply a diff you previous collected, back onto
the object (that follows the same generic typing of `T`).

```typescript
const coordinates1As2 = applyDiff(coordiantes1, diffBetweenCoordinates);
```

