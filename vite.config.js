
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: [
        'defaults',
        'Chrome >= 64',
        'Safari >= 12',
        'iOS >= 12',
        'Android >= 6'
      ],
      modernPolyfills: true,
      renderLegacyChunks: true
    })
  ]
});
