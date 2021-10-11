import { TokenColor } from './token-colors';
import { UiColor } from './ui-colors';

type ObjKey = string | number;
export type VariantColor<Variant extends ObjKey, Var extends ObjKey> = Record<Variant, Record<Var, string>>;
export type VariantVar<Var extends ObjKey> = Record<Var, Var>;

/**
 * create variant theme color based variables
 * @param variants variant color variables
 * @returns variant color variable you input and variable tokens
 */
export const createVariant = <Variant extends ObjKey, Var extends ObjKey>(
  variants: VariantColor<Variant, Var>,
): [VariantColor<Variant, Var>, VariantVar<Var>] => {
  const vVar = Object.values(variants)[0] as VariantVar<Var> | undefined;
  return [variants, (vVar ? Object.fromEntries(Object.keys(vVar).map(key => [key, key])) : {}) as VariantVar<Var>];
};

/**
 * create variant UI color tokens
 * @param uiColor defined UI color tokens
 * @param variants variant color variable return by createVariant function
 * @returns variant color based UI color tokens
 */
export const createVariantUiColor = <Variant extends ObjKey, Var extends ObjKey>(
  uiColor: UiColor,
  variants: VariantColor<Variant, Var>,
): Record<Variant, UiColor> => {
  const variantUiColor = Object.fromEntries(Object.keys(variants).map(key => [key, { ...uiColor }])) as Record<
    Variant,
    UiColor
  >;

  Object.entries(variants).forEach(variantEntry => {
    const [variant, vVar] = variantEntry as [Variant, Record<Var, string>];
    const themeUiColor = variantUiColor[variant];
    Object.entries(themeUiColor).forEach(themeEntry => {
      const [uiToken, color] = themeEntry as [keyof UiColor, string];
      vVar[color as Var] && (themeUiColor[uiToken] = vVar[color as Var]);
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
export const createVariantTokenColors = <Variant extends ObjKey, Var extends ObjKey>(
  tokenColors: TokenColor[],
  variants: VariantColor<Variant, Var>,
): Record<Variant, TokenColor[]> => {
  const variantTokenColors = Object.fromEntries(
    Object.keys(variants).map(key => [key, tokenColors.map(settings => ({ ...settings }))]),
  ) as Record<Variant, TokenColor[]>;

  Object.entries(variants).forEach(variantEntry => {
    const [variant, vVar] = variantEntry as [Variant, Record<Var, string>];
    variantTokenColors[variant].forEach(tokenColor => {
      tokenColor.settings.foreground &&
        vVar[tokenColor.settings.foreground as Var] &&
        (tokenColor.settings = { ...tokenColor.settings, foreground: vVar[tokenColor.settings.foreground as Var] });
    });
  });

  return variantTokenColors;
};
