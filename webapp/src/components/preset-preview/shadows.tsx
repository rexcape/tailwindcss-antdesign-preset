import { useMemo } from 'react'
import type { Config } from 'tailwindcss'

const ShadowsPreview = ({ preset }: { preset: Partial<Config> }) => {
  const shadows = useMemo(() => {
    if (!preset.theme?.extend?.boxShadow) {
      return []
    }
    return Object.entries(preset.theme.extend.boxShadow).map(([k, v]) => ({
      shadowName: k,
      shadowValue: v,
    }))
  }, [preset])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-24">
      {shadows.map(({ shadowName, shadowValue }) => (
        <div
          key={'shadow-' + shadowName}
          className="p-6 flex flex-col gap-1 bg-white rounded aspect-square"
          style={{ boxShadow: shadowValue }}
        >
          <span className="text-lg">{shadowName}</span>
          <span className="text-sm text-antd-text-description">{shadowValue}</span>
        </div>
      ))}
    </div>
  )
}

export { ShadowsPreview }
