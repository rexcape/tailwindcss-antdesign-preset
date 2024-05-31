const pug = require('pug')
const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const typography = require('@tailwindcss/typography')
const createPreset = require('tailwindcss-antdesign-preset')

function compilePage() {
  const preset = createPreset()
  const data = { preset }
  const render = pug.compileFile(path.join(__dirname, 'template.pug'))
  const html = render(data)
  return html
}

function compileCSS(html) {
  const css = fs.readFileSync(path.join(__dirname, 'style.css'))
  const tailwindConfig = {
    content: [{ raw: html, extension: 'html' }],
    theme: {
      extend: {},
      fontFamily: {
        sans: [
          'inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        mono: [
          '"Reddit Mono"',
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
      container: {
        center: true,
      },
    },
    plugins: [typography],
  }
  return postcss([tailwindcss({ config: tailwindConfig }), autoprefixer, cssnano])
    .process(css, { from: './style.css' })
    .then((res) => res.css)
}

async function main() {
  const distPath = path.join(process.cwd(), 'dist')
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist')
  }
  const html = compilePage()
  fs.writeFileSync(path.join(distPath, 'index.html'), html)
  const css = await compileCSS(html)
  fs.writeFileSync(path.join(distPath, 'style.css'), css)
}

main()
