// Test setup file
import 'dotenv/config'
import { vi } from 'vitest'

// Set test environment variables (using Object.defineProperty to avoid read-only issues)
Object.defineProperty(process.env, 'NODE_ENV', { value: 'test', configurable: true })
Object.defineProperty(process.env, 'PAYLOAD_SECRET', { value: 'test-secret-key-minimum-32-characters-long', configurable: true })
Object.defineProperty(process.env, 'DATABASE_URL', { value: 'postgresql://test:test@localhost:5432/test', configurable: true })
Object.defineProperty(process.env, 'NEXT_PUBLIC_SITE_URL', { value: 'http://localhost:3000', configurable: true })
Object.defineProperty(process.env, 'FRONTEND_URL', { value: 'http://localhost:3000', configurable: true })

// Global test timeout
vi.setConfig({ testTimeout: 30000 })

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
}