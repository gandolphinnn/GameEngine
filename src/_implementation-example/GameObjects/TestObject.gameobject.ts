import { Coord, Mesh, Poly } from "@gandolphinnn/graphics";
import { CollisionEvent, OnCollisionEnter, RigidBody, RigidPoly, Vector } from "@gandolphinnn/rigid";
import { GameObject } from "@gandolphinnn/game";

class PolygonTestObjectMesh extends Mesh {
	constructor(
		center: Coord,
		points: Coord[]
	) {
		super(
			center,
			[
				new Poly(points)
			]
		)
	}
}

//TODO add a decorator, e.g. @RigidEventSubscription([ERigidBodyEvent.onCollisionEnter]), to chose which events to subscribe to
class PolygonTestObjectBody extends RigidPoly {
	constructor(
		center: Coord,
		points: Coord[]
	) {
		super(
			Vector.down(center),
			points
		)
	}
}

export class PolygonTestObject extends GameObject implements OnCollisionEnter {

	constructor(
		center: Coord,
		points: Coord[]
	) {
		super([
			new PolygonTestObjectMesh(center, points),
			new PolygonTestObjectBody(center, points)
		])
	}

	start() {
	}
	update() {
	}
	onCollisionEnter: CollisionEvent = (other: RigidBody) => {
	}
}