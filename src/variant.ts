import { TokenColor } from './token-colors';
import { UiColor } from './ui-colors';

type ObjKey = string | number;
export type VariantColor<Label extends ObjKey, Var extends ObjKey> = Record<Label, Record<Var, string>>;
export type VariantVariable<Var extends ObjKey> = Record<Var, Var>;

/**
 * create variant theme color based variables
 * @param variants variant color variables
 * @returns variant color variable you input and variable tokens
 */
export const createVariant = <Label extends ObjKey, Var extends ObjKey>(
  variants: VariantColor<Label, Var>,
): [VariantColor<Label, Var>, VariantVariable<Var>] => {
  const VAR = Object.values(variants)[0] as VariantVariable<Var> | undefined;
  return [variants, (VAR ? Object.fromEntries(Object.keys(VAR).map(key => [key, key])) : {}) as VariantVariable<Var>];
};

/**
 * create variant UI color tokens
 * @param uiColor defined UI color tokens
 * @param variants variant color variable return by createVariant function
 * @returns variant color based UI color tokens
 */
export const createVariantUiColor = <Label extends ObjKey, Var extends ObjKey>(
  uiColor: UiColor,
  variants: VariantColor<Label, Var>,
): Record<Label, UiColor> => {
  const variantUiColor = Object.fromEntries(Object.keys(variants).map(key => [key, { ...uiColor }])) as Record<
    Label,
    UiColor
  >;

  Object.entries(variants).forEach(variantEntry => {
    const [label, VAR] = variantEntry as [Label, typeof variants[Label]];
    const themeUiColor = variantUiColor[label];
    Object.entries(themeUiColor).forEach(themeEntry => {
      const [uiToken, color] = themeEntry as [keyof UiColor, string];
      VAR[color as Var] && (themeUiColor[uiToken] = VAR[color as Var]);
    });
  });

  return variantUiColor;
};

/**
 * create variant syntax color tokens
 * @param tokenColors defined syntax color tokens
 * @param variants varaint color variable return by createVariant function
 * @returns variant color based syntax color tokens
 */
export const createVariantTokenColors = <Label extends ObjKey, Var extends ObjKey>(
  tokenColors: TokenColor[],
  variants: VariantColor<Label, Var>,
): Record<Label, TokenColor[]> => {
  const variantTokenColors = Object.fromEntries(
    Object.keys(variants).map(key => [key, tokenColors.map(settings => ({ ...settings }))]),
  ) as Record<Label, TokenColor[]>;

  Object.entries(variants).forEach(variantEntry => {
    const [label, VAR] = variantEntry as [Label, typeof variants[Label]];
    variantTokenColors[label].forEach(tokenColor => {
      tokenColor.settings.foreground &&
        VAR[tokenColor.settings.foreground as Var] &&
        (tokenColor.settings = { ...tokenColor.settings, foreground: VAR[tokenColor.settings.foreground as Var] });
    });
  });

  return variantTokenColors;
};
