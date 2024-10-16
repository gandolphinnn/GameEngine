import { overflow } from '@gandolphinnn/utils';
import { GameCycle } from '@gandolphinnn/shared';
import { MainCanvas, Style, SubStyle, Size, Coord, Angle, RenderAction, Line } from '../..';

export abstract class CnvElement implements GameCycle {
	action: RenderAction;
	zIndex = 0;
	style: Style = Style.empty();

	protected _center: Coord;
	get center() { return this._center }
	set center(center: Coord) { this._center = center }

	/**
	 * Check if the element is visible on the canvas
	 * May cause false positives in some elements
	 */
	abstract get isVisible(): boolean;

	constructor(action: RenderAction, center: Coord) {
		this.action = action;
		this._center = center;
	}

	Start(): void {}
	Update(): void { this.render(false)}

	moveBy(x: number, y: number) {
		//? keep it like this to trigger the setter
		this.center = this.center.sumXY(x, y)
		return this;
	}
	setZ(zIndex: number) {
		this.zIndex = zIndex;
		return this;
	}
	setAction(action: RenderAction) {
		this.action = action;
		return this;
	}
	//#region Style
	setStyle(style: Style) {
		this.style = style;
		return this;
	}
	setFillStyle(fillStyle: SubStyle) {
		this.style.fillStyle = fillStyle;
		return this;
	}
	setStrokeStyle(strokeStyle: SubStyle) {
		this.style.strokeStyle = strokeStyle;
		return this;
	}
	setLineWidth(lineWidth: number) {
		this.style.lineWidth = lineWidth;
		return this;
	}
	setTextAlign(textAlign: CanvasTextAlign) {
		this.style.textAlign = textAlign;
		return this;
	}
	setFont(font: string) {
		this.style.font = font;
		return this;
	}
	mergeStyle(style: Style) {
		this.style.mergeWith(style);
		return this;
	}
	mergeFillStyle(fillStyle: SubStyle) {
		this.style.mergeFillStyle(fillStyle);
		return this;
	}
	mergeStrokeStyle(strokeStyle: SubStyle) {
		this.style.mergeStrokeStyle(strokeStyle);
		return this;
	}
	mergeLineWidth(lineWidth: number) {
		this.style.mergeLineWidth(lineWidth);
		return this;
	}
	mergeTextAlign(textAlign: CanvasTextAlign) {
		this.style.mergeTextAlign(textAlign);
		return this;
	}
	mergeFont(font: string) {
		this.style.mergeFont(font);
		return this;
	}
	//#endregion Style

	abstract render(drawPoints: boolean): CnvElement;
	protected execAction() {
		if (this.action == RenderAction.Both || this.action == RenderAction.Fill) {
			MainCanvas.ctx.fill();
		}
		if (this.action == RenderAction.Both || this.action == RenderAction.Stroke) {
			MainCanvas.ctx.stroke();
		}
		MainCanvas.ctx.closePath();
	}
	protected drawPoints(points: Coord[] = []) {
		[this.center, ...points].forEach(point => {
			point.render();
		});
	}
}

export abstract class CnvDrawing extends CnvElement {
	constructor(action: RenderAction, center: Coord) {
		super(action, center);
	}
}