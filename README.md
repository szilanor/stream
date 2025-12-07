<p align="center">
  <img src="https://img.shields.io/npm/v/@szilanor/stream?style=flat-square&color=00d26a" alt="npm version" />
  <img src="https://img.shields.io/npm/l/@szilanor/stream?style=flat-square&color=blue" alt="license" />
  <img src="https://img.shields.io/bundlephobia/minzip/@szilanor/stream?style=flat-square&color=blueviolet&label=min%20zip" alt="bundle size" />
</p>

# Stream API

Type-safe, lazy data processing for TypeScript and JavaScript.
Inspired by [Java Streams](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html), [C# LINQ](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/), and [Kotlin Sequences](https://kotlinlang.org/docs/sequences.html).

[**Read the Documentation**](https://szilanor.github.io/stream/)

## Installation

```bash
npm install @szilanor/stream
```

## Quick Start

Stream API creates a pipeline where data flows through operations. It is **lazy**, meaning items are processed one by one, and only if needed.

```typescript
import { stream, filter, map, toArray } from "@szilanor/stream";

const result = stream([1, 2, 3, 4, 5])
  .pipe(
    filter((x) => x % 2 === 0),
    map((x) => x * 10),
  )
  .collect(toArray());

console.log(result); // [20, 40]
```

## Why use this?

- **Lazy Evaluation**: Avoids creating intermediate arrays. Great for large datasets or performance-critical paths.
- **Type Safety**: Infers types correctly through complex pipelines.
- **Async Support**: Native support for `AsyncIterable` and async transformations.
- **Lightweight**: Zero dependencies and tree-shakeable.

## How it Works

Under the hood, Stream API uses [JavaScript Itarator and Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators).

When you call `.pipe()`, you aren't iterating the data yet. You are composing a chain of generator functions. Iteration only begins when you call `.collect()` (or iterate the stream manually). This is what allows for efficiency gains:

1. **Short-circuiting**: Operations like `find` or `take` stop the generator chain early.
2. **Low Memory**: Only one item is held in memory at a time (unless buffering is explicitly required, like in `sort`).

## Examples

### Laziness (Performance)

Standard array methods like `.map().filter()` create a new array for every step. Stream API does not.

```typescript
import { stream, map, filter, take, toArray } from "@szilanor/stream";

// Standard JS: Iterates the entire array multiple times
const bad = hugeArray
  .map(transform) // Allocates new array size of hugeArray
  .filter(predicate) // Allocates another new array
  .slice(0, 5);

// Stream API: Iterates once, stops early
const good = stream(hugeArray)
  .pipe(
    map(transform),
    filter(predicate),
    take(5), // Stops processing after finding 5 items
  )
  .collect(toArray());
```

### Async Pipelines

Handling async data streams seamlessly.

```typescript
import { stream, mapAsync, filterAsync, toArrayAsync } from "@szilanor/stream";

const activeUsers = await stream(userIds)
  .pipeAsync(
    mapAsync(async (id) => {
      const user = await fetchUser(id);
      return user;
    }),
    filterAsync((user) => user.isActive),
  )
  .collectAsync(toArrayAsync());
```

### Custom Operators

Extending the library is as simple as writing a generator function.

```typescript
import { OperationFunction, stream, toArray } from "@szilanor/stream";

// Emit every Nth item
const everyNth = <T>(n: number): OperationFunction<T, T> => {
  return function* (iterable) {
    let i = 0;
    for (const item of iterable) {
      if (i++ % n === 0) yield item;
    }
  };
};

stream([1, 2, 3, 4, 5, 6]).pipe(everyNth(2)).collect(toArray()); // [1, 3, 5]
```

## Comparison

|               | Stream API                        | RxJS                     | Native Array Methods |
| ------------- | --------------------------------- | ------------------------ | -------------------- |
| **Paradigm**  | Pull-based (Iterators)            | Push-based (Observables) | Eager                |
| **Data Type** | Data in motion / Collections      | Events / Time streams    | Static Arrays        |
| **Async**     | `AsyncIterable` (await/for-await) | Observables (subscribe)  | `Promise.all` needed |

### Understanding "Data Types"

The main difference lies in **who controls the flow**:

- **Stream API (Pull)**: _You_ are in control. You ask for the next item when you are ready. This is ideal for "Data in motion" (reading files, database cursors, large algorithms) where you want to process data at your own pace without being overwhelmed.
- **RxJS (Push)**: _The source_ is in control. Data arrives whenever it wants (mouse clicks, WebSocket messages, timers). You must react to it immediately.
- **Native Arrays**: Data is static. It sits in memory, allowing random access (index `[0]`), but requiring all data to be loaded before processing begins.
