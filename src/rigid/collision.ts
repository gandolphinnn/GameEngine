import { Coord } from "@gandolphinnn/graphics";
import { RigidBody, RigidCircle, RigidLine, RigidPoly } from ".";
import { className } from "@gandolphinnn/utils";

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
	result: ECollisionResult = ECollisionResult.NoCollision;
	
	/**
	 * The inner rigid body. Has values only if the bodies are one inside the other
	 */
	innerRigidBody: RigidBody = null;
	/**
	 * The outer rigid body. Has values only if the bodies are one inside the other
	 */
	outerRigidBody: RigidBody = null;

	/**
	 * The points of contact between the two bodies. Empty unless they are colliding and they are not overlapping
	 */
	contacts: Coord[] = [];

	/**
	 * True if the two bodies are colliding in every possible way
	 */
	get doCollide() {
		return this.result !== ECollisionResult.NoCollision;
	}

	constructor(
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
			{ type: this.extractClassType(rBody1), body: rBody1 },
			{ type: this.extractClassType(rBody2), body: rBody2 }
		].sort((a, b) => a.type.localeCompare(b.type));

		const collisionDetectorName = `${orderedResolver[0].type}_${orderedResolver[1].type}`;
		
		const thisAsAny = this as any;
		if (typeof thisAsAny[collisionDetectorName] !== 'function') {
			throw new Error(`Collision detection method not implemented for ${collisionDetectorName}`);
		}

		const collisionDetector = thisAsAny[collisionDetectorName] as CollisionDetector;
		this.result = collisionDetector(orderedResolver[0].body, orderedResolver[1].body);
	}

	private extractClassType(body: RigidBody) {
		return className(body).replace('Rigid', '') as 'Circle' | 'Line' | 'Poly';
	}

//#region Collision detectors
	private Circle_Circle: CollisionDetector = (body1: RigidCircle, body2: RigidCircle): ECollisionResult => {
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
		const distanceX = distance*(x2-x1);
		const distanceY = distance*(y2-y1);

		const contact1 = new Coord(length / distanceX + height /distanceY + x1, length / distanceY - height / distanceX + y1);
		const contact2 = new Coord(length / distanceX - height /distanceY + x1, length / distanceY + height / distanceX + y1);
		
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

	private Circle_Line: CollisionDetector = (body1: RigidCircle, body2: RigidLine): ECollisionResult => {
		return ECollisionResult.NoCollision;
	}

	private Circle_Poly: CollisionDetector = (body1: RigidCircle, body2: RigidPoly): ECollisionResult => {
		return ECollisionResult.NoCollision;
	}

	private Line_Line: CollisionDetector = (body1: RigidLine, body2: RigidLine): ECollisionResult => {
		return ECollisionResult.NoCollision;
	}

	private Line_Poly: CollisionDetector = (body1: RigidLine, body2: RigidPoly): ECollisionResult => {
		return ECollisionResult.NoCollision;
	}

	private Poly_Poly: CollisionDetector = (body1: RigidPoly, body2: RigidPoly): ECollisionResult => {
		return ECollisionResult.NoCollision;
	}
//#endregion Collision detectors
}