import { Coord, MainCanvas, Rect, RenderAction, Size } from '..';

export class Img extends Rect {

	private _img: HTMLImageElement = null;
	/**
	 * The actual image element.
	 */
	public get img() {
		return this._img;
	}

	public get size(): Size {
		return this._size;
	}
	public set size(size: Partial<Size>) {
		this._size = {
			width: size.width || this.img.width,
			height: size.height || this.img.height
		};
	}

	constructor(
		public coord: Coord,
		public id: string,
		public customSize: Partial<Size> = {width: null, height: null},
	) {
		const img = document.getElementById(id) as HTMLImageElement;
		const size = {
			width: customSize.width || img.width,
			height: customSize.height || img.height
		};
		//! In the constructor, set the size directly, withour the setter, because i still dont have this._img
		super(coord, size);
		this._img = img;
	}

	public resize(customSize: Partial<Size>) {
		this.size = customSize as Size;
		return this;
	}

	public render(drawPoints = false) {
		if (this.action == RenderAction.Both || this.action == RenderAction.Fill) {
			const point0 = this.points[0];
			MainCanvas.ctx.drawImage(
				this.img,
				point0.x,
				point0.y,
				this.size.width,
				this.size.height,
			);
		}
		if (this.action == RenderAction.Both || this.action == RenderAction.Stroke) {
			this.renderOutline();
		}
		drawPoints? this.drawPoints(this.points) : null;
		return this;
	}
}