import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`

interface SplitTextLine {
  words: string
  id: string
}

export function formatSplitText(text: string): SplitTextLine[] {
  return text.split('\n').map((line, lineIndex) => ({
    words: line,
    id: `${lineIndex}-${line.replace(/\s+/g, '-').toLowerCase()}`
  }))
}

export const isReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function withGSAP<T extends (...args: any[]) => void>(animation: T) {
  return (...args: Parameters<T>) => {
    if (isReducedMotion()) return
    animation(...args)
  }
}
