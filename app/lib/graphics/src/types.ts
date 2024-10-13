import { Color } from ".";

export type SubStyle = Color | CanvasGradient | CanvasPattern;

export type Size = {
	width: number;
	height: number;
}

export enum RenderAction {
	None, Stroke, Fill, Both
}