import { AppSettings } from '@gandolphinnn/shared'
import { Coord, Angle, Line, Color, Time } from '@gandolphinnn/graphics'

export class Vector {
	get forward() { return new Vector(this.coord, this.angle, this.strength) }
	get backward() { return new Vector(this.coord, new Angle(this.angle.degrees + 180), this.strength) }
	get leftward() { return new Vector(this.coord, new Angle(this.angle.degrees - 90), this.strength) }
	get rightward() { return new Vector(this.coord, new Angle(this.angle.degrees + 90), this.strength) }

	/**
	 * Get the vector's coordinate in the next fixed update
	 */
	get fixedCoord() {
		return new Coord(
			this.coord.x + this.angle.cos * this.strength,
			this.coord.y + this.angle.sin * this.strength
		)
	}
	
	/**
	 * Get the vector's coordinate in the next frame
	 */
	get updateCoord() {
		return new Coord(
			this.coord.x + this.angle.cos * (this.strength / AppSettings.VECTOR_STRENGTH_PIXEL_RATIO) * (Time.deltaTime * AppSettings.DELTATIME_MULTIPLIER),
			this.coord.y + this.angle.sin * (this.strength / AppSettings.VECTOR_STRENGTH_PIXEL_RATIO) * (Time.deltaTime * AppSettings.DELTATIME_MULTIPLIER)
		)
	}
	
	constructor(
		public coord: Coord,
		public angle: Angle,
		public strength = 0
	) {
		this.coord = coord;
		this.angle = angle;
		this.strength = strength;
	}

	/**
	 * Add another vector to this one
	 */
	impulse(vector: Vector) {

	}

	/**
	 * Move the vector to its next frame position
	 */
	advance() {
		this.coord.x = this.updateCoord.x;
		this.coord.y = this.updateCoord.y;
		return this;
	}
	/**
	 * Make the vector bounce off a surface. An horizontal surface will have a 0° angle.
	 * @param bounceAngle The angle of the surface. The vector will bounce off symmetrically.
	 */
	bounce(bounceAngle: Angle) {
		this.angle.degrees = bounceAngle.degrees * 2 - this.angle.degrees;
		return this;
	}

	/**
	 * Render the vector on the canvas as a line.
	 * Is intended to be used mainly during debug.
	 */
	render(ignoreDT = true, color = Color.default()) {
		const vectorCoord = ignoreDT? this.fixedCoord : this.updateCoord;
		new Line([this.coord, vectorCoord])
			.mergeStrokeStyle(color)
			.render();
	}

	/**
	 * Render the vector on the canvas as an arrow.
	 * Is intended to be used mainly during debug.
	 */
	renderArrow(ignoreDT = true, color = Color.default()) {
		this.render(ignoreDT, color);

		const vectorCoord = ignoreDT? this.fixedCoord : this.updateCoord;
		let headAngle1 = new Angle(this.angle.degrees +180 + AppSettings.VECTOR_ARROW_HEAD_ANGLE);
		new Line([vectorCoord, new Coord(
			vectorCoord.x + headAngle1.cos * AppSettings.DEBUG_VECTOR_ARROW_HEAD_LENGTH,
			vectorCoord.y + headAngle1.sin * AppSettings.DEBUG_VECTOR_ARROW_HEAD_LENGTH
		)]).mergeStrokeStyle(color)
			.render();
			
		let headAngle2 = new Angle(this.angle.degrees + 180 - AppSettings.VECTOR_ARROW_HEAD_ANGLE);
		new Line([vectorCoord, new Coord(
			vectorCoord.x + headAngle2.cos * AppSettings.DEBUG_VECTOR_ARROW_HEAD_LENGTH,
			vectorCoord.y + headAngle2.sin * AppSettings.DEBUG_VECTOR_ARROW_HEAD_LENGTH
		)]).mergeStrokeStyle(color)
			.render();
	}

	static up(coord = Coord.origin, strength = 0) { return new Vector(coord, Angle.up(), strength) }
	static down(coord = Coord.origin, strength = 0) { return new Vector(coord, Angle.down(), strength) }
	static left(coord = Coord.origin, strength = 0) { return new Vector(coord, Angle.left(), strength) }
	static right(coord = Coord.origin, strength = 0) { return new Vector(coord, Angle.right(), strength) }
	static random(strenth = 0) { return new Vector(Coord.random(), Angle.random(), strenth) }

	/**
	 * Get the sum of all vectors
	 */

	static fromAtoB(coordA: Coord, coordB: Coord) {
		const difference = Coord.difference(coordA, coordB);
		const angle = new Angle(Math.atan2(difference.y, difference.x) * 180 / Math.PI);
		const strength = Coord.distance(coordA, coordB);
		return new Vector(coordA, angle, strength);
	}
}