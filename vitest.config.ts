import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "json"],
    },
    include: ["test/**/*.{test,spec}.ts"],
    environment: "node",
    globals: true,
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
