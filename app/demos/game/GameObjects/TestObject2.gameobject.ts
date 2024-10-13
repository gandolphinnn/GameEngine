import { Angle, Circle, Color, Coord, MainCanvas, RenderAction } from "@gandolphinnn/graphics";
import { Collision, CollisionEvent, LayerMask, OnCollisionEnter, RigidCircle, Vector } from "@gandolphinnn/rigid";
import { GameObject } from "@gandolphinnn/game";

class TestObject2Mesh extends Circle {
	constructor(
		center: Coord,
		radius: number
	) {
		super(
			center,
			radius
		)
		this.setAction(RenderAction.Fill).setFillStyle(Color.random());
	}
}

class TestObject2Body extends RigidCircle {
	constructor(
		vector: Vector,
		radius: number,
		mass = 0
	) {
		super(
			vector,
			radius,
			mass
		)
	}
}

export class TestObject2 extends GameObject implements OnCollisionEnter {

	get rigidCircle() { return this.rigidBody as RigidCircle }
	get radius() { return this.rigidCircle.radius }
	set radius(value: number) { this.rigidCircle.radius = value; (this.cnvElement as Circle).radius = value }

	constructor(
		radius: number,
		vector: Vector,
		private ignoreColl = false
	) {
		super(
			new TestObject2Mesh(vector.coord, radius),
			new TestObject2Body(vector, radius)
		)
		this.rigidBody.setLayerMask(LayerMask.get("Test"));
	}

	Update() {
		if (this.vector.updateCoord.x > MainCanvas.cnv.width - this.radius || this.vector.updateCoord.x < this.radius) {
			this.vector.bounce(new Angle(90));
		}
		if (this.vector.updateCoord.y > MainCanvas.cnv.height - this.radius || this.vector.updateCoord.y < this.radius) {
			this.vector.bounce(new Angle(0));
		}
	}
	onCollisionEnter: CollisionEvent = (collision: Collision) => {
		this.drawCollision(collision);
		this.bounceOffSurface(collision);
	}
	/* onCollisionStay: CollisionEvent = (collision: Collision) => {
		this.drawCollision(collision);
	}
	onCollisionLeave: CollisionEvent = (collision: Collision) => {
		this.drawCollision(collision);
	} */

	private bounceOffSurface(collision: Collision) {
		const collisionCenter = Coord.center(...collision.contacts);
		const angle = Vector.fromAtoB(this.vector.coord, collisionCenter).angle;
		if (Number.isNaN(angle.degrees)) return;
		angle.degrees += 90;
		this.vector.bounce(angle);
		this.cnvElement.setFillStyle(Color.random());
	}

	private drawCollision(collision: Collision) {
		collision.contacts.forEach(p => {
			p.render();
		});
		/* if (collision.innerRigidBody && collision.innerRigidBody === this.rigidBody) {
			this.cnvElement.setAction(RenderAction.Fill);
		}
		else {
			this.cnvElement.setAction(RenderAction.Stroke);
		} */
	}
}