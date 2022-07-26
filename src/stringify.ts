import { VsCodeTheme } from './theme';

export interface VttgStringify {
  (type: 'theme', theme: VsCodeTheme): string;
  (type: 'packageJson', packageJson: Record<string, string>): string;
}

export const vttgStringify: VttgStringify = (type, object) => {
  switch (type) {
    case 'packageJson':
      return JSON.stringify(object, null, 2) + '\n';
    case 'theme':
      return JSON.stringify(object);
  }
};
