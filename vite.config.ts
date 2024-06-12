import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

const vitePWA = VitePWA({
  registerType: 'autoUpdate',
  outDir: 'dist',
  manifest: {
    name: 'vite-pwa',
    short_name: 'vitePWA',
    description: 'vitejs example build',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'assets/images/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'assets/images/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
});
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePWA],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  base: 'async-race',
});
