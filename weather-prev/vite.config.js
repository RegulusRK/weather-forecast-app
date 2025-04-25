import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/weather-forecast-app/', // <- nome exato do repositório!
  plugins: [react()],
})
