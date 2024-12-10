import { useMemo, useState } from 'react'
import type { Config } from 'tailwindcss'

import { formatPx } from '@/lib/utils'

const FontSizePreview = ({ preset }: { preset: Partial<Config> }) => {
  const fontSizes = useMemo(() => {
    if (!preset.theme?.fontSize) {
      return []
    }
    return Object.entries(preset.theme.fontSize).map(([k, v]) => ({
      fontSizeName: k,
      fontSizeValue: v,
    }))
  }, [preset])

  const [text] = useState('The quick brown fox jumps over the lazy dog')

  return (
    <div className="grid grid-cols-1 gap-2">
      {fontSizes.map(({ fontSizeName, fontSizeValue }) => (
        <div key={'font-' + fontSizeName} className="p-4 bg-white rounded">
          <div className="flex border-b border-antd-border">
            <h4 className="text-h4 flex-1">
              {fontSizeName} ({formatPx(fontSizeValue)}px)
            </h4>
            <div className="hidden md:block text-antd-text-description font-mono text-sm">
              Usage: text-{fontSizeName}
            </div>
          </div>
          <p className="mt-2" style={{ fontSize: fontSizeValue }}>
            {text}
          </p>
        </div>
      ))}
    </div>
  )
}

export { FontSizePreview }
