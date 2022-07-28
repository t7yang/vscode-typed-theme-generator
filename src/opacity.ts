const DEC_ALPHA_RE = /^(0|1|0?\.\d{1,})$/;
const HEX_ALPHA_RE = /^[0-9a-fA-F]{1,2}$/;
const HEX_RE = /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const HEX_NO_ALP_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const HEX_ALP_RE = /^#([0-9a-fA-F]{4}|[0-9a-fA-F]{8})$/;
const HEX_SHORT_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4})$/;
const DEC_PREFIX = '__DEC_ALP__';
const HEX_PREFIX = '__HEX_ALP__';
const VAR_ALP_RE = /^(__DEC_ALP__|__HEX_ALP__)=(?<alpha>(0|1|0?\.\d{1,}|[0-9a-fA-F]{1,2}))__(?<variable>.{1,})/;

export const isHex = (color: string) => HEX_RE.test(color);

export const isVariableWithAlpha = (color: string) => VAR_ALP_RE.test(color);

export const extractVarAndAlpha = (color: string): { variable: string; alpha: number | string | null } => {
  const { alpha, variable } = VAR_ALP_RE.exec(color)?.groups ?? {};
  return {
    variable: alpha ? variable : color,
    alpha: !alpha ? null : color.startsWith(DEC_PREFIX) ? Number.parseFloat(alpha) : alpha,
  };
};

/**
 * A helper function to alpha value to color.
 * @deprecated for better semantic, please use {@link opacity}.
 * @param color A hex color or a variable from createVariant.
 * @param alpha A hex (0-F or 00-FF depend on your color) or decimal (0-1) alpha value.
 * @returns A hex color with alpha or a special form of string combine variable and alpha value.
 */
export const transparent = (color: string, alpha: number | string): string => {
  if (typeof alpha === 'number' && DEC_ALPHA_RE.test(String(alpha))) {
    return transparencyWithNumber(color, alpha);
  } else if (typeof alpha === 'string' && HEX_ALPHA_RE.test(String(alpha))) {
    return transparencyWithString(color, alpha);
  } else {
    throw TypeError(`The argument 'alpha' is an invalid alpha value: ${JSON.stringify(alpha)}`);
  }
};

/**
 * A helper function to alpha value to color.
 * @param color A hex color or a variable from createVariant.
 * @param alpha A hex (0-F or 00-FF depend on your color) or decimal (0-1) alpha value.
 * @returns A hex color with alpha or a special form of string combine variable and alpha value.
 */
export const opacity = (color: string, alpha: number | string): string => {
  if (typeof alpha === 'number' && DEC_ALPHA_RE.test(String(alpha))) {
    return transparencyWithNumber(color, alpha);
  } else if (typeof alpha === 'string' && HEX_ALPHA_RE.test(String(alpha))) {
    return transparencyWithString(color, alpha);
  } else {
    throw TypeError(`The argument 'alpha' is an invalid alpha value: ${JSON.stringify(alpha)}`);
  }
};

function getColorType(color: string): 'VAR' | 'HEX' | 'HEXALP' {
  return HEX_NO_ALP_RE.test(color) ? 'HEX' : HEX_ALP_RE.test(color) ? 'HEXALP' : 'VAR';
}

function decToHex(alpha: number, isShort: boolean) {
  return Math.round(alpha * (isShort ? 0xf : 0xff)).toString(16);
}

function transparencyWithNumber(color: string, alpha: number): string {
  switch (getColorType(color)) {
    case 'HEX':
      return color + decToHex(alpha, HEX_SHORT_RE.test(color));
    case 'HEXALP':
      return color.slice(0, HEX_SHORT_RE.test(color) ? -1 : -2) + decToHex(alpha, HEX_SHORT_RE.test(color));
    case 'VAR':
      return `${DEC_PREFIX}=${alpha}__${color}`;
  }
}

function transparencyWithString(color: string, alpha: string): string {
  switch (getColorType(color)) {
    case 'HEX':
    case 'HEXALP':
      return color + alpha;
    case 'VAR':
      return `${HEX_PREFIX}=${alpha}__${color}`;
  }
}
