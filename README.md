<p align="center">
  <img src="https://img.shields.io/npm/v/@szilanor/stream?style=flat-square&color=00d26a" alt="npm version" />
  <img src="https://img.shields.io/npm/l/@szilanor/stream?style=flat-square&color=blue" alt="license" />
  <img src="https://img.shields.io/npm/dm/@szilanor/stream?style=flat-square&color=orange" alt="downloads" />
  <img src="https://img.shields.io/bundlephobia/minzip/@szilanor/stream?style=flat-square&color=blueviolet&label=bundle%20size" alt="bundle size" />
  <img src="https://img.shields.io/badge/dependencies-0-brightgreen?style=flat-square" alt="zero dependencies" />
</p>

<h1 align="center">🌊 Stream API</h1>

<p align="center">
  <strong>A blazing-fast, type-safe, and lazy data processing library for TypeScript & JavaScript.</strong>
</p>

<p align="center">
  Inspired by <a href="https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html">Java Streams</a>, <a href="https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/">C# LINQ</a>, and <a href="https://kotlinlang.org/docs/sequences.html">Kotlin Sequences</a>.
</p>

---

## ✨ Why Stream API?

| Problem                                                                           | Solution with Stream API                                                   |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| 🐢 **Slow array chains** — `.map().filter().reduce()` creates intermediate arrays | ⚡ **Lazy evaluation** — processes one element at a time, no wasted memory |
| 🔮 **Weak types** — generic `any[]` returns                                       | 🛡️ **Full type inference** — know your types at every step                 |
| 😵 **Callback hell with async** — complex Promise.all patterns                    | 🌀 **Native async iterables** — clean, readable async pipelines            |
| 📦 **Bloated bundles** — importing large utility libraries                        | 🪶 **Tree-shakeable & zero deps** — import only what you use               |

---

## 📚 Documentation

Full API documentation with examples is available at **[szilanor.github.io/stream](https://szilanor.github.io/stream/)**.

---

## Quick Start

```bash
npm install @szilanor/stream
```

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

---

## Core Concepts

Stream API follows a simple **3-step pattern**:

```
┌─────────────┐      ┌──────────────────┐      ┌───────────────┐
│   CREATE    │  →   │    TRANSFORM     │  →   │    COLLECT    │
│  stream()   │      │     .pipe()      │      │   .collect()  │
└─────────────┘      └──────────────────┘      └───────────────┘
```

1. **Create** a stream from any iterable source
2. **Transform** with chainable, lazy operations
3. **Collect** into a final result

---

## Features at a Glance

| Feature                  | Description                                                                      |
| ------------------------ | -------------------------------------------------------------------------------- |
| 🔒 **Type-Safe**         | Full TypeScript support with accurate type inference through the entire pipeline |
| ⚡ **Lazy Evaluation**   | Elements are processed one-by-one, on-demand — no intermediate arrays            |
| 🌀 **Async First-Class** | Seamlessly work with `AsyncIterable` and async operations                        |
| 📚 **60+ Operators**     | Rich standard library for transformation, filtering, aggregation, and more       |
| 🧩 **Extensible**        | Create custom operators and collectors with simple generator functions           |
| 🪶 **Zero Dependencies** | No runtime dependencies — lightweight and focused                                |
| 📦 **Tree-Shakeable**    | Only bundle the operators you actually use                                       |

---

## Examples

### Lazy Evaluation = Better Performance

```typescript
// ❌ Traditional: Creates 2 intermediate arrays, processes ALL elements
const result = hugeArray
  .map((x) => expensiveTransform(x))
  .filter((x) => x > 100)
  .slice(0, 5);

// ✅ Stream API: Stops after finding 5 matches, no intermediate arrays
const result = stream(hugeArray)
  .pipe(
    map((x) => expensiveTransform(x)),
    filter((x) => x > 100),
    take(5),
  )
  .collect(toArray());
```

### Clean Data Transformations

```typescript
import { stream, distinct, groupBy } from "@szilanor/stream";

const users = [
  { name: "Alice", role: "admin" },
  { name: "Bob", role: "user" },
  { name: "Charlie", role: "admin" },
];

const byRole = stream(users)
  .pipe(distinctBy((u) => u.name))
  .collect(groupBy((u) => u.role));

// Map { 'admin' => [...], 'user' => [...] }
```

### Async Pipelines Made Simple

```typescript
import { stream, mapAsync, filterAsync, toArrayAsync } from "@szilanor/stream";

const users = await stream([1, 2, 3, 4, 5])
  .pipeAsync(
    mapAsync(async (id) => {
      const res = await fetch(`/api/users/${id}`);
      return res.json();
    }),
    filterAsync((user) => user.isActive),
  )
  .collectAsync(toArrayAsync());
```

### Create Your Own Operators

```typescript
import { OperationFunction } from "@szilanor/stream";

// Custom operator: only emit every nth element
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
