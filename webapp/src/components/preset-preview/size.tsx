import { useMemo } from 'react'
import type { Config } from 'tailwindcss'

const SizePreview = ({ preset }: { preset: Partial<Config> }) => {
  const sizes = useMemo(() => {
    if (!preset?.theme?.extend?.size) {
      return []
    }
    return Object.entries(preset.theme.extend.size as Record<string, string>).map(([k, v]) => ({
      sizingName: k,
      sizingValue: v,
    }))
  }, [preset])

  return (
    <div className="p-4 bg-white rounded">
      <div className="flex">
        <h5 className="flex-1">size</h5>
        <div className="hidden md:block text-antd-text-description font-mono text-sm">
          Usage: size-sm, size-unit
        </div>
      </div>
      <div className="mt-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {sizes.map(({ sizingName, sizingValue }) => (
            <div key={'size-' + sizingName} className="flex flex-col items-center gap-1">
              <div className="bg-antd-fill" style={{ width: sizingValue, height: sizingValue }} />
              <div>{sizingName}</div>
              <div className="text-sm font-mono text-antd-text-description">{sizingValue}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { SizePreview }
