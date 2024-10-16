import { MainCanvas, Coord, Angle, RenderAction, CnvDrawing } from '../..';

export class CircleSlice extends CnvDrawing {
	radius: number;
	start: Angle;
	end: Angle;
	counterClockwise: boolean;

	get theta() { return new Angle(this.counterClockwise? this.end.degrees - this.start.degrees: this.start.degrees - this.end.degrees) }

	get diameter() { return this.radius * 2 }
	set diameter(diameter: number) { this.radius = diameter / 2 }

	get isVisible() {
		return this.action != RenderAction.None
			&& this.center.x >= -this.radius
			&& this.center.y >= -this.radius
			&& this.center.x <= MainCanvas.cnv.width + this.radius
			&& this.center.y <= MainCanvas.cnv.height + this.radius
	}

	constructor(center: Coord, radius: number, start: Angle, end: Angle, counterClockwise = true) {
		super(RenderAction.Both, center);
		this.radius = radius;
		this.start = start; 
		this.end = end; 
		this.counterClockwise = counterClockwise;
	}
	render(drawPoints = false) {
		MainCanvas.draw(this.style, () => {
			MainCanvas.ctx.beginPath();
			MainCanvas.ctx.arc(this.center.x, this.center.y, this.radius, this.start.radians, this.end.radians, this.counterClockwise);
			MainCanvas.ctx.closePath()
			this.execAction();
		});
		if(drawPoints) this.drawPoints();
		return this;
	}
}