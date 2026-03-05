import { vi } from 'vitest'
import { ref } from 'vue'

// Mock useColorMode to prevent "TypeError: Cannot read properties of undefined (reading 'preference')"
vi.mock('@nuxtjs/color-mode', () => ({
    useColorMode: () => ({
        value: ref('dark'),
        preference: ref('dark'),
    })
}))

// Intercept and suppress specific console warnings
const originalWarn = console.warn
const originalLog = console.log
const originalInfo = console.info

const isSuspenseWarning = (args: unknown[]) => {
    const message = args[0]
    return typeof message === 'string' && message.includes('<Suspense> is an experimental feature')
}

console.warn = (...args: unknown[]) => {
    if (isSuspenseWarning(args)) return
    originalWarn(...args)
}

console.log = (...args: unknown[]) => {
    if (isSuspenseWarning(args)) return
    originalLog(...args)
}

console.info = (...args: unknown[]) => {
    if (isSuspenseWarning(args)) return
    originalInfo(...args)
}

// Suppress Node.js process warnings (like the --localstorage-file warning)
const originalEmit = process.emit
// @ts-ignore
process.emit = function (name: string, data: unknown, ...args: unknown[]) {
    if (name === 'warning' && data && typeof data.message === 'string') {
        if (data.message.includes('--localstorage-file')) {
            return false
        }
    }
    return originalEmit.apply(process, [name, data, ...args])
}
