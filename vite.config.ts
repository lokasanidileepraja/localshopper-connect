
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    sourcemap: true,
    minify: 'terser',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react', 
            'react-dom', 
            'react-router-dom',
            '@tanstack/react-query',
            'framer-motion',
            'lucide-react'
          ],
          ui: [
            '@/components/ui',
            '@/lib/utils',
          ],
          charts: ['recharts'],
          // Add more manual chunks as needed
        },
        // Optimize chunk file names for better cache
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name;
          if (name === 'vendor') {
            return 'assets/js/vendor.[hash].js';
          }
          return 'assets/js/[name].[hash].js';
        },
        // Clean asset directories
        // Customize asset paths
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') ?? [];
          const extType = info[info.length - 1];
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name ?? '')) {
            return 'assets/media/[name].[hash].[ext]';
          } 
          else if (/\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/i.test(assetInfo.name ?? '')) {
            return 'assets/img/[name].[hash].[ext]';
          }
          else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name ?? '')) {
            return 'assets/fonts/[name].[hash].[ext]';
          }
          return `assets/${extType}/[name].[hash].[ext]`;
        }
      }
    },
    // Enable BrOTLI compression
    brotliSize: true
  },
  // Optimize dev server
  server: {
    hmr: true,
    port: 8080,
    open: true,
    cors: true,
    host: true,
  },
  // Optimize preview server
  preview: {
    port: 8080,
    open: true,
  },
  // Optimize performance in development
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      '@tanstack/react-query',
      'lucide-react'
    ]
  }
})
