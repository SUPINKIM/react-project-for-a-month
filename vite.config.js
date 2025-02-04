import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  plugins: [babel()],
});
