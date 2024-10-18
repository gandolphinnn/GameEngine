import { overflow } from '@gandolphinnn/utils';
import { GameCycle } from '@gandolphinnn/shared';
import { MainCanvas, Style, SubStyle, Size, Coord, Angle, RenderAction, CnvDrawing } from '../..';

export class Rect extends CnvDrawing {

	protected _size: Size;
	public get size() { return this._size; }
	public set size(size: Size) { this._size = size; }

	/**
	 * Return the 4 points of the rectangle, starting from the top left and going clockwise
	 */
	get points() {
		const deltaX = this.size.width/2;
		const deltaY = this.size.height/2;
		return [
			Coord.sumXY(this.center, -deltaX, -deltaY),
			Coord.sumXY(this.center, deltaX, -deltaY),
			Coord.sumXY(this.center, deltaX, deltaY),
			Coord.sumXY(this.center, -deltaX, deltaY),
		];
	}
	get perimeter() { return (this.size.height + this.size.width) * 2; }
	get area() { return this.size.height * this.size.width; }
	get ratio() { return this.size.width / this.size.height; }

	get isVisible() { return this.action != RenderAction.None && this.points.some(p => p.isVisible); }

	constructor(center: Coord, size: Size) {
		super(RenderAction.Both, center);
		this._size = size; //! Dont use the setter, because it will break Img
	}
	render(drawPoints = false) {
		MainCanvas.draw(this.style, () => {
			MainCanvas.ctx.beginPath();
			MainCanvas.ctx.rect(this.points[0].x, this.points[0].y, this.size.width, this.size.height);
			this.execAction();
		});
		drawPoints? this.drawPoints(this.points) : null;
		return this;
	}

	renderOutline(drawPoints = false) {
		MainCanvas.draw(this.style, () => {
			MainCanvas.ctx.beginPath();
			MainCanvas.ctx.rect(this.points[0].x, this.points[0].y, this.size.width, this.size.height);
			MainCanvas.ctx.stroke();
			MainCanvas.ctx.closePath();
		});
		drawPoints? this.drawPoints(this.points) : null;
		return this;
	}
}