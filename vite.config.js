import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the Pokédex app
export default defineConfig({
  plugins: [react()],
  base: '/base-pokedex-20262/',
});
