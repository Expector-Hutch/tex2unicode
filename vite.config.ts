import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "tex2unicode",
            fileName: format => `index.${format === "es" ? "js" : "cjs"}`,
            formats: ["es", "cjs"],
        },
        rollupOptions: {
            external: ["katex"],
            output: {
                globals: {
                    katex: "katex",
                },
            },
        },
        sourcemap: true,
        minify: false,
    },
    plugins: [dts({ rollupTypes: true })],
});
