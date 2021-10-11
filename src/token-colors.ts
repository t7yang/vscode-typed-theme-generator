/** Colors and styles for the token. */
export interface TokenColorSetting {
  /** Font style of the rule: 'italic', 'bold' or 'underline' or a combination. The empty string unsets inherited settings. */
  fontStyle?: '' | 'italic' | 'bold' | 'underline' | 'italic underline' | 'bold underline' | 'italic bold underline';
  /** Foreground color for the token. */
  foreground?: string;
}

/** Colors for syntax highlighting */
export interface TokenColor {
  /** Description of the rule. */
  name?: string;
  /** Scope selector against which this rule matches. */
  scope: string | string[];
  /** Colors and styles for the token. */
  settings: TokenColorSetting;
}
