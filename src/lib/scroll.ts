import { interpolate, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'

/**
 * Scroll-linked range mapping, like `useTransform(value, input, output)`.
 *
 * Uses the function form on purpose: motion hardware-accelerates range-form
 * transforms of `useScroll` values with a native ScrollTimeline, and that path
 * ignores `useScroll`'s `offset`, so opacity/filters ended up on the wrong range.
 * The function form always runs the latest closure, so changing ranges just work.
 */
type Widen<T> = T extends number ? number : string

export function useRange<T extends number | string>(source: MotionValue<number>, input: number[], output: T[]) {
  const map = interpolate<T>(input, output, { clamp: true })
  return useTransform(source, (v: number) => map(v) as Widen<T>)
}
