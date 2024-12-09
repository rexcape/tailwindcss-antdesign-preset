import { useMemo } from 'react'
import type { Config } from 'tailwindcss'

import { formatPx } from '@/lib/utils'

const BorderRadiusPreview = ({ preset }: { preset: Partial<Config> }) => {
  const radius = useMemo(() => {
    if (!preset.theme?.borderRadius) {
      return []
    }
    return Object.entries(preset.theme.borderRadius).map(([k, v]) => ({
      radiusName: k,
      radiusValue: v,
    }))
  }, [preset])

  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="p-4 bg-white rounded">
        <div className="flex">
          <h5 className="flex-1"></h5>
          <div className="hidden md:block text-antd-text-description font-mono text-sm">
            Usage: radius-sm
          </div>
        </div>
        <div className="mt-2 grid grid-cols-5 place-items-center">
          {radius.map(({ radiusName, radiusValue }) => (
            <div key={'radius-' + radiusName} className="flex flex-col items-center">
              <div className="size-12 bg-primary-6" style={{ borderRadius: radiusValue }} />
              <div>
                {radiusName} ({formatPx(radiusValue) + 'px'})
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { BorderRadiusPreview }
