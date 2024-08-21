import { rand, rand0 } from "@gandolphinnn/utils";
import { Coord, Circle, Angle, Mesh, MainCanvas, POINT_DEFAULT, Color, RenderAction } from "@gandolphinnn/graphics";
import { RigidCircle, Vector, CollisionEvent, Collision, LayerMask, OnCollisionEnter, OnCollisionStay, OnCollisionLeave } from "@gandolphinnn/rigid";
import { Game, GameObject } from ".";

class TestObject extends GameObject implements OnCollisionEnter, OnCollisionStay, OnCollisionLeave {

	get rigidCircle() { return this.rigidBody as RigidCircle }
	get radius() { return this.rigidCircle.radius }
	set radius(value: number) { this.rigidCircle.radius = value; (this.mesh.elements.first() as Circle).radius = value }

	constructor(
		radius: number,
		vector: Vector
	) {
		super(
			new Mesh(vector.coord, [new Circle(vector.coord, radius).setAction(RenderAction.Stroke)]),
			new RigidCircle(vector, radius)
		)
		this.rigidBody.setLayerMask(new LayerMask("Test"));
	}

	update() {
		if (this.vector.vectorCoord.x > MainCanvas.cnv.width - this.radius || this.vector.vectorCoord.x < this.radius) {
			this.vector.bounce(new Angle(90));
		}
		if (this.vector.vectorCoord.y > MainCanvas.cnv.height - this.radius || this.vector.vectorCoord.y < this.radius) {
			this.vector.bounce(new Angle(0));
		}
	}
	onCollisionEnter: CollisionEvent = (collision: Collision) => {
		console.log('onCollisionEnter', collision);
		this.drawCollision(collision);
	}
	onCollisionStay: CollisionEvent = (collision: Collision) => {
		console.log('onCollisionStay', collision);
		this.drawCollision(collision);
	}
	onCollisionLeave: CollisionEvent = (collision: Collision) => {
		console.log('onCollisionLeave', collision);
		this.drawCollision(collision);
	}
	private drawCollision(collision: Collision) {
		collision.contacts.forEach(p => {
			MainCanvas.drawPoint(p);
		});
	}
}
Game.start = () => {
	new TestObject(50, Vector.down(new Coord(800, 200), 10));
	new TestObject(100, Vector.down(new Coord(800, 500)));
	const gos = GameObject.gameObjects
	console.log(gos)
	console.log(LayerMask.layerMasks)
	console.log(gos[0].rigidBody.layerMask == gos[1].rigidBody.layerMask)
	console.log()
}