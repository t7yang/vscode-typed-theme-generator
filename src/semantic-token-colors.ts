import { TokenColorSetting } from './token-colors';

export interface SemanticTokenColors {
  [P: string]: string | TokenColorSetting;
}
