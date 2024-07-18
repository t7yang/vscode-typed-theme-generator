import fs from 'node:fs/promises';
import path from 'node:path';
import { vttgStringify, VttgStringify } from './stringify';
import { VsCodeContributeTheme, VsCodeThemeMeta } from './theme';

export interface CreateVsCodeThemeConfig {
  /** The root path of your VSCode theme project, absolute path */
  rootPath: string;
  /** The output folder for your themes, relative path */
  outputFolder: string;
  /** Should creator override the `contributes.themes` in package.json */
  isOverridePackageJson?: boolean;
  /** Information of your all themes */
  themes: VsCodeThemeMeta[];
}

/**
 * Creator function to help you generate your themes and handle override package.json
 * @param config The essential information for generating your themes.
 * @returns All themes in VSCode contribute form, in case you want to handle override package.json yourself.
 */
export const createVsCodeTheme = (
  config: CreateVsCodeThemeConfig,
  stringify: VttgStringify = vttgStringify,
): Promise<VsCodeContributeTheme[]> => {
  return Promise.all(
    config.themes.map(({ filename, theme, ...contribute }) =>
      fs
        .mkdir(path.resolve(config.rootPath, config.outputFolder), { recursive: true })
        .then(() =>
          fs.writeFile(path.resolve(config.rootPath, config.outputFolder, filename), stringify('theme', theme)),
        )
        .then<VsCodeContributeTheme>(() => ({
          label: theme.name,
          ...contribute,
          path: path.join(config.outputFolder, filename).replace('\\', '/'),
        })),
    ),
  ).then(themes => {
    const packageJsonPath = path.join(config.rootPath, 'package.json');
    return config.isOverridePackageJson
      ? fs
          .readFile(packageJsonPath, 'utf8')
          .then(JSON.parse)
          .then(pkJson => ((pkJson.contributes = Object.assign(pkJson.contributes || {}, { themes })), pkJson))
          .then(pkJson => fs.writeFile(packageJsonPath, stringify('packageJson', pkJson)))
          .then(() => themes)
      : themes;
  });
};
