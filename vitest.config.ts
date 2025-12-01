import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  test: {
    include: ["test/**/*.{test,spec}.ts"],
    environment: "node",
    globals: true,
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
