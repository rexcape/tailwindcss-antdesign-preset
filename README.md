# tailwindcss-antdesign-preset

Make [ant design tokens](https://ant.design/docs/react/customize-theme#seedtoken) to a tailwindcss theme config [preset](https://tailwindcss.com/docs/presets)

Result on custom components

| Before                                                                                         | After                                                                                        |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| ![before](https://cdn.jsdelivr.net/gh/rexcape/tailwindcss-antdesign-preset/.github/before.png) | ![after](https://cdn.jsdelivr.net/gh/rexcape/tailwindcss-antdesign-preset/.github/after.png) |

## Preparation

To make tailwindcss utility class work with ant design, please follow these steps or read [ant design doc](https://ant.design/docs/react/compatible-style#compatible-with-third-party-style-libraries)

### Wrap app with `StyleProvider`

Add `@ant-design/cssinjs` dependency, run

```sh
# npm
npm install @ant-design/cssinjs

# yarn
yarn add @ant-design/cssinjs

# pnpm
pnpm add @ant-design/cssinjs
```

Wrap app component with StyleProvider

```jsx
export default () => (
  <StyleProvider layer>
    <MyApp />
  </StyleProvider>
)
```

### Modify `global.css`

In global.css, adjust `@layer` to control the order of style override. Place `tailwind-base` before `antd`:

```css
@layer tailwind-base, antd, custom;

@layer tailwind-base {
  @tailwind base;
}

@tailwind components;

@layer custom {
  /* custom utilities will overwrite ant design css */
  @tailwind utilities;
}
```

### Modify `reset.css`(optional)

If you use antd's `reset.css` style, you need to specify `@layer` for it to prevent the style from overriding antd:

```css
@layer reset, antd;

@import url(reset.css) layer(reset);
```

Here's the sample code(only for example, the [danger attribute](https://ant.design/components/button#components-button-demo-danger) is more suitable for red buttons):

```jsx
const CustomAntButton = () => <Button className="p-0 bg-ant-error">Custom Button</Button>
```

## Usage

### Prerequisites

- `antd`: [`antd`](https://www.npmjs.com/package/antd) package(version > 5) is installed for your project
- `tailwindcss`: [`tailwindcss`](https://www.npmjs.com/package/tailwindcss) is [installed and configured](https://tailwindcss.com/docs/installation) for your project

### Use webapp(recommended)

Open [webapp](https://rexcape.github.io/tailwindcss-antdesign-preset/) in a new tab, copy the json theme from [theme editor](https://ant.design/theme-editor)(Or just use the default theme). Click generate button. Copy and paste generated code into your tailwind config.

You can modify the generated theme on yourself, so this method is the most customizable one.

### Copy js file

Copy [index.js](./src/index.js) to your project and use it. You need to install [`lodash.kebabcase`](https://www.npmjs.com/package/lodash.merge) to convert the `camelCase` tokens to tailwind's `kebab-case`(tailwind suggested) and [`lodash.merge`](https://www.npmjs.com/package/lodash.merge) to merge preset

### Install npm package(cleaner config)

Run the command:

```sh
# npm
npm i -D tailwindcss-antdesign-preset

# yarn
yarn add --dev tailwindcss-antdesign-preset

# pnpm
pnpm add -D tailwindcss-antdesign-preset
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
  presets: [require('tailwindcss-antdesign-preset')({ theme: customTheme })],
  // ...other settings
}
```

## Default preset

Look at the [sample file](./src/sample.js) or [preview page](https://rexcape.github.io/tailwindcss-antdesign-preset/)

## Available configs

### Special

I've found these special rules in my use. If you'v found a special rule, [issue](https://github.com/rexcape/tailwindcss-antdesign-preset/issues/new) or [pull request](https://github.com/rexcape/tailwindcss-antdesign-preset/compare) is welcomed

To avoid possible conflicts between [ant design semantic colors](https://ant.design/docs/react/customize-theme#maptoken) with tailwindcss utility classes, ant design semantic color token such as `colorBgSolid` will be converted into `theme.extend.colors['ant-bg-solid']`. Use it with `border-ant-border`, `bg-ant-bg-solid` for example.

You can customize the prefix for a better meaning, such as `color`. Ant design color token `colorBgSolid` will be converted into `theme.extend.colors['color-bg-solid']`. Use it with `border-color-bg-solid` for example.

```js
const config = {
  presets: [require('tailwindcss-antdesign-preset')({ theme: customTheme, colorPrefix: 'color' })],
  // ...other settings
}
```

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

| Ant Design                     | TailwindCSS Config         | base |
| ------------------------------ | -------------------------- | ---- |
| semantic colors(colorBg, etc.) | theme.extend.color.\*      |      |
| padding\*                      | theme.extend.padding.\*    | v    |
| margin\*                       | theme.extend.margin.\*     | v    |
| size\*                         | theme.extend.size.\*       | v    |
| boxShadow\*                    | theme.extend.boxShadow.\*  | v    |
| lineHeight\*                   | theme.extend.lineHeight.\* | v    |

base: you need use such as `padding-base` for ant design default value(padding)
