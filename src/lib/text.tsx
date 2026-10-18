import { Fragment } from 'react'
import { parseMarks } from './marks'

/** Renders "*strong*" markup statically, preserving line breaks. */
export function Marked({ text }: { text: string }) {
  return (
    <>
      {parseMarks(text).map((m, i) =>
        m.strong ? <strong key={i}>{m.text}</strong> : <Fragment key={i}>{m.text}</Fragment>,
      )}
    </>
  )
}
