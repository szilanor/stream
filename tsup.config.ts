import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    dts: true,
    splitting: true,
    clean: true,
    format: ["esm", "cjs"],
    sourcemap: false,
    minify: true,
    treeshake: true,
});