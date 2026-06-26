import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => ({
  test: {
    environment: 'node',
    globals: true,
    testTimeout: 15000,
    env: loadEnv(mode, process.cwd(), ''),
  },
}))
