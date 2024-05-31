const pug = require('pug')
const fs = require('fs')
const path = require('path')
const createPreset = require('tailwindcss-antdesign-preset')

function compile(distPath) {
  const preset = createPreset()
  const data = { preset }
  const fn = pug.compileFile(path.join(__dirname, 'template.pug'))
  const html = fn(data)
  fs.writeFileSync(path.join(distPath, 'index.html'), html)
}

function main() {
  const distPath = path.join(process.cwd(), 'dist')
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist')
  }
  compile(distPath)
}

main()
