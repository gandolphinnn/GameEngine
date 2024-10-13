import { AppSettings } from '@gandolphinnn/shared';
import { Color } from './color';
import { Coord } from './coord';
import { Circle } from './elements';
import { RenderAction } from './types';

export * from './angle';
export * from './color';
export * from './coord';
export * from './elements';
export * from './style';
export * from './time';
export * from './image';
export * from './canvas';
export * from './types';

/* export const POINT_DEFAULT = new Circle(Coord.origin, AppSettings.POINT_RADIUS)
								.setAction(RenderAction.Fill)
								.setFillStyle(Color.byName('Black')); */