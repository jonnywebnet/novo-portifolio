import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // PDFs não precisam de hot reload e podem estar bloqueados por outro aplicativo.
      ignored: ['**/*.pdf'],
    },
  },
});
