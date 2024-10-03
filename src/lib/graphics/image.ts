import { Coord, MainCanvas, Size } from ".";

export class Img {

	private _img: HTMLImageElement = null;
	public get img() {
		return this._img;
	}

	constructor(
		public coord: Coord,
		public id: string,
		public size?: Partial<Size>,
	) {
		this._img = document.getElementById(id) as HTMLImageElement;
	}

	public draw(): void {
		if (this.size) {
			//TODO MainCanvas.ctx.drawImage(this.img, this.coord.x, this.coord.y, this.size.width || 0, this.size.height || 0);
			MainCanvas.ctx.drawImage(this.img, this.coord.x, this.coord.y, this.size.width, this.size.height);
		}
		else {
			MainCanvas.ctx.drawImage(this.img, this.coord.x, this.coord.y);
		}
	}
}