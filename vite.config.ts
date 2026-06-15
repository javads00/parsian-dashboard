/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'

const THEME = {
  sidebar: '#0f172a',
  sidebarForeground: '#e2e8f0',
  sidebarAccent: '#1e293b',
  sidebarAccentForeground: '#ffffff',
  sidebarBorder: '#334155',
  sidebarRing: '#3b82f6',
  sidebarActiveItem: '#3b82f6',
}

function sidebarThemePlugin(): Plugin {
  return {
    name: 'sidebar-theme',
    transformIndexHtml(html) {
      const css = `
<style>
:root {
  --sidebar: ${THEME.sidebar};
  --sidebar-foreground: ${THEME.sidebarForeground};
  --sidebar-accent: ${THEME.sidebarAccent};
  --sidebar-accent-foreground: ${THEME.sidebarAccentForeground};
  --sidebar-border: ${THEME.sidebarBorder};
  --sidebar-ring: ${THEME.sidebarRing};
  --sidebar-active-item: ${THEME.sidebarActiveItem};
}
</style>
`
      return html.replace('</head>', css + '</head>')
    },
  }
}

export default defineConfig({
  plugins: [
    sidebarThemePlugin(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],

  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    outDir: 'build',
    target: 'es2020',
    cssMinify: true,
    rollupOptions: {
      output: {
        experimentalMinChunkSize: 10_000,
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (id.includes('@tanstack/react-router-devtools')) return 'vendor-devtools'
          if (id.includes('@tanstack')) return 'vendor-tanstack'

          // Match only react core — avoid catching @tanstack/react-*, lucide-react, etc.
          if (
            /[/\\]node_modules[/\\]react[/\\]/.test(id) ||
            /[/\\]node_modules[/\\]react-dom[/\\]/.test(id) ||
            /[/\\]node_modules[/\\]scheduler[/\\]/.test(id)
          ) {
            return 'vendor-react'
          }

          if (id.includes('@radix-ui') || /[/\\]node_modules[/\\]radix-ui[/\\]/.test(id)) {
            return 'vendor-radix'
          }
          if (id.includes('lucide-react')) return 'vendor-icons'
          if (id.includes('date-fns') || id.includes('react-day-picker')) return 'vendor-dates'
          if (id.includes('zod')) return 'vendor-zod'
          if (id.includes('react-hook-form') || id.includes('@hookform')) return 'vendor-forms'

          return 'vendor-misc'
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
