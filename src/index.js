const { theme } = require('antd')
const kebabCase = require('lodash.kebabcase')
const merge = require('lodash.merge')

const replaceValue = (v) => {
  if (typeof v === 'string') {
    if (v.startsWith('#')) {
      v = v.toLowerCase()
    }
  } else if (typeof v === 'number') {
    v = `${Number(v.toFixed(3))}px`
  }

  return v
}

const COLORS = [
  'blue',
  'purple',
  'cyan',
  'green',
  'magenta',
  'pink',
  'red',
  'orange',
  'yellow',
  'volcano',
  'geekblue',
  'gold',
  'lime',
]

const COLOR_REGEXP = new RegExp(`^(?<color>${COLORS.join('|')})-?(?<deg>\\d+)?$`)
const COLOR_EXTEND_REGEXP = new RegExp('^color(?<name>\\w+)$')
const FONT_SIZE_REGEXP = new RegExp('^fontSize(?<size>\\w+)?$')
const FONT_FAMILY_REGEXP = new RegExp('^fontFamily(?<family>\\w+)?$')
const BORDER_RADIUS_REGEXP = new RegExp('^borderRadius(?<size>\\w+)?$')
const PADDING_REGEXP = new RegExp('^padding(?<size>\\w+)?$')
const MARGIN_REGEXP = new RegExp('^margin(?<size>\\w+)?$')
const SIZE_REGEXP = new RegExp('^size(?<size>\\w+)?$')
const BOX_SHADOW_REGEXP = new RegExp('^boxShadow(?<name>\\w+)?$')
const SCREEN_REGEXP = new RegExp('^screen(?<size>\\w+)(Min|Max)?$')
const LINE_HEIGHT_REGEXP = new RegExp('^lineHeight(?<size>\\w+)?$')

const defaultPluginOptions = {
  theme: undefined,
  colorPrefix: 'antd',
}

const createPreset = (pluginOptions = defaultPluginOptions) => {
  const { theme: customTheme, colorPrefix } = {
    ...pluginOptions,
    ...defaultPluginOptions,
    colorPrefix: pluginOptions?.colorPrefix ?? defaultPluginOptions.colorPrefix,
  }

  const tokens = theme.getDesignToken(customTheme)

  const preset = {
    theme: {
      colors: {},
      fontSize: {},
      fontFamily: {},
      borderRadius: {},
      extend: {
        colors: {},
        boxShadow: {},
        padding: {},
        margin: {},
        size: {},
        lineHeight: {},
      },
      screens: {},
    },
  }

  for (const [k, v] of Object.entries(tokens)) {
    const val = replaceValue(v)
    if (COLOR_REGEXP.test(k)) {
      if (k.includes('-')) {
        continue
      }
      const matches = COLOR_REGEXP.exec(k)
      if (matches) {
        const color = matches.groups.color
        const deg = matches.groups.deg || 'DEFAULT'
        merge(preset.theme.colors, {
          [color]: {
            [deg]: val,
          },
        })
      }
    } else if (COLOR_EXTEND_REGEXP.test(k)) {
      const matches = COLOR_EXTEND_REGEXP.exec(k)
      if (matches) {
        const color = `${colorPrefix}-${kebabCase(matches.groups.name)}`
        merge(preset.theme.extend.colors, { [color]: val })
      }
    } else if (FONT_SIZE_REGEXP.test(k)) {
      const matches = FONT_SIZE_REGEXP.exec(k)
      if (matches) {
        const size = matches.groups?.size?.toLowerCase()?.replace('heading', 'h') || 'base'
        merge(preset.theme.fontSize, { [size]: val })
      }
    } else if (FONT_FAMILY_REGEXP.test(k)) {
      const matches = FONT_FAMILY_REGEXP.exec(k)
      if (matches) {
        const family = matches.groups?.family?.toLowerCase()
        if (!family) {
          merge(preset.theme.fontFamily, { sans: val.replaceAll('\n', ' ') })
        } else if (family === 'code') {
          merge(preset.theme.fontFamily, { mono: val })
        }
      }
    } else if (BORDER_RADIUS_REGEXP.test(k)) {
      const matches = BORDER_RADIUS_REGEXP.exec(k)
      if (matches) {
        const size = matches.groups?.size?.toLowerCase() || 'DEFAULT'
        merge(preset.theme.borderRadius, { [size]: val })
      }
    } else if (PADDING_REGEXP.test(k)) {
      const matches = PADDING_REGEXP.exec(k)
      if (matches) {
        const size = kebabCase(matches.groups?.size || 'base')
        merge(preset.theme.extend.padding, { [size]: val })
      }
    } else if (MARGIN_REGEXP.test(k)) {
      const matches = MARGIN_REGEXP.exec(k)
      if (matches) {
        const size = kebabCase(matches.groups?.size || 'base')
        merge(preset.theme.extend.margin, { [size]: val })
      }
    } else if (BOX_SHADOW_REGEXP.test(k)) {
      const matches = BOX_SHADOW_REGEXP.exec(k)
      if (matches) {
        const name = kebabCase(matches.groups.name || 'base')
        merge(preset.theme.extend.boxShadow, {
          [name]: val.replaceAll('\n', '').replaceAll(/\s+/g, ' ').trim(),
        })
      }
    } else if (SIZE_REGEXP.test(k)) {
      const matches = SIZE_REGEXP.exec(k)
      if (matches) {
        const size = kebabCase(matches.groups?.size || 'base')
        merge(preset.theme.extend.size, { [size]: val })
      }
    } else if (SCREEN_REGEXP.test(k)) {
      if (k.endsWith('Min') || k.endsWith('Max')) {
        continue
      }
      const matches = SCREEN_REGEXP.exec(k)
      if (matches) {
        const size = matches.groups?.size.toLowerCase()
        merge(preset.theme.screens, { [size]: val })
      }
    } else if (LINE_HEIGHT_REGEXP.test(k)) {
      const matches = LINE_HEIGHT_REGEXP.exec(k)
      if (matches) {
        const size = matches.groups?.size?.toLowerCase() || 'base'
        merge(preset.theme.extend.lineHeight, { [size]: val })
      }
    }
  }

  return preset
}

module.exports = createPreset
