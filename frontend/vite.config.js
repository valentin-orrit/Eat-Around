import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // eslint-disable-next-line no-undef
            '@': path.resolve(__dirname, './src'),
        },
    },
    css: {
        preprocessorOptions: {
            css: {
                additionalData: '@import "tailwindcss/tailwind.css";',
            },
        },
    },
    server: {
        watch: {
            usePolling: true,
        },
        host: '0.0.0.0',
        strictPort: true,
        port: 5173,
    },
})
