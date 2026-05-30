/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
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
    sidebarThemePlugin(), // 👈 اینو اضافه کن
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routeFileIgnorePattern: '_components',
    }),
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
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
