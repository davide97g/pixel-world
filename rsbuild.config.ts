import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  html: {
    title: 'Pixel World',
  },
  server: {
    port: 8080,
  },
  plugins: [pluginReact()],
});
