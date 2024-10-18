import { overflow } from '@gandolphinnn/utils';
import { GameCycle } from '@gandolphinnn/shared';
import { MainCanvas, Style, SubStyle, Size, Coord, Angle, RenderAction, CnvElement } from '../..';

export class Text extends CnvElement {
	content: string;

	get isVisible() { return this.action != RenderAction.None; }

	constructor(center: Coord, content: string) {
		super(RenderAction.Fill, center);
		this.content = content;
	}
	render(drawPoints = false) {
		MainCanvas.write(this.style, () => {
			if (this.action == RenderAction.Both || this.action == RenderAction.Fill) {
				MainCanvas.ctx.fillText(this.content, this.center.x, this.center.y);
			}
			if (this.action == RenderAction.Both || this.action == RenderAction.Stroke) {
				MainCanvas.ctx.strokeText(this.content, this.center.x, this.center.y);
			}
		});
		if(drawPoints) {this.drawPoints();}
		return this;
	}
}