import { overflow } from '@gandolphinnn/utils';
import { GameCycle } from '@gandolphinnn/shared';
import { MainCanvas, Style, SubStyle, Size, Coord, Angle, RenderAction, CnvDrawing } from '../..';

export class Line extends CnvDrawing {
	points: [Coord, Coord];

	get length() {
		return Coord.distance(this.points[0], this.points[1]);
	}

	get isVisible() { return this.action != RenderAction.None && this.points.some(p => p.isVisible) }

	constructor(points: [Coord, Coord]) {
		super(RenderAction.Stroke, Coord.center(...points));
		this.points = points;
	}
	/**
	 * return a NEW COORD based on the 2 points
	 */
	get center() { return Coord.center(...this.points)}
	set center(center: Coord) {
		const diff = Coord.difference(center, this.center)
		this._center = center;
		this.points[0].sumXY(diff.x, diff.y)
		this.points[1].sumXY(diff.x, diff.y)
	}
	render(drawPoints = false) {
		MainCanvas.draw(this.style, () => {
			MainCanvas.ctx.beginPath();
			MainCanvas.ctx.moveTo(this.points[0].x, this.points[0].y);
			MainCanvas.ctx.lineTo(this.points[1].x, this.points[1].y);
			this.execAction();
		});
		if(drawPoints) this.drawPoints(this.points);
		return this;
	}
}