import { rand, rand0 } from "@gandolphinnn/utils";
import { Coord, Circle, Angle, Mesh, MainCanvas, POINT_DEFAULT, Color, RenderAction } from "@gandolphinnn/graphics";
import { RigidCircle, Vector, CollisionEvent, Collision, LayerMask, OnCollisionEnter, OnCollisionStay, OnCollisionLeave } from "@gandolphinnn/rigid";
import { Game, GameObject } from ".";

class TestObject extends GameObject implements OnCollisionEnter, OnCollisionStay, OnCollisionLeave {

	get rigidCircle() { return this.rigidBody as RigidCircle }
	get radius() { return this.rigidCircle.radius }
	set radius(value: number) { this.rigidCircle.radius = value; (this.cnvElement as Circle).radius = value }

	constructor(
		radius: number,
		vector: Vector,
		private ignoreColl = false
	) {
		super(
			new Circle(vector.coord, radius).setAction(RenderAction.Stroke).setFillStyle(Color.byName('Red')),
			new RigidCircle(vector, radius)
		)
		this.rigidBody.setLayerMask(LayerMask.get("Test"));
	}

	Update() {
		/* if (this.vector.vectorCoord.x > MainCanvas.cnv.width - this.radius || this.vector.vectorCoord.x < this.radius) {
			this.vector.bounce(new Angle(90));
		}
		if (this.vector.vectorCoord.y > MainCanvas.cnv.height - this.radius || this.vector.vectorCoord.y < this.radius) {
			this.vector.bounce(new Angle(0));
		} */
	}
	onCollisionEnter: CollisionEvent = (collision: Collision) => {
		if (this.ignoreColl) return;

		this.drawCollision(collision);
	}
	onCollisionStay: CollisionEvent = (collision: Collision) => {
		if (this.ignoreColl) return;

		this.drawCollision(collision);
	}
	onCollisionLeave: CollisionEvent = (collision: Collision) => {
		if (this.ignoreColl) return;

		this.drawCollision(collision);
	}
	private drawCollision(collision: Collision) {
		collision.contacts.forEach(p => {
			MainCanvas.drawPoint(p);
		});
		if (collision.innerRigidBody && collision.innerRigidBody === this.rigidBody) {
			this.cnvElement.setAction(RenderAction.Fill);
		}
		else {
			this.cnvElement.setAction(RenderAction.Stroke);
		}
	}
}
Game.start = () => {
	/* for (let i = 0; i < 100; i++) {
		const radius = rand(20, 70);
		const strength = rand(3, 8);
		new TestObject(radius, Vector.random(strength));
	} */
	new TestObject(50, Vector.down(new Coord(800, 200), 5));
	new TestObject(100, Vector.down(new Coord(800, 500)), true);
}