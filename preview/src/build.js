const pug = require('pug')
const fs = require('fs')
const path = require('path')
const createPreset = require('tailwindcss-antdesign-preset')

function compile() {
  const preset = createPreset()
  const data = { preset }
  const fn = pug.compileFile(path.join(__dirname, 'template.pug'))
  const html = fn(data)
  fs.writeFileSync(path.join(process.cwd(), 'dist', 'index.html'), html)
}

compile()
