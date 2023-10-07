import { resolve } from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
// import { VitePWA } from 'vite-plugin-pwa';

const configs = {
  sw: {
    build: {
      outDir: './dist',
      lib: {
        entry: resolve('./src/firebase-messaging-sw.js'),
        fileName: 'firebase-messaging-sw',
        formats: ['es'],
      },
      emptyOutDir: false,
    },
    main: {},
  },
};

const config = configs[process.env.VITE_CONFIG || ''];

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react({})],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
  ...config,
});
