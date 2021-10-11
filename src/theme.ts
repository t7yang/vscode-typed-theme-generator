import { TokenColor } from './token-colors';
import { UiColor } from './ui-colors';

export interface VsCodeTheme {
  $schema?: string;
  name: string;
  include?: string;
  /** Colors in the workbench */
  colors?: UiColor;
  /** Colors for syntax highlighting */
  tokenColors?: TokenColor[];
  /** Whether semantic highlighting should be enabled for this theme. */
  semanticHighlighting?: boolean;
  /**
   * Colors for semantic tokens
   *
   * doc: {@link https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide#predefined-textmate-scope-mappings}
   *
   * ref: {@link https://github.com/microsoft/vscode/blob/main/src/vs/platform/theme/common/tokenClassificationRegistry.ts#L506-L559}
   */
  semanticTokenColors?: Record<string, string>;
}

export interface VsCodeThemeMeta
  extends Pick<VsCodeContributeTheme, 'id' | 'uiTheme'>,
    Partial<Pick<VsCodeContributeTheme, 'label'>> {
  /** Theme's filename, eg. 'dark-theme.json', 'light-theme.json' */
  filename: string;
  theme: VsCodeTheme;
}

/** Contributes textmate color themes. */
export interface VsCodeContributeTheme {
  /** Id of the color theme as used in the user settings. */
  id?: string;
  /** Label of the color theme as shown in the UI. */
  label: string;
  /** Base theme defining the colors around the editor: 'vs' is the light color theme, 'vs-dark' is the dark color theme. 'hc-black' is the dark high contrast theme. */
  uiTheme: 'vs' | 'vs-dark' | 'hc-black';
  /** Path of the tmTheme file. The path is relative to the extension folder and is typically './colorthemes/awesome-color-theme.json'. */
  path: string;
}
