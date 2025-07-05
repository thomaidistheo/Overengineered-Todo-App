import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Overengineered-Todo-App/",
  plugins: [
    react(),
    {
      name: 'copy-index-to-404',
      closeBundle: () => {
        copyFileSync('dist/index.html', 'dist/404.html');
      }
    }
  ]
})