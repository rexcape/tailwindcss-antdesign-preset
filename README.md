# tailwindcss-antdesign-preset

Make [ant design tokens](https://ant.design/docs/react/customize-theme#seedtoken) to a tailwindcss theme config [preset](https://tailwindcss.com/docs/presets)

Result on custom components

| Before                                                                                         | After                                                                                        |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| ![before](https://cdn.jsdelivr.net/gh/rexcape/tailwindcss-antdesign-preset/.github/before.png) | ![after](https://cdn.jsdelivr.net/gh/rexcape/tailwindcss-antdesign-preset/.github/after.png) |

## NOTE

You may need to add important flag for ant design component className in nextjs projects since the `globals.css` file is imported **before** ant design components style

Here's the sample code:

```tsx
// This won't work
<Button className="p-0 color-error">
  Your Button
</Button>

// This works
<Button className="!p-0 !color-error">
  Your Button
</Button>
```

## Usage

### Prerequisites

- `antd`: The antd package is installed
- `tailwindcss`: The tailwindcss is installed and configured for your project

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

Add to `tailwind.config.js`(or `tailwind.config.ts`)

Use the default theme:

```js
const config = {
  presets: [require('tailwindcss-antdesign-preset')()],
  // ...other settings
}
```

Use custom theme:

```js
const config = {
  presets: [require('tailwindcss-antdesign-preset')(customTheme)],
  // ...other settings
}
```

### Copy file

Copy [index.js](./src/index.js) to your project and use it. You need to install `lodash.kebabcase` to convert the `camelCase` tokens to tailwind's `kebab-case`(suggested) and `lodash.merge` to merge preset

## Default preset

Look at the [sample file](./src/sample.js)

## Available configs

### Special

I've found these special rules in my use. If you'v found a special rule, [issue](https://github.com/rexcape/tailwindcss-antdesign-preset/issues/new) or [pull request](https://github.com/rexcape/tailwindcss-antdesign-preset/compare) is welcomed

- ant design token `colorIcon` to tailwindcss `theme.extend.color.iconc`(usage: `text-iconc`)
  - explain: text-icon includes two styles in tailwindcss: `fontSize.icon` and `color.icon`. Split them for a better readability

### Override

These ant design tokens override tailwindcss theme default values:

| Ant Design                 | TailwindCSS Config                        | Example Usage         |
| -------------------------- | ----------------------------------------- | --------------------- |
| variant colors(blue, etc.) | theme.color.\*.{ [variant(1-10)]: color } | `bg-blue`/`text blue` |
| fontSize\*                 | theme.fontSize.\*                         | `text-sm`             |
| borderRadius\*             | theme.borderRadius.\*                     | `rounded-md`          |
| screen\*                   | theme.screens.\*                          | `sm:`                 |

### Extend

These ant design tokens extend tailwindcss theme config:

| Ant Design                   | TailwindCSS Config         | ad-default |
| ---------------------------- | -------------------------- | ---------- |
| extend colors(colorBg, etc.) | theme.extend.color.\*      |            |
| padding\*                    | theme.extend.padding.\*    | v          |
| margin\*                     | theme.extend.margin.\*     | v          |
| size\*                       | theme.extend.size.\*       | v          |
| boxShadow\*                  | theme.extend.boxShadow.\*  | v          |
| lineHeight\*                 | theme.extend.lineHeight.\* | v          |

ad-default: you need use such as `padding-ad-default` for ant design default value(padding)
