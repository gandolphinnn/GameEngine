import { Circle, Color, Coord, RenderAction } from ".";

export type SubStyle = Color | CanvasGradient | CanvasPattern;

export const POINT_DEFAULT = new Circle(Coord.origin, 3)
								.setAction(RenderAction.Fill)
								.setFillStyle(Color.byName('Black'));