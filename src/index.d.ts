import type { ThemeConfig } from 'antd'
import { Config } from 'tailwindcss'

/**
 * Create a tailwindcss preset from ant design theme
 *
 * @param customTheme custom theme
 */
declare function createPreset(customTheme?: ThemeConfig): Partial<Config>

export = createPreset
