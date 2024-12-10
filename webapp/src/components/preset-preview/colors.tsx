import { useMemo } from 'react'
import type { Config } from 'tailwindcss'

const ColorsPreview = ({ preset }: { preset: Partial<Config> }) => {
  const colors = useMemo(() => {
    if (!preset.theme?.colors) {
      return []
    }
    return Object.entries(preset.theme.colors).map(([k, v]) => ({
      colorName: k,
      colorValues: Object.entries(v)
        .filter(([k2]) => k2 !== 'DEFAULT')
        .map(([_k2, v2]) => v2 as string),
    }))
  }, [preset])

  return (
    <div className="grid grid-cols-1 gap-2">
      {colors.map(({ colorName, colorValues }) => (
        <div key={colorName} className="p-4 bg-white rounded">
          <div className="flex">
            <h4 className="text-h4 flex-1">{colorName} (default: 6)</h4>
            <div className="hidden md:block text-antd-text-description font-mono text-sm">
              Usage: bg-{colorName}-1, text-{colorName}-8
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-1 mt-2">
            {colorValues.map((item, idx) => (
              <div key={item + idx} className="flex flex-col items-center">
                <div className="size-8 rounded" style={{ backgroundColor: item }} />
                <div className="">{idx + 1}</div>
                <div className="text-sm text-antd-text-description font-mono">{item}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export { ColorsPreview }
