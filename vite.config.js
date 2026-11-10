import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
    plugins: [vue()],
    preview: {
        allowedHosts: ['dindin-mvp.onrender.com']
    }
})