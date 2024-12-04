import type { ThemeConfig } from 'antd'
import { Config } from 'tailwindcss'

export interface PluginOptions {
  theme: ThemeConfig
  colorPrefix: string
}

/**
 * Create a tailwindcss preset from ant design theme
 *
 * @param pluginOptions custom theme
 */
declare function createPreset(pluginOptions?: PluginOptions): Partial<Config>

export = createPreset
