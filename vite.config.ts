import { defineConfig } from 'vitest/config';

// GitHub project pages need base `/wand-m2/`
// Local/root host: BASE=/ npm run build
const base = process.env.BASE ?? '/wand-m2/';

export default defineConfig({
  base,
  test: {
    globals: true,
    environment: 'node',
  },
  build: {
    target: 'es2020',
  },
});
