import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    cacheDir: '/tmp/vitest',
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: 'tests/setup.js',
    },
})
