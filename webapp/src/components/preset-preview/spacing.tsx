import { useMemo } from 'react'
import type { Config } from 'tailwindcss'

const SpacingPreview = ({ preset }: { preset: Partial<Config> }) => {
  const paddingSpacings = useMemo(() => {
    if (!preset?.theme?.extend?.padding) {
      return []
    }
    return Object.entries(preset.theme.extend.padding).map(([k, v]) => ({
      spacingName: k,
      spacingValue: v,
    }))
  }, [preset])

  const marginSpacings = useMemo(() => {
    if (!preset?.theme?.extend?.margin) {
      return []
    }
    return Object.entries(preset.theme.extend.margin).map(([k, v]) => ({
      spacingName: k,
      spacingValue: v,
    }))
  }, [preset])

  return (
    <div className="flex flex-col gap-2">
      <div className="p-4 bg-white rounded">
        <div className="flex">
          <h5 className="flex-1">padding</h5>
          <div className="hidden md:block text-antd-text-description font-mono text-sm">
            Usage: padding-sm, padding-lg
          </div>
        </div>
        <div className="mt-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {paddingSpacings.map(({ spacingName, spacingValue }) => (
              <div
                key={'spacing-padding-' + spacingName}
                className="flex flex-col items-center gap-1"
              >
                <div className="bg-antd-fill" style={{ padding: spacingValue }}>
                  <p className="bg-white p-1">
                    Lorem ipsum odor amet, consectetuer adipiscing elit. Ut lobortis mus faucibus
                    lacinia; vestibulum blandit varius eu dictum.
                  </p>
                </div>
                <div>{spacingName}</div>
                <div className="text-sm font-mono text-antd-text-description">{spacingValue}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 bg-white rounded">
        <div className="flex">
          <h5 className="flex-1">margin</h5>
          <div className="hidden md:block text-antd-text-description font-mono text-sm">
            Usage: margin-sm, margin-lg
          </div>
        </div>
        <div className="mt-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {marginSpacings.map(({ spacingName, spacingValue }) => (
              <div
                key={'spacing-margin-' + spacingName}
                className="flex flex-col items-center gap-1"
              >
                <div className="bg-antd-fill" style={{ padding: spacingValue }}>
                  <p className="bg-white p-1">
                    Lorem ipsum odor amet, consectetuer adipiscing elit. Ut lobortis mus faucibus
                    lacinia; vestibulum blandit varius eu dictum.
                  </p>
                </div>
                <div>{spacingName}</div>
                <div className="text-sm font-mono text-antd-text-description">{spacingValue}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { SpacingPreview }
