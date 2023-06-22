import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import react from '@vitejs/plugin-react'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${pkg.name}/`,
  plugins: [
    UnoCSS(),
    react()
  ]
})
