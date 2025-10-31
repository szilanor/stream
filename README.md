# Stream API

Type-safe API for processing Iterable and AsyncIterable data (Arrays, Sets, Maps) similarly to [Java 8 Stream API](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html),
[LINQ](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/) or [Kotlin Sequences](https://kotlinlang.org/docs/sequences.html).

- [API Docs](https://szilanor.github.io/stream/)

## Classic JS vs Stream API solution
```typescript
// Classic
let result;
result = [1, 2, 3].filter(x => x % 2 === 0).map(x => x * 2);

// Stream API
result = stream([1, 2, 3])
    .pipe(
        filter(x => x % 2 === 0),
        map(x => x * 2)
    )
    .collect(toArray());
```

## Why Stream API?

- Can achieve faster results and lower memory usage due to sequential processing.

```typescript
const input = [1, 2, 3, .... 10000];
let allOdd: boolean;

// Classic JS
allOdd = input
    .map(x => x + 1)
    .every(x => x % 2 === 1);

// Maps every items first, then checks the results
// Result: 2, 3, 4 .... 10000 false

// Stream API
allOdd = stream(input)
  .pipe(map(x => x + 1))
  .collect(every(x => x % 2 === 1));

// Knows the answer after mapping the first item
// Result: 2, false
```

- Async support

```typescript
const result = await stream([1, 2, 3, 4])
  .pipeAsync(mapAsync(async (id) => 
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(result => result.json()))
  )
  .collectAsync(toArrayAsync());
```

- More readable and fewer lines of code

```typescript
const input = [1, 1, 1, 1, 2, 3, 4, 4, 5];
let oddOrEvenWithoutDuplicates: Map<string, number[]>;

// Classic JS
oddOrEvenWithoutDuplicates = new Map<string, number[]>();
for (let x of new Set<number>(input))
  const key = x % 2 === 0 ? 'even' : 'odd';
  if (resultClassic.has(key)) {
    resultClassic.get(key).push(x);
  } else {
    resultClassic.set(key, [x]);
  }
}

// Stream API
oddOrEvenWithoutDuplicates = stream(input)
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

