import { MainCanvas, Coord, RenderAction, CnvDrawing } from '../..';

export class Circle extends CnvDrawing {
	radius: number;

	get diameter() { return this.radius * 2 }
	set diameter(diameter: number) { this.radius = diameter / 2 }

	get isVisible() {
		return this.action != RenderAction.None
			&& this.center.x >= -this.radius
			&& this.center.y >= -this.radius
			&& this.center.x <= MainCanvas.cnv.width + this.radius
			&& this.center.y <= MainCanvas.cnv.height + this.radius
	}
	
	constructor(center: Coord, radius: number) {
		super(RenderAction.Both, center);
		this.radius = radius;
	}
	render(drawPoints = false) {
		MainCanvas.draw(this.style, () => {
			MainCanvas.ctx.beginPath();
			MainCanvas.ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
			this.execAction();
		});
		if(drawPoints) this.drawPoints();
		return this;
	}
}