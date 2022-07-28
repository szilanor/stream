# Stream API

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)
![CI Pipeline](https://github.com/szilanor/stream/actions/workflows/ci.yml/badge.svg)
[![donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=PRBMJHJUFYZQL)

Type-safe API for processing Iterable data (Arrays, Sets, Maps, Iterables) similarly to [Java 8 Stream API](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html),
[LINQ](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/) or [Kotlin Sequences](https://kotlinlang.org/docs/sequences.html).

- [API Docs](https://szilanor.github.io/stream/)
- [Benchmarks](https://github.com/szilanor/stream/blob/main/benchmarks/)

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

stream = stream.pipe(
  filter(x => x % 2 === 0),
  map(x => x * 2)
);
```

Process the stream for the same result

```typescript
import {toArray} from '@szilanor/stream';

// With a collector
result = stream.collect(toArray());

// Using for..of
let result = [];
for (let entry of stream) {
  result.push(entry);
}

// Using spread operator
result = [...stream];
```

## Why Stream API?

- Can achieve faster results due to sequential processing

```typescript
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

- You can create your own operators and collectors if you don't find what you need

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
