import { Coord } from '@gandolphinnn/graphics';
import { BtnCode, Button, WheelAxis } from '..';

export class Mouse {
	position: Coord;
	wheel: {x: WheelAxis, y: WheelAxis};
	btn: Record<BtnCode, Button>;
	isInside: boolean;

	constructor() {
		this.position = new Coord(0,0);
		this.wheel = {x: new WheelAxis(), y: new WheelAxis()};
		this.btn = {0: new Button(), 1: new Button(), 2: new Button(), 3: new Button(), 4: new Button()};
		this.isInside = null;
	}
}