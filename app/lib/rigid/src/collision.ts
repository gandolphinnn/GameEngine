import { className } from '@gandolphinnn/utils';
import { Coord } from '@gandolphinnn/graphics';
import { RigidBody, RigidCircle, RigidLine, RigidPoly, Vector } from '..';

type CollisionDetector = (body1: RigidBody, body2: RigidBody) => ECollisionResult;

export enum ECollisionResult {
	NoCollision,
	Overlap,
	InnerCollision,
	OuterCollision,
}

/**
 *
 */
export class Collision {

	/**
	 * The detailed result of the collision
	 */
	public result: ECollisionResult = ECollisionResult.NoCollision;

	/**
	 * The inner rigid body. Has values only if the bodies are one inside the other
	 */
	public innerRigidBody: RigidBody = null;
	/**
	 * The outer rigid body. Has values only if the bodies are one inside the other
	 */
	public outerRigidBody: RigidBody = null;

	/**
	 * The points of contact between the two bodies. Empty unless they are colliding and they are not overlapping
	 */
	public contacts: Coord[] = [];

	/**
	 * The center of the contact points. Null unless the two bodies are colliding
	 */
	public contactCenter: Coord = null;

	/**
	 * True if the two bodies are colliding in every possible way
	 */
	public get doCollide() {
		return this.result !== ECollisionResult.NoCollision;
	}

	public constructor(
		public rBody1: RigidBody,
		public rBody2: RigidBody,
	)
	{
		//* Same object check
		if (rBody1 === rBody2) {
			throw new Error('The two rigid bodies are the same object');
		}

		//* Get the bodies types and order them to avoid method repetition
		const orderedResolver = [
			{ type: this.parseClassType(rBody1), body: rBody1 },
			{ type: this.parseClassType(rBody2), body: rBody2 }
		].sort((a, b) => a.type.localeCompare(b.type));

		const collisionDetectorName = `${orderedResolver[0].type}${orderedResolver[1].type}`;

		switch (collisionDetectorName) {
			case 'CircleCircle':
				this.result = this.CircleCircle(
					orderedResolver[0].body as RigidCircle,
					orderedResolver[1].body as RigidCircle
				); break;
			case 'CircleLine':
				this.result = this.CircleLine(
					orderedResolver[0].body as RigidCircle,
					orderedResolver[1].body as RigidLine
				); break;
			case 'CirclePoly':
				this.result = this.CirclePoly(
					orderedResolver[0].body as RigidCircle,
					orderedResolver[1].body as RigidPoly
				); break;
			case 'LineLine':
				this.result = this.LineLine(
					orderedResolver[0].body as RigidLine,
					orderedResolver[1].body as RigidLine
				); break;
			case 'LinePoly':
				this.result = this.LinePoly(
					orderedResolver[0].body as RigidLine,
					orderedResolver[1].body as RigidPoly
				); break;
			case 'PolyPoly':
				this.result = this.PolyPoly(
					orderedResolver[0].body as RigidPoly,
					orderedResolver[1].body as RigidPoly
				); break;
			default: throw new Error(`Collision detection method not implemented for ${collisionDetectorName}`);
		}

		if (this.doCollide && this.contacts.length > 0)
		{
			this.contactCenter = Coord.center(...this.contacts);
		}
	}

	public snap(body: RigidBody) {
		if (this.contactCenter) {

		}
	}

	public bounce(body: RigidBody, bounceStrength: number = null) {
		if (this.contactCenter) { //TODO test this
			const newVector = Vector.fromAtoB(this.contactCenter, body.coord);
			newVector.strength = bounceStrength ?? body.vector.strength;
			body.vector = newVector;
		}
	}

	private parseClassType(body: RigidBody): 'Circle' | 'Line' | 'Poly' {
		const name = className(body);
		const classes = ['RigidCircle', 'RigidLine', 'RigidPoly'];
		if (classes.includes(name)) {
			return name.replace('Rigid', '') as 'Circle' | 'Line' | 'Poly';
		}
		if (body.constructor.prototype !== Object.prototype) {
			return this.parseClassType(Object.getPrototypeOf(body));
		}
		throw new Error(`Invalid rigid body type: ${name}`);
	}

//#region Collision detectors
	private CircleCircle(body1: RigidCircle, body2: RigidCircle): ECollisionResult {
		const distance = Coord.distance(body1.vector.coord, body2.vector.coord);
		const x1 = body1.coord.x, y1 = body1.coord.y, r1 = body1.radius;
		const x2 = body2.coord.x, y2 = body2.coord.y, r2 = body2.radius;

		//* No collision
		if (distance > r1 + r2) {
			return ECollisionResult.NoCollision;
		}


		//* Overlap check
		if (distance == 0 && r1 == r2) {
			return ECollisionResult.Overlap;
		}

		//* Calculate the points of contact
		const length = (r1**2 - r2**2 + distance**2) / (2*distance);
		const height = Math.sqrt(r1**2 - length**2);

		const lenDist = length / distance;
		const heiDist = height / distance;

		const contact1 = new Coord(lenDist * (x2 - x1) + heiDist * (y2 - y1) + x1, lenDist * (y2 - y1) - heiDist * (x2 - x1) + y1);
		const contact2 = new Coord(lenDist * (x2 - x1) - heiDist * (y2 - y1) + x1, lenDist * (y2 - y1) + heiDist * (x2 - x1) + y1);

		this.contacts.push(contact1);

		if (Coord.distance(contact1, contact2) > 0) {
			this.contacts.push(contact2);
		}

		//* Inside collision check
		if (distance < r1 - r2) {
			this.innerRigidBody = body2;
			this.outerRigidBody = body1;
			return ECollisionResult.InnerCollision;
		}
		if (distance < r2 - r1) {
			this.innerRigidBody = body1;
			this.outerRigidBody = body2;
			return ECollisionResult.InnerCollision;
		}

		return ECollisionResult.OuterCollision;
	}

	private CircleLine(body1: RigidCircle, body2: RigidLine): ECollisionResult {
		return ECollisionResult.NoCollision;
	}

	private CirclePoly(body1: RigidCircle, body2: RigidPoly): ECollisionResult {
		return ECollisionResult.NoCollision;
	}

	private LineLine(body1: RigidLine, body2: RigidLine): ECollisionResult {
		return ECollisionResult.NoCollision;
	}

	private LinePoly(body1: RigidLine, body2: RigidPoly): ECollisionResult {
		return ECollisionResult.NoCollision;
	}

	private PolyPoly(body1: RigidPoly, body2: RigidPoly): ECollisionResult {
		return ECollisionResult.NoCollision;
	}
//#endregion Collision detectors
}