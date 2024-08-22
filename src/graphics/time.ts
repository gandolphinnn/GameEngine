import { Color, Coord, Text } from "./index";

type KeyOfTime = Exclude<keyof typeof Time, "prototype" | "update" | "logData" | "showData">;

const TO_SHOW: KeyOfTime[] = [
	'deltaTime',
	'timeScale',
	'timestamp',
	'fps',
]

export class Time {
	/**
	 * The time difference between the current frame and the previous frame.
	 * Multiply to this to get consistent results across different frame rates.
	 */
	static deltaTime: number = 0;

	/**
	 * The time scale factor. Modify this to slow down or speed up time.
	 */
	static timeScale: number = 1;

	/**
	 * The timestamp of the previous frame.
	 */
	static lastFrameTime: number = 0;

	/**
	 * The timestamp of the current frame.
	 */
	static timestamp: number = 0;

	/**
	 * The total number of frames rendered.
	 */
	static frameCount: number = 0;

	/**
	 * The frames per second (FPS) value.
	 */
	static fps: number = 0;

	/**
	 * The time interval between FPS updates.
	 */
	static fpsInterval: number = 0;

	/**
	 * The timestamp of the last FPS update.
	 */
	static fpsTime: number = 0;

	/**
	 * The number of frames rendered since the last FPS update.
	 */
	static fpsCount: number = 0;

	/**
	 * The interval in milliseconds at which FPS updates should occur.
	 */
	static fpsUpdateInterval: number = 500;

	/**
	 * The number of FPS updates that have occurred.
	 */
	static fpsUpdateCount: number = 0;

	/**
	 * Updates the time-related properties.
	 */
	static update(timestamp: DOMHighResTimeStamp) {
		this.timestamp = timestamp;
		this.deltaTime = (this.timestamp - this.lastFrameTime) / 1000 * this.timeScale;
		this.lastFrameTime = this.timestamp;
		this.frameCount++;
		this.fpsCount++;
		this.fpsInterval = this.timestamp - this.fpsTime;
		
		//? Update the FPS value if the time interval is greater than the update interval
		if (this.fpsInterval > this.fpsUpdateInterval) {
			this.fps = Math.round(this.fpsCount / (this.fpsInterval / 1000));
			this.fpsTime = this.timestamp;
			this.fpsCount = 0;
			this.fpsUpdateCount++;
		}
	}
	static logData(toShow: KeyOfTime[] = TO_SHOW) {
		console.table({
			...toShow.reduce((acc: any, prop) => {
				const asAny = this as any;
				if (typeof asAny[prop] === 'function') return acc;

				acc[prop] = parseFloat(asAny[prop].toFixed(4));
				return acc;
			}, {})
		});
	}
	static showData(toShow: KeyOfTime[] = TO_SHOW) {
		const t = new Text(new Coord(5, 0), '');
		t.style.mergeTextAlign('left').mergeFont('12px Arial').mergeFillStyle(Color.byName('Black'));
		toShow.forEach(prop => {
			const asAny = this as any;
			if (typeof asAny[prop] === 'function') return;
			t.content = `${prop}: ${parseFloat(asAny[prop].toFixed(4))}`;
			t.moveBy(0, 15);
			t.render();
		});
	}
}