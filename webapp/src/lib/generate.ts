import { theme as antdTheme, type ThemeConfig } from 'antd'
import createPreset, { type PluginOptions } from 'tailwindcss-antdesign-preset'
import { type Config } from 'tailwindcss'

type AlgorithmStr = 'dark' | 'compact'

interface JSONTheme extends Omit<ThemeConfig, 'algorithm'> {
  algorithm: AlgorithmStr | AlgorithmStr[]
}

const generateCode = async (
  theme: JSONTheme | undefined,
  options: Omit<PluginOptions, 'theme'>
) => {
  const themeObject = theme ? convertTheme(theme) : undefined
  const tokens = antdTheme.getDesignToken(themeObject)

  const tailwindPreset = createPreset({ theme: themeObject, ...options })

  return {
    tokens: formatObject(tokens),
    preset: await formatPreset(tailwindPreset),
  }
}

const convertTheme = (jsonTheme: JSONTheme): ThemeConfig => {
  const { algorithm, ...rest } = jsonTheme

  let convertedAlgorithm: ThemeConfig['algorithm']
  if (Array.isArray(algorithm)) {
    convertedAlgorithm = algorithm.map((item) => convertAlgorithm(item))
  } else {
    convertedAlgorithm = convertAlgorithm(algorithm)
  }

  return {
    algorithm: convertedAlgorithm,
    ...rest,
  }
}

const convertAlgorithm = (algorithm: AlgorithmStr) => {
  switch (algorithm) {
    case 'compact':
      return antdTheme.compactAlgorithm
    case 'dark':
      return antdTheme.darkAlgorithm
  }
}

const formatObject = <T extends Object>(obj: T) => JSON.stringify(obj, null, 2)

const formatPreset = async (preset: Partial<Config>) => {
  const prettier = await require('prettier/standalone')
  const prettierPluginBabel = await require('prettier/plugins/babel')
  const prettierPluginESTree = await require('prettier/plugins/estree')
  return prettier.format(wrapCode(formatObject(preset).replace(/^\{/, '').replace(/\}$/, '')), {
    parser: 'babel',
    plugins: [prettierPluginESTree, prettierPluginBabel],
    singleQuote: true,
    semi: false,
  })
}

const wrapCode = (code: string) => `
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx,css}'],
  ${code}
}`

export { generateCode, type AlgorithmStr, type JSONTheme }
