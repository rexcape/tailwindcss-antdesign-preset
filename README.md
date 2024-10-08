# tailwindcss-antdesign-preset

Make [ant design tokens](https://ant.design/docs/react/customize-theme#seedtoken) to a tailwindcss theme config [preset](https://tailwindcss.com/docs/presets)

Result on custom components

| Before                                                                                         | After                                                                                        |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| ![before](https://cdn.jsdelivr.net/gh/rexcape/tailwindcss-antdesign-preset/.github/before.png) | ![after](https://cdn.jsdelivr.net/gh/rexcape/tailwindcss-antdesign-preset/.github/after.png) |

## NOTE

This package is used to make your custom components' design more consistent with ant design like above code. For ant design components's `className`, you may need to add [important modifier](https://tailwindcss.com/docs/configuration#important-modifier) in nextjs projects since the `globals.css` file is imported **before** ant design components style

Here's the sample code(only for example, the [danger attribute](https://ant.design/components/button#components-button-demo-danger) is more suitable for red buttons):

```jsx
// This won't work
const CustomAntButton = () => <Button className="p-0 bg-error">Custom Button</Button>

// This works
const CustomAntButton = () => <Button className="!p-0 !bg-error">Custom Button</Button>
```

## Usage

### Prerequisites

- `antd`: [`antd`](https://www.npmjs.com/package/antd) package(version > 5) is installed for your project
- `tailwindcss`: [`tailwindcss`](https://www.npmjs.com/package/tailwindcss) is [installed and configured](https://tailwindcss.com/docs/installation) for your project

### Copy file

Copy [index.js](./src/index.js) to your project and use it. You need to install [`lodash.kebabcase`](https://www.npmjs.com/package/lodash.merge) to convert the `camelCase` tokens to tailwind's `kebab-case`(tailwind suggested) and [`lodash.merge`](https://www.npmjs.com/package/lodash.merge) to merge preset

### Install npm package

Run the command:

```sh
# npm
npm i -D tailwindcss-antdesign-preset

# yarn
yarn add --dev tailwindcss-antdesign-preset

# pnpm
pnpm add -D tailwindcss-antdesign-preset

# bun
bun add --dev tailwindcss-antdesign-preset
```

### Use default theme

Add to `tailwind.config.js`(or `tailwind.config.ts`)

```js
const config = {
  presets: [require('tailwindcss-antdesign-preset')()],
  // ...other settings
}
```

### Use custom theme

You can use ant design's [theme config object](https://ant.design/docs/react/customize-theme#theme) to define custom theme. Here's the example:

```jsx
// Define your theme somewhere

const customTheme = {
  token: {
    colorPrimary: '#00b96b',
  },
}

// Use it in your ConfigProvider Component

function Layout({ children }) {
  return <ConfigProvider theme={customTheme}>{children}</ConfigProvider>
}

// Use it in tailwind css config

const config = {
  presets: [require('tailwindcss-antdesign-preset')(customTheme)],
  // ...other settings
}
```

## Default preset

Look at the [sample file](./src/sample.js) or [preview page](https://rexcape.github.io/tailwindcss-antdesign-preset/)

## Available configs

### Special

I've found these special rules in my use. If you'v found a special rule, [issue](https://github.com/rexcape/tailwindcss-antdesign-preset/issues/new) or [pull request](https://github.com/rexcape/tailwindcss-antdesign-preset/compare) is welcomed

- ant design token `colorIcon` to tailwindcss `theme.extend.color.iconc`(usage: `text-iconc`)
  - explain: text-icon includes two styles in tailwindcss: `fontSize.icon` and `color.icon`. Split them for a better readability
- ant design token `colorText` to tailwindcss `theme.extend.color.textc`(usage: `text-textc`)
  - explain: better readibility instead of `text-text`

### Override

These ant design tokens override tailwindcss theme default values:

| Ant Design                 | TailwindCSS Config                        | Example Usage           |
| -------------------------- | ----------------------------------------- | ----------------------- |
| variant colors(blue, etc.) | theme.color.\*.{ [variant(1-10)]: color } | `bg-blue`/`text blue`   |
| fontSize\*                 | theme.fontSize.\*                         | `text-sm`               |
| fontFamily\*               | theme.fontFamily.\*                       | `font-mono`/`font-sans` |
| borderRadius\*             | theme.borderRadius.\*                     | `rounded-md`            |
| screen\*                   | theme.screens.\*                          | `sm:`                   |

### Extend

These ant design tokens extend tailwindcss theme config:

| Ant Design                   | TailwindCSS Config         | base |
| ---------------------------- | -------------------------- | ---- |
| extend colors(colorBg, etc.) | theme.extend.color.\*      |      |
| padding\*                    | theme.extend.padding.\*    | v    |
| margin\*                     | theme.extend.margin.\*     | v    |
| size\*                       | theme.extend.size.\*       | v    |
| boxShadow\*                  | theme.extend.boxShadow.\*  | v    |
| lineHeight\*                 | theme.extend.lineHeight.\* | v    |

base: you need use such as `padding-base` for ant design default value(padding)
