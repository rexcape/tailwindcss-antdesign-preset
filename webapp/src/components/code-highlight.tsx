import { highlighterAtom } from '@/store'
import { useAtomValue } from 'jotai'
import { useEffect, useRef } from 'react'

interface CodeHighlightProps {
  code: string
  lang: 'javascript' | 'json'
}

const CodeHighlight = ({ code, lang }: CodeHighlightProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const highlighter = useAtomValue(highlighterAtom)

  useEffect(() => {
    if (!wrapperRef.current || !highlighter) {
      return
    }
    wrapperRef.current.innerHTML = highlighter.codeToHtml(code, {
      lang,
      theme: 'github-light',
    })
  }, [code])
  return <div ref={wrapperRef} />
}

CodeHighlight.displayName = 'CodeHighlight'

export { CodeHighlight }
