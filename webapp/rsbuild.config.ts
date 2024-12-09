import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginMdx } from '@rsbuild/plugin-mdx'
import remarkGFM from 'remark-gfm'

export default defineConfig({
  plugins: [
    pluginReact({
      swcReactOptions: {
        importSource: '@emotion/react',
      },
    }),
    pluginMdx({
      mdxLoaderOptions: {
        remarkPlugins: [remarkGFM],
      },
    }),
  ],

  html: {
    title: 'TailwindAntPreset',
  },

  tools: {
    postcss: {
      postcssOptions: {
        plugins: [require('tailwindcss')],
      },
    },
  },

  server: {
    base: '/tailwindcss-antdesign-preset'
  }
})
