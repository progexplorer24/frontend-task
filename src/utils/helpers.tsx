import type { ColorParsed } from "./predefined-colors"
// Convert Hex Values to rgb values - return type is array of red, green, blue - [r, g, g]
export const hexToRgb = (hex:string): number[] => {
  const replaceResult = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
  const substring = replaceResult.substring(1).match(/.{2}/g)
  const result = substring === null ? [] : substring.map((x: string) => parseInt(x, 16))
 return result
}

// Convert Hex Values to rgb values - return type is hex string
export const rgbToHex = (r: number, g: number, b: number) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')

// Convert RGB Values to hsl values - return type is floats array of hue, saturation and lightness - [h, s, l] 
export const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

// Function for sorting Color Objects
export const sortColorsArray = (array: ColorParsed[]) => array.sort(function(a, b) {
  const colorA = a.color
  const colorB = b.color
  if (colorA[0] === colorB[0]) {
    if (colorA[1] === colorB[1]) {
      return colorB[1] - colorA[1];
    } else {
      return colorB[2] - colorA[2]
    }
  } else {
    return colorB[0] - colorA[0];
  }
});