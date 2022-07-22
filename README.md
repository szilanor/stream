# Stream API

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)
![CI Pipeline](https://github.com/szilanor/stream/actions/workflows/ci.yml/badge.svg)

Type-safe API for processing iterable data in TypeScript and JavaScript similarly to [Java 8 Stream API](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html),
[LINQ](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/) or [Kotlin Sequences](https://kotlinlang.org/docs/sequences.html).
Unlike [RxJS](https://www.npmjs.com/package/rxjs) this library is not asynchronous, you get an immediate result without any subscription or await call.

- [API Docs](https://szilanor.github.io/stream/)
- [Benchmark](https://github.com/szilanor/stream/blob/main/benchmarks/groupBy.ts)

If this library makes your life easier or your boss happier, and you want to support my work then you can always thank me with a free coffee.

[![donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=PRBMJHJUFYZQL)

## Getting started

```bash
npm install --save @szilanor/stream
```

Alternatively use Stream from [CDN](https://unpkg.com/@szilanor/stream/) by adding this to your HTML:

```html
<script src="https://unpkg.com/@szilanor/stream/"></script>
```

## Classic Javascript solution

```typescript
const result = [1, 2, 3].filter(x => x % 2 === 0).map(x => x * 2);
```

## Stream API solution

Creating a Stream object

```typescript
import {Stream, of, from} from '@szilanor/stream';

let stream: Stream<number>;
stream = new Stream([1, 2, 3]); // With constructor;
stream = of(1, 2, 3); // With the 'of' creator function
stream = from([1, 2, 3]); // With the 'from' creator function
```

Operations on stream entries for the same result

```typescript
import {filter, map, compound} from '@szilanor/stream';

// Chaining pipes
stream = stream.pipe(filter(x => x % 2 === 0)).pipe(map(x => x * 2));

stream = stream.pipe(
  filter(x => x % 2 === 0),
  map(x => x * 2)
);

// Using the 'compound' operation
const compoundOperation = compound(
  filter(x => x % 2 === 0),
  map(x => x * 2)
)
stream = stream.pipe(compoundOperation);
```

Process the stream for the same result

```typescript
import {toArray} from '@szilanor/stream';

// Using for..of
let result = [];
for (let entry of stream) {
  result.push(entry);
}

// Using spread operator
result = [...stream];

// With a collector
result = stream.collect(toArray());
```

## Why Stream API?

- Can achieve faster results

```typescript
/*
 * Since the API is using Javascript Iterables the operations are applied
 * to the entries one bye one in order. In this example we know the
 * answer after the second element, so it is unnecessary to map everything
 * first.
 */

let allEven: boolean;
const input = [1, 2, 3, 4, 5];

// Classic JS maps all the entries first then returns false
allEven = input.map(x => x + 1).every(x => x % 2 === 0);

// vs Stream API maps only the first element then returns false
allEven = from(input)
  .pipe(map(x => x + 1))
  .collect(all(x => x % 2 === 0));
```

- More readable code

```typescript
import {from, distinct, collect} from '@szilanor/stream';

// Filtering duplicates and group them by whether they are even or odd
const input = [1, 1, 1, 1, 2, 3, 4, 4, 5];

// Classic JS
const resultClassic: Map<string, number[]> = new Map<string, number[]>();
Array.from(new Set<number>(input)).forEach(x => {
  const key = x % 2 === 0 ? 'even' : 'odd';
  resultClassic.set(key, [...(resultClassic.get(key) || []), x]);
});

// Stream API
const resultStreamApi: Map<string, number[]> = from(input)
  .pipe(distinct())
  .collect(groupBy(x => (x % 2 === 0 ? 'even' : 'odd')));
```

- You can create your own operators / collectors if you don't find what you need

```typescript
import {CollectorFunction, OperationFunction} from '@szilanor/stream';

const myAwesomeCollector: CollectorFunction<unknown, unknown> = {
  /* your own implementation */
};
const myAwesomeOperation: OperationFunction<unknown, unknown> = {
  /* your own implementation */
};

const result = of(1, 2, 3)
  .pipe(myAwesomeOperation())
  .collect(myAwesomeCollector());
```
