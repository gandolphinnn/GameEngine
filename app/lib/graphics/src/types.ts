import { Color } from '..';

export type SubStyle = Color | CanvasGradient | CanvasPattern;

export type Size = {
	width: number;
	height: number;
}

export enum RenderAction {
	None, Stroke, Fill, Both
}

export type ColorName = 'AliceBlue' | 'AntiqueWhite' | 'Aqua' | 'Aquamarine' | 'Azure' | 'Beige' | 'Bisque' | 'Black' | 'BlanchedAlmond' | 'Blue' | 'BlueViolet' | 'Brown' | 'BurlyWood' | 'CadetBlue' | 'Chartreuse' | 'Chocolate' | 'Coral' | 'CornflowerBlue' | 'Cornsilk' | 'Crimson' | 'Cyan' | 'DarkBlue' | 'DarkCyan' | 'DarkGoldenRod' | 'DarkGrey' | 'DarkGreen' | 'DarkKhaki' | 'DarkMagenta' | 'DarkOliveGreen' | 'DarkOrange' | 'DarkOrchid' | 'DarkRed' | 'DarkSalmon' | 'DarkSeaGreen' | 'DarkSlateBlue' | 'DarkSlateGrey' | 'DarkTurquoise' | 'DarkViolet' | 'DeepPink' | 'DeepSkyBlue' | 'DimGrey' | 'DodgerBlue' | 'FireBrick' | 'FloralWhite' | 'ForestGreen' | 'Fuchsia' | 'Gainsboro' | 'GhostWhite' | 'Gold' | 'GoldenRod' | 'Grey' | 'Green' | 'GreenYellow' | 'HoneyDew' | 'HotPink' | 'IndianRed' | 'Indigo' | 'Ivory' | 'Khaki' | 'Lavender' | 'LavenderBlush' | 'LawnGreen' | 'LemonChiffon' | 'LightBlue' | 'LightCoral' | 'LightCyan' | 'LightGoldenRodYellow' | 'LightGrey' | 'LightGreen' | 'LightPink' | 'LightSalmon' | 'LightSeaGreen' | 'LightSkyBlue' | 'LightSlateGrey' | 'LightSteelBlue' | 'LightYellow' | 'Lime' | 'LimeGreen' | 'Linen' | 'Magenta' | 'Maroon' | 'MediumAquaMarine' | 'MediumBlue' | 'MediumOrchid' | 'MediumPurple' | 'MediumSeaGreen' | 'MediumSlateBlue' | 'MediumSpringGreen' | 'MediumTurquoise' | 'MediumVioletRed' | 'MidnightBlue' | 'MintCream' | 'MistyRose' | 'Moccasin' | 'NavajoWhite' | 'Navy' | 'OldLace' | 'Olive' | 'OliveDrab' | 'Orange' | 'OrangeRed' | 'Orchid' | 'PaleGoldenRod' | 'PaleGreen' | 'PaleTurquoise' | 'PaleVioletRed' | 'PapayaWhip' | 'PeachPuff' | 'Peru' | 'Pink' | 'Plum' | 'PowderBlue' | 'Purple' | 'RebeccaPurple' | 'Red' | 'RosyBrown' | 'RoyalBlue' | 'SaddleBrown' | 'Salmon' | 'SandyBrown' | 'SeaGreen' | 'SeaShell' | 'Sienna' | 'Silver' | 'SkyBlue' | 'SlateBlue' | 'SlateGrey' | 'Snow' | 'SpringGreen' | 'SteelBlue' | 'Tan' | 'Teal' | 'Thistle' | 'Tomato' | 'Turquoise' | 'Violet' | 'Wheat' | 'White' | 'WhiteSmoke' | 'Yellow' | 'YellowGreen'
export type RGBA = {
	red: number,
	green: number,
	blue: number
	alpha: number | null
}