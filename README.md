# VSCode Typed Theme Generator

VSCode Typed Theme Generator(VTTG) is a programatically, strong typing Theme generator for VSCode. No more mess up with JSON files and hard maintain HEX color.

## Install

```bash
$ npm install vscode-typed-theme-generator
$ yarn add vscode-typed-theme-generator
```

## Features

- Design your theme with TypeScript and well type definition including every property information (hovering).
- Support generate variant colors theme with variable.
- Provide a helper function to add alpha (in rgba) to color and even variable.
- Regenerate themes after edited (watch mode) with `ts-node-dev` add update contribution field in `package.json`.

## Usage

You can first using VSCode's yeoman [extension generator](https://code.visualstudio.com/docs/getstarted/themes#_creating-your-own-color-theme) to help you generate a skeleton of your theme project.

Here is a small example for how to use this extension:

```typescript
import md from 'material-colors-ts';
import {
  createVariant,
  createVariantUiColor,
  createVsCodeTheme,
  CreateVsCodeThemeConfig,
  TokenColor,
  transparent,
  UiColor,
  VsCodeThemeMeta,
  UiColor,
} from 'vscode-typed-theme-generator';

// if you want to create several themes with difference color based
const [variant, Variable] = createVariant({
  default: { bg1: '#07090F', bg2: '#17191F' },
  black: { bg1: '#010109', bg2: '#111119' },
});

// define your UI color token with color palette you like,
// also, you can use variant variable as color value.
const uiColor: UiColor = {
  focusBorder: md.deepPurple.A700,
  foreground: md.blueGrey[100],
  // transparent helper function help you add alpha value to hex color
  errorForeground: transparent(md.pink[700], 0.5),
  'icon.foreground': transparent(md.deepPurple.A100, '33'),
  // transparent function even support variable
  'list.inactiveSelectionBackground': transparent(Variable.bg2, 0.7),
  'activityBar.background': Variable.bg1,
  // ...more UI color tokens
};

// if you use variant color variable, make sure you create variant UI color token
// with createVariantUiColor function.
const variantUiColor = createVariantUiColor(uiColor, variant);

// token color also support variant and createVariantTokenColors, use as you needed.
const tokenColors: TokenColor[] = [
  {
    name: 'Operators',
    scope: ['keyword.operator', 'keyword.control.ternary', 'keyword.control.anchor.regexp'],
    settings: {
      fontStyle: '',
      foreground: md.lightGreen.A200,
    },
  },
  // ...more syntax color tokens
];

// extract the variant labels
type VariantKey = keyof typeof variantUiColor;

// create corresponding theme name.
const names: Record<VariantKey, string> = {
  default: 'Your Theme',
  black: 'Your Theme (Black)',
};

// create the config for final generation.
const config: CreateVsCodeThemeConfig = {
  // the absolute path of your project root
  rootPath: process.cwd(),
  // the folder name which your final theme files output
  outputFolder: 'themes',
  // if true, VTTG will help you to update contributes field in your package.json
  isOverridePackageJson: true,
  // You can use a loop or hand writing array literal to list out all your themes metadata
  themes: Object.entries(variantUiColor).map<VsCodeThemeMeta>(entry => {
    const [variant, uiColor] = entry as [VariantKey, UiColor];
    return {
      uiTheme: 'vs-dark',
      filename: `${variant}.json`,
      theme: {
        name: names[variant],
        semanticHighlighting: true,
        colors: uiColor,
        tokenColors,
      },
    };
  }),
};

// finally call createVsCodeTheme function to generate all themes.
createVsCodeTheme(config)
  .then(() => console.log('Themes created!'))
  .catch(error => console.log('Error: ', error));
```

If you want need a watching mode which keep regenerating themes in realtime, you can use with `ts-node-dev` for `ts` or `nodemon` of `js`.

```bash
$ npm i -D ts-node-dev typescript
```

Setup the `scripts` in package.json.

```json
{
  "scripts": {
    "dev": "tsnd --respawn path/to/your/script.ts"
  }
}
```

## Example

A real world example is my theme [Dark Lavender](https://github.com/t7yang/dark-lavender).

## Features

VTTG provides several nice feature to help you build your VSCode theme.

- Strong type with TypeScript
  - Type checking to enhance your project robustness.
  - No need to mess with a lot of JSON files, instead you can use all techniques in JS/TS to help organize your works.
  - Most of the `type`, `interface`, and `function` provide JSDoc comment to help you understand what it is.
- With JS/TS, now you can just install the color pallete (Material Design Colors or Tailwind Colors) you like and import to use in your design.
- With `createVariant` function, now you can use color variable in your design, and very easy to create several themes based on difference primary color.
