import { Angle, Coord } from '@gandolphinnn/graphics'

export class Impulse {
	
//#region Directional getters
	/**
	 * Get another impulse that goes forward from this one
	 */
	get forward() { return new Impulse(this.angle, this.strength) }
	/**
	 * Get another impulse that goes backward from this one
	 */
	get backward() { return new Impulse(new Angle(this.angle.degrees + 180), this.strength) }
	/**
	 * Get another impulse that goes leftward from this one
	 */
	get leftward() { return new Impulse(new Angle(this.angle.degrees - 90), this.strength) }
	/**
	 * Get another impulse that goes rightward from this one
	 */
	get rightward() { return new Impulse(new Angle(this.angle.degrees + 90), this.strength) }
//#endregion Directional getters

	constructor(
		public angle: Angle,
		public strength = 0
	) {
	}

	/**
	 * Add another impulse to this one
	 */
	addImpulse(impulse: Impulse) {
		this.angle.degrees = Angle.average(this.angle, impulse.angle).degrees;
		this.strength += impulse.strength;
		return this;
	}
	
	/**
	 * Make the impulse bounce off a surface. An horizontal surface will have a 0° angle.
	 * @param bounceAngle The angle of the surface. The vector will bounce off symmetrically.
	 */
	bounce(bounceAngle: Angle) {
		this.angle.degrees = bounceAngle.degrees * 2 - this.angle.degrees;
		return this;
	}

	static up(strength = 0)		{ return new Impulse(Angle.up(), strength) }
	static down(strength = 0)	{ return new Impulse(Angle.down(), strength) }
	static left(strength = 0)	{ return new Impulse(Angle.left(), strength) }
	static right(strength = 0)	{ return new Impulse(Angle.right(), strength) }
	static random(strenth = 0)	{ return new Impulse(Angle.random(), strenth) }

	/**
	 * Get the sum of all impulses
	 */
	static sum(...impulses: Impulse[]): Impulse {
		let x = 0, y = 0;

		for (const impulse of impulses) {
			x += impulse.angle.cos * impulse.strength;
			y += impulse.angle.sin * impulse.strength;
		}

		return new Impulse(
			new Angle(Math.atan2(y, x), 'Radian'), 
			Math.sqrt(x ** 2 + y ** 2)
		);
	}

	/**
	 * Get the impulse needed to go from coordA to coordB
	 */
	static fromAtoB(coordA: Coord, coordB: Coord) {
		const difference = Coord.difference(coordA, coordB);
		const angle = new Angle(Math.atan2(difference.y, difference.x) * 180 / Math.PI);
		const strength = Coord.distance(coordA, coordB);
		return new Impulse(angle, strength);
	}
}