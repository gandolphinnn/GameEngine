import { AppSettings } from '@gandolphinnn/shared';
import { Color } from './src/color';
import { Coord } from './src/coord';
import { Circle } from './src/elements';
import { RenderAction } from './src/types';

export * from './src/angle';
export * from './src/color';
export * from './src/coord';
export * from './src/elements';
export * from './src/style';
export * from './src/time';
export * from './src/image';
export * from './src/canvas';
export * from './src/types';

/* export const POINT_DEFAULT = new Circle(Coord.origin, AppSettings.POINT_RADIUS)
								.setAction(RenderAction.Fill)
								.setFillStyle(Color.byName('Black')); */