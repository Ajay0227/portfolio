import { copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import { projects } from './src/data/content.ts'

/**
 * Copies the built index.html to dist/work/<slug>/index.html, so case study URLs
 * load directly (refresh, shared links) on any static host — no rewrite rules needed.
 */
function caseStudyPages(): Plugin {
  let outDir = ''
  return {
    name: 'case-study-pages',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      for (const p of projects) {
        const dir = resolve(outDir, p.href.slice(1))
        mkdirSync(dir, { recursive: true })
        copyFileSync(resolve(outDir, 'index.html'), resolve(dir, 'index.html'))
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), caseStudyPages()],
})
