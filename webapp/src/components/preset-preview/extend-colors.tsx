import { useEffect, useMemo, useRef, useState } from 'react'
import { IconBrandGithub, IconCircle1 } from '@tabler/icons-react'
import type { Config } from 'tailwindcss'

import { cn } from '@/lib/utils'

const ExtendColorsPreview = ({ preset }: { preset: Partial<Config> }) => {
  const [prefix] = useState('antd')

  const colors = useMemo(() => {
    if (!preset?.theme?.extend?.colors) {
      return {} as Record<string, string>
    }
    return preset.theme.extend.colors as Record<string, string>
  }, [preset])

  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="p-4 bg-white rounded">
        <div className="flex">
          <h4 className="text-h4 flex-1">primary</h4>
          <div className="hidden md:block text-antd-text-description font-mono text-sm">
            Usage: text-{prefix}-primary-text, bg-{prefix}-primary-bg
          </div>
        </div>
        <div className="mt-1">
          <StatusColorPreviewGrid colors={colors} color="primary" prefix={prefix} />
        </div>
      </div>
      <div className="p-4 bg-white rounded">
        <div className="flex">
          <h4 className="text-h4 flex-1">info</h4>
          <div className="hidden md:block text-antd-text-description font-mono text-sm">
            Usage: text-{prefix}-info-text, bg-{prefix}-info-bg
          </div>
        </div>
        <div className="mt-1">
          <StatusColorPreviewGrid colors={colors} color="info" prefix={prefix} />
        </div>
      </div>
      <div className="p-4 bg-white rounded">
        <div className="flex">
          <h4 className="text-h4 flex-1">success</h4>
          <div className="hidden md:block text-antd-text-description font-mono text-sm">
            Usage: text-{prefix}-success-text, bg-{prefix}-success-bg
          </div>
        </div>
        <div className="mt-1">
          <StatusColorPreviewGrid colors={colors} color="success" prefix={prefix} />
        </div>
      </div>
      <div className="p-4 bg-white rounded">
        <div className="flex">
          <h4 className="text-h4 flex-1">warning</h4>
          <div className="hidden md:block text-antd-text-description font-mono text-sm">
            Usage: text-{prefix}-warning-text, bg-{prefix}-warning-bg
          </div>
        </div>
        <div className="mt-1">
          <StatusColorPreviewGrid colors={colors} color="warning" prefix={prefix} />
        </div>
      </div>
      <div className="p-4 bg-white rounded">
        <div className="flex">
          <h4 className="text-h4 flex-1">error</h4>
          <div className="hidden md:block text-antd-text-description font-mono text-sm">
            Usage: text-{prefix}-error-text, bg-{prefix}-error-bg
          </div>
        </div>
        <div className="mt-1">
          <StatusColorPreviewGrid colors={colors} color="error" prefix={prefix} />
        </div>
      </div>
      <div className="p-4 bg-white rounded">
        <div className="flex">
          <h4 className="text-h4 flex-1">link</h4>
          <div className="hidden md:block text-antd-text-description font-mono text-sm">
            Usage: text-{prefix}-link, hover:text-{prefix}-link-hover
          </div>
        </div>
        <div className="mt-1">
          <LinkColorsPreviewGrid colors={colors} prefix={prefix} />
        </div>
      </div>
      <div className="p-4 bg-white rounded">
        <div className="flex">
          <h4 className="text-h4 flex-1">text</h4>
          <div className="hidden md:block text-antd-text-description font-mono text-sm">
            Usage: text-{prefix}-text-base, text-{prefix}-text-secondary
          </div>
        </div>
        <div className="mt-1">
          <TextColorsPreviewTable colors={colors} prefix={prefix} />
        </div>
      </div>
      <div className="p-4 bg-white rounded">
        <div className="flex">
          <h4 className="text-h4 flex-1">fill</h4>
          <div className="hidden md:block text-antd-text-description font-mono text-sm">
            Usage: bg-{prefix}-fill, bg-{prefix}-fill-secondary
          </div>
        </div>
        <div className="mt-1">
          <FillColorsPreviewGrid colors={colors} prefix={prefix} />
        </div>
      </div>
      <div className="p-4 bg-white rounded">
        <div className="flex">
          <h4 className="text-h4 flex-1">background</h4>
          <div className="hidden md:block text-antd-text-description font-mono text-sm">
            Usage: bg-{prefix}-bg-base, bg-{prefix}-bg-fill
          </div>
        </div>
        <div className="mt-1">
          <BackgroundColorsPreviewGrid colors={colors} prefix={prefix} />
        </div>
      </div>
      <div className="p-4 bg-white rounded">
        <div className="flex">
          <h4 className="text-h4 flex-1">other colors</h4>
          <div className="hidden md:block text-antd-text-description font-mono text-sm">
            Usage: border-{prefix}-border, bg-{prefix}-split
          </div>
        </div>
        <div className="mt-1">
          <OtherColorsPreviewGrid colors={colors} prefix={prefix} />
        </div>
      </div>
    </div>
  )
}

const StatusColorPreviewGrid = ({
  colors,
  color,
  prefix,
}: {
  colors: Record<string, string>
  color: string
  prefix: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const isWarning = useMemo(() => color === 'warning', [color])
  const isError = useMemo(() => color === 'error', [color])

  const keys = useMemo(
    () => ({
      default: `${prefix}-${color}`,
      hover: `${prefix}-${color}-hover`,
      active: `${prefix}-${color}-active`,
      bg: `${prefix}-${color}-bg`,
      bgHover: `${prefix}-${color}-bg-hover`,
      border: `${prefix}-${color}-border`,
      borderHover: `${prefix}-${color}-border-hover`,
      text: `${prefix}-${color}-text`,
      textHover: `${prefix}-${color}-text-hover`,
      textActive: `${prefix}-${color}-text-active`,
      /** warning/error only */
      outline: `${prefix}-${color}-outline`,
      /** error-only */
      bgFilledHover: `${prefix}-${color}-bg-filled-hover`,
      /** error-only */
      bgActive: `${prefix}-${color}-bg-active`,
    }),
    [prefix, color]
  )

  useEffect(() => {
    if (containerRef.current) {
      const el = containerRef.current
      Object.entries(keys).forEach(([k, v]) => {
        el.style.setProperty(`--demo-button-${k}`, colors[v])
      })
    }
  }, [colors, keys])

  return (
    <div ref={containerRef} className="flex flex-row">
      <div className="hidden lg:flex lg:flex-col px-8 gap-4 items-center justify-center flex-none">
        <button className={cn('demo-button', 'px-4 py-2')}>Button</button>
        <button className={cn('demo-button-plain', 'px-4 py-2')}>Button</button>
      </div>

<div className="flex-1 flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3">
      <div className="flex flex-col items-center justify-center">
        <div
          className="size-4 rounded-full ring-1 ring-offset-2 ring-antd-border"
          style={{ backgroundColor: colors[keys.default] }}
        />
        <div className="mt-1">{color}</div>
        <div className="text-sm text-antd-text-description font-mono">{colors[keys.default]}</div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div
          className="size-4 rounded-full ring-1 ring-offset-2 ring-antd-border"
          style={{ backgroundColor: colors[keys.hover] }}
        />
        <div className="mt-1">{color}-hover</div>
        <div className="text-sm text-antd-text-description font-mono">{colors[keys.hover]}</div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div
          className="size-4 rounded-full ring-1 ring-offset-2 ring-antd-border"
          style={{ backgroundColor: colors[keys.active] }}
        />
        <div className="mt-1">{color}-active</div>
        <div className="text-sm text-antd-text-description font-mono">{colors[keys.active]}</div>
      </div>
      </div>

      <div
        className={cn(
          'w-full grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4',
          isWarning && 'lg:grid-cols-5',
          isError && 'lg:grid-cols-4'
        )}
      >
        <div className="flex flex-col items-center justify-center">
          <div
            className="w-12 h-8 border-2 rounded border-transparent"
            style={{ backgroundColor: colors[keys.bg] }}
          />
          <div className="mt-1">{color}-bg</div>
          <div className="text-sm text-antd-text-description font-mono">{colors[keys.bg]}</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div
            className="w-12 h-8 border-2 rounded border-transparent"
            style={{ backgroundColor: colors[keys.bgHover] }}
          />
          <div className="mt-1">{color}-bg-hover</div>
          <div className="text-sm text-antd-text-description font-mono">{colors[keys.bgHover]}</div>
        </div>
        {isError && (
          <div className="flex flex-col items-center justify-center">
            <div
              className="w-12 h-8 border-2 rounded border-transparent"
              style={{ backgroundColor: colors[keys.bgFilledHover] }}
            />
            <div className="mt-1">{color}-bg-filled-hover</div>
            <div className="text-sm text-antd-text-description font-mono">
              {colors[keys.bgFilledHover]}
            </div>
          </div>
        )}
        {isError && (
          <div className="flex flex-col items-center justify-center">
            <div
              className="w-12 h-8 border-2 rounded border-transparent"
              style={{ backgroundColor: colors[keys.bgActive] }}
            />
            <div className="mt-1">{color}-bg-active</div>
            <div className="text-sm text-antd-text-description font-mono">
              {colors[keys.bgActive]}
            </div>
          </div>
        )}
        <div className="flex flex-col items-center justify-center">
          <div
            className="w-12 h-8 border-2 rounded border-transparent"
            style={{ borderColor: colors[keys.border] }}
          />
          <div className="mt-1">{color}-border</div>
          <div className="text-sm text-antd-text-description font-mono">{colors[keys.border]}</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div
            className="w-12 h-8 border-2 rounded border-transparent"
            style={{ borderColor: colors[keys.borderHover] }}
          />
          <div className="mt-1">{color}-border-hover</div>
          <div className="text-sm text-antd-text-description font-mono">
            {colors[keys.borderHover]}
          </div>
        </div>
        {(isWarning || isError) && (
          <div className="flex flex-col items-center justify-center">
            <div
              className="w-12 h-8 border-2 rounded border-transparent outline outline-4 outline-offset-1"
              style={{ outlineColor: colors[keys.outline] }}
            />
            <div className="mt-1">{color}-outline</div>
            <div className="text-sm text-antd-text-description font-mono">
              {colors[keys.outline]}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
      <div className="flex flex-col items-center justify-center">
        <div
          className="text-lg text-transparent flex items-center justify-center"
          style={{ color: colors[keys.text] }}
        >
          Text
        </div>
        <div className="mt-1">{color}-text</div>
        <div className="text-sm text-antd-text-description font-mono">{colors[keys.text]}</div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div
          className="text-lg text-transparent flex items-center justify-center"
          style={{ color: colors[keys.textHover] }}
        >
          Text
        </div>
        <div className="mt-1">{color}-text-hover</div>
        <div className="text-sm text-antd-text-description font-mono">{colors[keys.textHover]}</div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div
          className="text-lg text-transparent flex items-center justify-center"
          style={{ color: colors[keys.textActive] }}
        >
          Text
        </div>
        <div className="mt-1">{color}-text-active</div>
        <div className="text-sm text-antd-text-description font-mono">
          {colors[keys.textActive]}
        </div>
      </div>
      </div>
      </div>
    </div>
  )
}

const LinkColorsPreviewGrid = ({
  colors,
  prefix,
}: {
  colors: Record<string, string>
  prefix: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const keys = useMemo(
    () => ({
      default: `${prefix}-link`,
      hover: `${prefix}-link-hover`,
      active: `${prefix}-link-active`,
    }),
    [prefix]
  )

  useEffect(() => {
    if (containerRef.current) {
      const el = containerRef.current
      Object.entries(keys).forEach(([k, v]) => {
        el.style.setProperty(`--demo-link-${k}`, colors[v])
      })
    }
  }, [colors, keys])

  return (
    <div ref={containerRef} className="grid grid-cols-3 md:grid-cols-4 gap-4 place-items-center">
      <div className="hidden md:flex flex-col items-center justify-center">
        <a className={cn('demo-link', 'px-4 py-2')} href="#">
          Preview Link
        </a>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div
          className="size-4 rounded-full ring-1 ring-offset-2 ring-antd-border"
          style={{ backgroundColor: colors[keys.default] }}
        />
        <div className="mt-1">link</div>
        <div className="text-sm text-antd-text-description font-mono">{colors[keys.default]}</div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div
          className="size-4 rounded-full ring-1 ring-offset-2 ring-antd-border"
          style={{ backgroundColor: colors[keys.hover] }}
        />
        <div className="mt-1">link-hover</div>
        <div className="text-sm text-antd-text-description font-mono">{colors[keys.hover]}</div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div
          className="size-4 rounded-full ring-1 ring-offset-2 ring-antd-border"
          style={{ backgroundColor: colors[keys.active] }}
        />
        <div className="mt-1">link-active</div>
        <div className="text-sm text-antd-text-description font-mono">{colors[keys.active]}</div>
      </div>
    </div>
  )
}

const TextColorsPreviewTable = ({
  colors,
  prefix,
}: {
  colors: Record<string, string>
  prefix: string
}) => {
  const [text] = useState('The quick brown fox jumps over the lazy dog')

  const keys = useMemo(
    () => ({
      text: `${prefix}-text`,
      textBase: `${prefix}-text-base`,
      textSecondary: `${prefix}-text-secondary`,
      textTertiary: `${prefix}-text-tertiary`,
      textQuaternary: `${prefix}-text-quaternary`,
      textPlaceholder: `${prefix}-text-placeholder`,
      textDisabled: `${prefix}-text-disabled`,
      textHeading: `${prefix}-text-heading`,
      textLabel: `${prefix}-text-label`,
      textDescription: `${prefix}-text-description`,
      textLightSolid: `${prefix}-text-light-solid`,
      icon: `${prefix}-icon`,
      iconHover: `${prefix}-icon-hover`,
    }),
    [prefix]
  )

  const rows = useMemo(
    () =>
      Object.entries(keys).map(([_k, v]) => ({
        textColorName: v.replace(prefix + '-', ''),
        textColorValue: colors[v],
      })),
    [keys, colors]
  )

  return (
    <div className="rounded overflow-hidden border-2 border-antd-border-secondary">
      <table className="min-w-full divide-y divide-antd-border-secondary">
        <thead className="bg-gray-2">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">
              Name
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
              Value
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
              Preview
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-antd-border-secondary bg-white">
          {rows.map(({ textColorName, textColorValue }) => (
            <tr key={'text-color-' + textColorName}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                {textColorName}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <div className="flex items-center gap-4">
                  <div
                    className="size-4 rounded-full bg-transparent ring-1 ring-offset-2 ring-antd-border"
                    style={{ backgroundColor: textColorValue }}
                  />
                  <span className="font-mono">{textColorValue}</span>
                </div>
              </td>
              <td
                className="whitespace-nowrap px-3 py-4 text-sm font-mono"
                style={{ color: textColorValue }}
              >
                {textColorName.startsWith('icon') ? (
                  <div className="flex gap-2">
                    <IconCircle1 />
                    <IconBrandGithub />
                  </div>
                ) : (
                  <div
                    className={cn(
                      'px-2 py-1 rounded',
                      textColorName === 'text-light-solid' && 'bg-antd-fill'
                    )}
                  >
                    {text}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const FillColorsPreviewGrid = ({
  colors,
  prefix,
}: {
  colors: Record<string, string>
  prefix: string
}) => {
  const keys = useMemo(
    () => ({
      fill: `${prefix}-fill`,
      fillSecondary: `${prefix}-fill-secondary`,
      fillTertiary: `${prefix}-fill-tertiary`,
      fillQuaternary: `${prefix}-fill-quaternary`,
      fillContent: `${prefix}-fill-content`,
      fillContentHover: `${prefix}-fill-content-hover`,
      fillAlter: `${prefix}-fill-alter`,
    }),
    [prefix]
  )

  const rows = useMemo(
    () =>
      Object.entries(keys).map(([_k, v]) => ({
        fillColorName: v.replace(prefix + '-', ''),
        fillColorValue: colors[v],
      })),
    [keys, colors]
  )
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {rows.map(({ fillColorName, fillColorValue }) => (
        <div key={'fill-color-' + fillColorName} className="flex flex-col items-center">
          <div
            className="w-16 h-9 rounded ring-1 ring-offset-2 ring-antd-border"
            style={{ backgroundColor: fillColorValue }}
          />
          <div className="mt-1">{fillColorName}</div>
          <div className="text-sm font-mono text-antd-text-description">{fillColorValue}</div>
        </div>
      ))}
    </div>
  )
}

const BackgroundColorsPreviewGrid = ({
  colors,
  prefix,
}: {
  colors: Record<string, string>
  prefix: string
}) => {
  const keys = useMemo(
    () => ({
      base: `${prefix}-bg-base`,
      solid: `${prefix}-bg-solid`,
      solidHover: `${prefix}-bg-solid-hover`,
      solidActive: `${prefix}-bg-solid-active`,
      layout: `${prefix}-bg-layout`,
      container: `${prefix}-bg-container`,
      containerDisabled: `${prefix}-bg-container-disabled`,
      elevated: `${prefix}-bg-elevated`,
      spotlight: `${prefix}-bg-spotlight`,
      mask: `${prefix}-bg-mask`,
      textHover: `${prefix}-bg-text-hover`,
      textActive: `${prefix}-bg-text-active`,
    }),
    [prefix]
  )

  const rows = useMemo(
    () =>
      Object.entries(keys).map(([_k, v]) => ({
        bgColorName: v.replace(prefix + '-', ''),
        bgColorValue: colors[v],
      })),
    [keys, colors]
  )
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {rows.map(({ bgColorName, bgColorValue }) => (
        <div key={'fill-color-' + bgColorName} className="flex flex-col items-center">
          <div
            className="w-16 h-9 rounded ring-1 ring-offset-2 ring-antd-border"
            style={{ backgroundColor: bgColorValue }}
          />
          <div className="mt-1">{bgColorName}</div>
          <div className="text-sm font-mono text-antd-text-description">{bgColorValue}</div>
        </div>
      ))}
    </div>
  )
}

const OtherColorsPreviewGrid = ({
  colors,
  prefix,
}: {
  colors: Record<string, string>
  prefix: string
}) => {
  const keys = useMemo(
    () => ({
      border: `${prefix}-border`,
      borderSecondary: `${prefix}-border-secondary`,
      borderBg: `${prefix}-border-bg`,
      white: `${prefix}-white`,
      split: `${prefix}-split`,
      highlight: `${prefix}-highlight`,
    }),
    [prefix]
  )

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="flex flex-col items-center">
        <div
          className="w-16 h-9 rounded border-2 border-transparent"
          style={{ borderColor: colors[keys.border] }}
        />
        <div className="mt-1">border</div>
        <div className="text-sm font-mono text-antd-text-description">{colors[keys.border]}</div>
      </div>
      <div className="flex flex-col items-center">
        <div
          className="w-16 h-9 rounded border-2 border-transparent"
          style={{ borderColor: colors[keys.borderSecondary] }}
        />
        <div className="mt-1">border-secondary</div>
        <div className="text-sm font-mono text-antd-text-description">
          {colors[keys.borderSecondary]}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-16 h-9 rounded bg-antd-fill flex items-center justify-center">
          <div
            className="w-8 h-4 border-2 rounded-xs"
            style={{ borderColor: colors[keys.borderBg] }}
          />
        </div>
        <div className="mt-1">border-bg</div>
        <div className="text-sm font-mono text-antd-text-description">{colors[keys.borderBg]}</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-16 h-9 rounded flex justify-center items-center gap-2 p-1">
          <div>A</div>
          <div className="w-px h-full" style={{ backgroundColor: colors[keys.split] }}></div>
          <div>B</div>
        </div>
        <div className="mt-1">split</div>
        <div className="text-sm font-mono text-antd-text-description">{colors[keys.split]}</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-16 h-9 rounded flex items-center justify-center">
          <span>
            A <mark style={{ backgroundColor: colors[keys.highlight] }}>WITH</mark> B
          </span>
        </div>
        <div className="mt-1">highlight</div>
        <div className="text-sm font-mono text-antd-text-description">{colors[keys.highlight]}</div>
      </div>
      <div className="flex flex-col items-center">
        <div
          className="size-4 rounded-full ring-1 ring-offset-2 ring-antd-border"
          style={{ backgroundColor: colors[keys.white] }}
        />
        <div className="mt-1">white</div>
        <div className="text-sm text-antd-text-description font-mono">{colors[keys.white]}</div>
      </div>
    </div>
  )
}

export { ExtendColorsPreview }
