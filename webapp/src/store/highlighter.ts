import { createHighlighter } from 'shiki'
import { atom } from 'jotai'

const highlighter = atom(
  await createHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: ['javascript', 'json'],
  })
)

const highlighterAtom = atom((get) => get(highlighter))

export { highlighterAtom }
