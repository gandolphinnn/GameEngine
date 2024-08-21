import { overflow, rand0 } from "@gandolphinnn/utils";

/**
 * Angle starts from a line going horizontally right from the center, and proceeds clockwise.
 */
export class Angle {
	private _degrees: number;
	get degrees() { return this._degrees; }
	set degrees(alpha: number) {
		this._degrees = alpha;
		this.normalize()
	}

	private _radians: number;
	get radians() { return this._radians; }
	set radians(alpha: number) {
		this._radians = alpha;
		this._degrees = this._radians * 180 / Math.PI; //? First i must convert to degrees
		this.normalize()
	}

	constructor(alpha: number = 0, type: 'Degree' | 'Radian' = 'Degree') {
		if (type == 'Degree')
			this.degrees = alpha;
		else
			this.radians = alpha;
	}

	private normalize() {
		this._degrees = overflow(this._degrees, 0, 359) //? Set degr to a 0 -> 360 range
		this._radians = this._degrees * Math.PI / 180; //? Convert to radians
	}
	
	get sin()	{ return Math.sin(this._radians) }
	get cos()	{ return Math.cos(this._radians) }
	get tan()	{ return Math.tan(this._radians) }
	get asin()	{ return Math.asin(this._radians) }
	get acos()	{ return Math.acos(this._radians) }
	get atan()	{ return Math.atan(this._radians) }
	get sinh()	{ return Math.sinh(this._radians) }
	get cosh()	{ return Math.cosh(this._radians) }
	get tanh()	{ return Math.tanh(this._radians) }
	get asinh()	{ return Math.asinh(this._radians) }
	get acosh()	{ return Math.acosh(this._radians) }
	get atanh()	{ return Math.atanh(this._radians) }

	static right()	{ return new Angle(0) }
	static down()	{ return new Angle(90) }
	static left()	{ return new Angle(180) }
	static up()		{ return new Angle(270) }
	static random() { return new Angle(rand0(359)) }
}