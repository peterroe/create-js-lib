import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { terser } from 'rollup-plugin-terser'
export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: './lib/index.js',
            formats: ['es', 'umd'],
            name: 'pkg'
        },
        rollupOptions: {
            plugins: [
                tenser()
            ]
        }
    }
})