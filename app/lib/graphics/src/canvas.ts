import { Singleton, isNull, rand } from '@gandolphinnn/utils';
import { Color, ColorName, COLORNAME_RGBA, Style, Coord, Size, Circle, Line, Rect, Text } from '..';

export class MainCanvas extends Singleton {

	//#region Singleton boilerplate
	private static _mainCanvas: Singleton = new MainCanvas();
	private static get instance() {
		return this._mainCanvas as MainCanvas;
	};

	_cnv: HTMLCanvasElement;
	static get cnv() { return this.instance._cnv; };
	private static set cnv(cnv: HTMLCanvasElement) { this.instance._cnv = cnv; };

	_ctx: CanvasRenderingContext2D;
	static get ctx() { return this.instance._ctx; };
	private static set ctx(ctx: CanvasRenderingContext2D) { this.instance._ctx = ctx; };

	_center: Coord;
	static get center() { return this.instance._center.copy(); }
	//#endregion Singleton boilerplate

	private constructor() {
		super();
		const body = document.querySelector('body')!;
		body.style.overflow = 'hidden';
		body.style.margin = '0px';
		this._cnv = body.querySelectorAll('canvas')[0];

		if (isNull(this._cnv)) {
			this._cnv = document.createElement('canvas');
			body.appendChild(this._cnv);
		}

		this._cnv.width = window.innerWidth;
		this._cnv.height = window.innerHeight;

		this._ctx = this._cnv.getContext('2d')!;
		this._center = new Coord(this._cnv.width / 2, this._cnv.height / 2);
		console.log('Main canvas set');
	}

	static drawStyle = Style.default();
	static writeStyle = Style.default();

	static get bgColor() { return Color.byStr(this.cnv.style.backgroundColor); }
	static set bgColor(color: Color) { this.cnv.style.backgroundColor = color.rgbaStr; }

	/**
	 * Returns a random X value inside the canvas, with optional internal padding
	 */
	static randomX(padding: number = 0) {
		return rand(padding, this.cnv.width - padding);
	}
	/**
	 * Returns a random Y value inside the canvas, with optional internal padding
	 */
	static randomY(padding: number = 0) {
		return rand(padding, this.cnv.height - padding);
	}
	/**
	 * Returns a random coordinate inside the canvas, with optional internal padding
	 */
	static randomCoord(padding: number = 0) {
		return new Coord(this.randomX(padding), this.randomY(padding));
	}
	/**
	 * Returns the ratio of the canvas size to the given pixels
	 */
	static pixelToRatio(pixels: number): Size {
		return { width: pixels / this.cnv.width * 100, height: pixels / this.cnv.height * 100 };
	}
	/**
	 * Returns the pixel size of the given ratio
	 */
	static ratioToPixel(ratio: number): Size {
		return { width: ratio * (this.cnv.width / 100), height: ratio * (this.cnv.height/100) };
	}
	/**
	 * Clear the entire canvas
	 */
	static clean() {
		this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
	}
	/**
	 * Save the context, apply the style, execute the callback and restore the context
	 */
	static draw(drawStyle: Style, renderCallBack: Function) {
		this.ctx.save();
		const toApply = Style.from(this.drawStyle, drawStyle);
		this.ctx.fillStyle = toApply.fillStyleVal;
		this.ctx.strokeStyle = toApply.strokeStyleVal;
		this.ctx.lineWidth = toApply.lineWidth;
		renderCallBack();
		this.ctx.restore();
	}
	/**
	 * Save the context, apply the style, execute the callback and restore the context
	 */
	static write(writeStyle: Style, renderCallBack: Function) {
		this.ctx.save();
		const toApply = Style.from(this.writeStyle, writeStyle);
		this.ctx.fillStyle = toApply.fillStyleVal;
		this.ctx.strokeStyle = toApply.strokeStyleVal;
		this.ctx.lineWidth = toApply.lineWidth;
		this.ctx.textAlign = toApply.textAlign;
		this.ctx.font = toApply.font;
		renderCallBack();
		this.ctx.restore();
	}

	//#region Samples
	static drawSampleColors() {
		const scale = 100;
		const whiteTextThreshold = 250;
		const colors = Object.keys(COLORNAME_RGBA);
		const maxY = Math.floor(this.cnv.width / scale);
		let x: number, y: number;
		const rect = new Rect(Coord.origin, {height:scale, width: scale});
		const text = new Text(Coord.origin, 'asd');
		text.style.mergeFont('10px Arial');
		for (let i = 0; i < colors.length; i++) {
			y = Math.floor(i/maxY);
			x = i % maxY;
			const color = Color.byName(colors[i] as ColorName);
			rect.center = new Coord(x*scale+scale/2, y*scale+scale/2);
			rect.style.mergeFillStyle(color);
			rect.render();
			text.center = new Coord(x*scale+scale/2, y*scale+scale/2);
			text.style.mergeFillStyle(color.red + color.green + color.blue < whiteTextThreshold? Color.byName('White') : Color.byName('Black'))	;
			text.content = colors[i];
			text.render();
		}
	}
	static drawSampleUnits(...testUnits: number[]) {
		const sampleUnits = [...new Set([1, 5, 10, 50, 100, 250, 500, 1000, ...testUnits])]
							.filter(v => v > 0)
							.sort((a, b) => a-b);
		const coord = new Coord(this.center.x - 500, this.center.y - (30 * sampleUnits.length / 2));

		const line = new Line([Coord.origin, Coord.origin]);
		line.style.mergeLineWidth(4);
		const text = new Text(coord, '');
		text.style.mergeFont('20px Arial').mergeTextAlign('right');
		sampleUnits.forEach(unit => {
			testUnits.indexOf(unit) != -1 ? line.style.mergeStrokeStyle(Color.byName('Red')) : line.style.mergeStrokeStyle(Color.byName('Black'));
			line.points[0] = Coord.sumXY(coord, 10, 0);
			line.points[1] = Coord.sumXY(coord, unit + 10, 0);
			text.content = unit.toString();
			line.render();
			text.render();
			coord.sumXY(0, 30);
		});
	}
	static drawSampleMetric(scale = 50) {
		const line = new Line([Coord.origin, new Coord(0, this.cnv.height)]);
		line.style.mergeLineWidth(MainCanvas.ratioToPixel(.1).width).mergeStrokeStyle(Color.byName('Black', .3));
		const text = new Text(new Coord(0, 10), '');
		text.style.mergeTextAlign('right').mergeFillStyle(Color.byName('Black', .5));

		for (let x = scale; x < this.cnv.width; x += scale) { //? Vertical lines
			line.center = new Coord(x, this.center.y);
			line.render();
			text.center = new Coord(x-3, 10);
			text.content = parseFloat(x.toFixed(2)).toString();
			text.render();
		}

		line.points = [Coord.origin, new Coord(this.cnv.width, 0)];
		text.style.mergeTextAlign('left');

		for (let y = scale; y < this.cnv.height; y += scale) { //? Horizontal lines
			line.center = new Coord(this.center.x, y);
			line.center.x = this.center.x;
			line.render();
			text.center = new Coord(5, y-5);
			text.content = parseFloat(y.toFixed(2)).toString();
			text.render();
		}
		new Circle(this.center, 5).render();
	}

	static drawFunction(func: (x: number) => number, sampling = 1, scale = 50, color: Color = Color.byName('Black')) {
		const points: Coord[] = [];
		const style = Style.default().mergeStrokeStyle(color);

		for (let x = 0; x < this.cnv.width; x+= sampling) {
			points.push(new Coord(x, this.center.y - func(x/scale) * scale));
		}

		MainCanvas.draw(style, () => {
			MainCanvas.ctx.beginPath();
			MainCanvas.ctx.moveTo(points[0].x, points[0].y);
			points.forEach(point => {
				MainCanvas.ctx.lineTo(point.x, point.y);
			});
			MainCanvas.ctx.stroke();
		});
	}
	//#endregion Samples
}