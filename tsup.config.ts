import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    dts: true,
    splitting: true,
    clean: true,
    format: ["esm", "cjs"],
    sourcemap: true,
    minify: true,
    treeshake: true,
});