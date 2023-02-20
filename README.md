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

```typescript
from([1, 2, 3])
  .pipe(
    filter(x => x % 2 === 0),
    map(x => x * 2)
  )
  .collect(toArray());
```

## Why Stream API?

- Can achieve faster results due to sequential processing

```typescript
const input = [1, 2, 3, 4, 5];
let allOdd: boolean;

// Classic JS
allOdd = input
    .map(x => x + 1)
    .every(x => x % 2 === 1);

// Output
// 2
// 3
// 4
// 5
// 6
// false

// Stream API
allOdd = from(input)
  .pipe(map(x => x + 1))
  .collect(every(x => x % 2 === 1));

// Output
// 2
// false
```

- More readable code

```typescript
const input = [1, 1, 1, 1, 2, 3, 4, 4, 5];
let oddOrEvenWithoutDuplicates: Map<string, number[]>;

// Classic JS
oddOrEvenWithoutDuplicates = new Map<string, number[]>();
Array.from(new Set<number>(input)).forEach(x => {
  const key = x % 2 === 0 ? 'even' : 'odd';
  if (resultClassic.has(key)) {
    resultClassic.get(key).push(x);
  } else {
    resultClassic.set(key, [x]);
  }
});

// Stream API
oddOrEvenWithoutDuplicates = from(input)
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
