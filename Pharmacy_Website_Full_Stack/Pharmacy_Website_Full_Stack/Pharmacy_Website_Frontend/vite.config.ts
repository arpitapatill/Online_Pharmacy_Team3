import react from '@vitejs/plugin-react'
import { defineConfig, UserConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let build: UserConfig['build']
  let define: UserConfig['define']

  if (mode === 'development') {
    build = { minify: false }
    define = {
      'process.env.NODE_ENV': '"development"',
      __DEV__: 'true',
    }
  }

  return {
    plugins: [react()],
    build,
    define,
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
          ws: true,
          // Don't rewrite the path as the backend expects /api prefix
          // rewrite: (path) => path.replace(/^/api/, ''),
        },
      },
      cors: true
    },
  }
})

