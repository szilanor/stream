# Stream API 
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)
![Publish Pipeline](https://github.com/szilanor/stream/actions/workflows/publish.yml/badge.svg)

Type-safe API for processing iterable data in TypeScript and JavaScript similarly to [Java 8 Stream API](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html),
[LINQ](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/) or [Kotlin Sequences](https://kotlinlang.org/docs/sequences.html).

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

// Chaining pipe functions
stream = stream.pipe(filter(x => x % 2 === 0)).pipe(map(x => x * 2));

// Using the 'compound' operation
stream = stream.pipe(
  compound(
    filter(x => x % 2 === 0),
    map(x => x * 2)
  )
);
```

Process the stream for the same result

```typescript
import {toArray} from '@szilanor/stream';

// Using for..of
let result = [];
for (let entry of stream) {
  result.push(entry);
}

// With a collector
result = stream.collect(toArray());
```

## Why Stream API?

- More readable code

```typescript
import {from, distinct, collect} from '@szilanor/stream';

// Filtering duplicates and group them by whether they are even or odd
const input = [1, 1, 1, 1, 2, 3, 4, 4, 5];
let result: Map<string, number[]>;

// Classic JS
result = new Map<string, number[]>(
  Array.from(new Set<number>(input)).map(x => [x % 2 === 0 ? 'even' : 'odd', x])
);

// vs Stream API
result = from(input)
  .pipe(distinct())
  .collect(groupBy(x => (x % 2 === 0 ? 'even' : 'odd')));
```

- Less comparison

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

- You can create your own operators / collectors if you don't find what you need

```typescript
import {CollectorFunction, OperationFunction} from '@szilanor/stream';

const myAwesomeCollector: CollectorFunction<unknown, unknown> = { /* your own implementation */ };
const myAwesomeOperation: OperationFunction<unknown, unknown> = { /* your own implementation */ };

const result = of(1, 2, 3)
  .pipe(myAwesomeOperation())
  .collect(myAwesomeCollector());
```
