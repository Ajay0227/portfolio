import { useSyncExternalStore } from 'react'

let isOpen = false
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

/** Global open/close for the in-site About panel, so any button can trigger it. */
export const aboutPanel = {
  open() {
    isOpen = true
    emit()
  },
  close() {
    isOpen = false
    emit()
  },
}

export function useAboutPanelOpen() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => isOpen,
  )
}
