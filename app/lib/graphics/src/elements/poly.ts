import { overflow } from '@gandolphinnn/utils';
import { MainCanvas, Coord, RenderAction, CnvDrawing, Line } from '../..';

export class Poly extends CnvDrawing {
	points: Coord[];

	get lines() {
		const lines: Line[] = [];
		if(this.points.length < 2) {return lines;}
		for (let i = 1; i < this.points.length; i++) {
			lines.push(new Line([this.points[i-1], this.points[i]]));
		}
		lines.push(new Line([this.points.last(), this.points[0]]));
		return lines;
	}
	get size() { return Coord.size(...this.points); }
	get length() {
		let length = 0;
		this.lines.forEach(line => {
			length += line.length;
		});
		return length;
	}
	get center() { return Coord.center(...this.points);}
	set center(center: Coord) {
		const diff = Coord.difference(center, this.center);
		this._center = center;
		this.points.forEach(point => {
			point.sumXY(diff.x, diff.y);
		});
	}

	get isVisible() { return this.action != RenderAction.None && this.points.some(p => p.isVisible); }

	constructor(points: Coord[]) {
		super(RenderAction.Both, Coord.center(...points));
		this.points = points;
	}
	/**
	 * Return the point with the selected index performing and overflow
	 */
	getPoint(index: number) { return this.points[overflow(index, 0, this.points.length-1)]; }

	render(drawPoints = false) {
		MainCanvas.draw(this.style, () => {
			MainCanvas.ctx.beginPath();
			MainCanvas.ctx.moveTo(this.points[0].x, this.points[0].y);
			this.points.forEach(point => {
				MainCanvas.ctx.lineTo(point.x, point.y);
			});
			MainCanvas.ctx.closePath();
			this.execAction();
		});
		if(drawPoints) {this.drawPoints(this.points);}
		return this;
	}
}