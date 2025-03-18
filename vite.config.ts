import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	build: {
		sourcemap: true,
		outDir: 'dist',
		target: 'esnext',
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	preview: {
		port: 3000,
		strictPort: true,
		host: '0.0.0.0',
		allowedHosts: true,
	},
	server: {
		allowedHosts: true,
	},
})
