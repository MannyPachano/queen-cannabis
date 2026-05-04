import { defineConfig } from 'astro/config';

// Static output works with Netlify drag-and-drop or Git-backed builds (publish: dist).
export default defineConfig({
  output: 'static',
});
