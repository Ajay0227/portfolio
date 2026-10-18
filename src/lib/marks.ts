export type Mark = { text: string; strong: boolean }

/** Splits "plain *strong* plain" into segments. */
export function parseMarks(input: string): Mark[] {
  return input
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith('*') && part.endsWith('*')
        ? { text: part.slice(1, -1), strong: true }
        : { text: part, strong: false },
    )
}

export type Token = { parts: Mark[] } | { br: true }

/**
 * Splits marked text into whitespace-separated tokens. A token can mix plain and
 * strong parts (e.g. "*human*." stays one token), and "\n" becomes a break.
 */
export function markTokens(input: string): Token[] {
  const tokens: Token[] = []
  let current: Mark[] = []
  const flush = () => {
    if (current.length) tokens.push({ parts: current })
    current = []
  }
  for (const m of parseMarks(input)) {
    for (const piece of m.text.split(/(\s+)/)) {
      if (!piece) continue
      if (/^\s+$/.test(piece)) {
        flush()
        if (piece.includes('\n')) tokens.push({ br: true })
      } else {
        current.push({ text: piece, strong: m.strong })
      }
    }
  }
  flush()
  return tokens
}
