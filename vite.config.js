import { defineConfig } from 'vite';
import viteJsconfigPaths from 'vite-jsconfig-paths';

export default defineConfig({
  plugins: [viteJsconfigPaths()],
  esbuild: {
    jsx: 'transform',
    jsxInject: 'import { h, Fragment } from "@/jsx/jsx-runtime"',
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
});
