import { CollisionEvent, RigidBody } from "@gandolphinnn/rigid";
import { GameObject } from "@gandolphinnn/game";

export  class TestObject extends GameObject {

	constructor(
	) {
		super([
		])
	}

	start() {
	}
	update() {
	}
	onCollisionEnter: CollisionEvent = (other: RigidBody) => {
	}
}