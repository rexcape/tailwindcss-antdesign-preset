import { useMemo } from 'react'
import type { Config } from 'tailwindcss'

import { formatPx } from '@/lib/utils'

const ScreensPreview = ({ preset }: { preset: Partial<Config> }) => {
  const screens = useMemo(() => {
    if (!preset.theme?.screens) {
      return []
    }
    return Object.entries(preset.theme.screens).map(([k, v]) => ({
      screenSizeName: k,
      screenSizeValue: v,
    }))
  }, [preset])

  return (
    <div className="rounded overflow-hidden border-2 border-antd-border-secondary">
      <table className="min-w-full divide-y divide-antd-border-secondary">
        <thead className="bg-gray-2">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">
              Breakpoint
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
              Minumun width
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
              Usage
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
              CSS
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-antd-border-secondary bg-white">
          {screens.map(({ screenSizeName, screenSizeValue }) => (
            <tr key={'screen-' + screenSizeName}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                {screenSizeName}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                {formatPx(screenSizeValue) + 'px'}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm font-mono">
                {screenSizeName}:block
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm font-mono">
                @media (min-width: {formatPx(screenSizeValue)}px) {'{ display: block }'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { ScreensPreview }
