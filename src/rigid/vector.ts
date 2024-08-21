import { Coord, Angle, Line, Color, Time } from '@gandolphinnn/graphics'

export const VECTOR_ARROW_HEAD_LENGTH = 10;
export const VECTOR_ARROW_HEAD_ANGLE = 30;
/**
 * X VectorStrength = 1 Pixel
 */
export const VECTOR_STRENGTH_PIXEL_RATIO = 10;
export const DELTATIME_MULTIPLIER = 100;

export class Vector {
	get forward() { return new Vector(this.coord, this.angle, this.strength) }
	get backward() { return new Vector(this.coord, new Angle(this.angle.degrees + 180), this.strength) }
	get leftward() { return new Vector(this.coord, new Angle(this.angle.degrees - 90), this.strength) }
	get rightward() { return new Vector(this.coord, new Angle(this.angle.degrees + 90), this.strength) }

	/**
	 * Get the vector's coordinate in the next frame
	 */
	get vectorCoord() {
		return new Coord(
			this.coord.x + this.angle.cos * (this.strength / VECTOR_STRENGTH_PIXEL_RATIO) * (Time.deltaTime * DELTATIME_MULTIPLIER),
			this.coord.y + this.angle.sin * (this.strength / VECTOR_STRENGTH_PIXEL_RATIO) * (Time.deltaTime * DELTATIME_MULTIPLIER)
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
	 * Move the vector to its next frame position
	 */
	advance() {
		this.coord.x = this.vectorCoord.x;
		this.coord.y = this.vectorCoord.y;
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
	 * Render the vector on the canvas as an arrow.
	 * Is intended to be used mainly during debug.
	 */
	render(color = Color.default()) {
		const vectorCoord = this.vectorCoord;
		const arrowBody = new Line([this.coord, vectorCoord]);
		arrowBody.style.mergeStrokeStyle(color);
		arrowBody.render();
		let headAngle1 = new Angle(this.angle.degrees +180 + VECTOR_ARROW_HEAD_ANGLE);
		const arrowHead1 = new Line([vectorCoord, new Coord(
			vectorCoord.x + headAngle1.cos * VECTOR_ARROW_HEAD_LENGTH,
			vectorCoord.y + headAngle1.sin * VECTOR_ARROW_HEAD_LENGTH
		)]);
		arrowHead1.style.mergeStrokeStyle(color);
		arrowHead1.render();
		let headAngle2 = new Angle(this.angle.degrees + 180 - VECTOR_ARROW_HEAD_ANGLE);
		const arrowHead2 = new Line([vectorCoord, new Coord(
			vectorCoord.x + headAngle2.cos * VECTOR_ARROW_HEAD_LENGTH,
			vectorCoord.y + headAngle2.sin * VECTOR_ARROW_HEAD_LENGTH
		)]);
		arrowHead2.style.mergeStrokeStyle(color);
		arrowHead2.render();
	}

	static up(coord = Coord.origin, strength = 0) { return new Vector(coord, Angle.up(), strength) }
	static down(coord = Coord.origin, strength = 0) { return new Vector(coord, Angle.down(), strength) }
	static left(coord = Coord.origin, strength = 0) { return new Vector(coord, Angle.left(), strength) }
	static right(coord = Coord.origin, strength = 0) { return new Vector(coord, Angle.right(), strength) }

	/**
	 * Get the sum of all vectors
	 */
	static sum(...vectors: Vector[]): Vector {
		throw new Error('Not implemented');
		return Vector.up(); //TODO
	}

	//! Copilot code, to be checked
	static fromAtoB(coordA: Coord, coordB: Coord) {
		const angle = new Angle(Math.atan2(coordB.y - coordA.y, coordB.x - coordA.x) * 180 / Math.PI);
		const strength = Coord.distance(coordA, coordB);
		return new Vector(coordA, angle, strength);
	}
}