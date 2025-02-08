import { defineConfig } from 'vite';
//import babel from 'vite-plugin-babel';
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
