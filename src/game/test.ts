import { rand, rand0 } from "@gandolphinnn/utils";
import { Coord, Circle, Angle, Mesh, MainCanvas, POINT_DEFAULT, Color } from "@gandolphinnn/graphics";
import { RigidCircle, Vector, CollisionEvent, Collision, LayerMask } from "@gandolphinnn/rigid";
import { Game, GameObject } from ".";

class TestObject extends GameObject {

	private _trail: Coord[] = [];

	get rigidCircle() { return this.rigidBody as RigidCircle }
	get radius() { return this.rigidCircle.radius }
	set radius(value: number) { this.rigidCircle.radius = value; (this.mesh.elements.first() as Circle).radius = value }

	constructor(
	) {
		//! The center MUST be the same object reference!!!
		const center = MainCanvas.center.copy();
		super(
			new Mesh(center, [new Circle(center, 10)]),
			new RigidCircle(new Vector(center, new Angle(), 0), 10)
		)
		this.rigidBody.setLayerMask(LayerMask.getByName("Test"));
	}

	start() {
		this.radius = rand(10, 20);
		this.vector.angle.degrees = rand0(359);
		this.vector.strength = rand(15, 80);
		//console.log('start', this);
	}
	update() {
		//console.log('update');
		if (this.vector.vectorCoord.x > MainCanvas.cnv.width - this.radius || this.vector.vectorCoord.x < this.radius) {
			this.vector.bounce(new Angle(90));
		}
		if (this.vector.vectorCoord.y > MainCanvas.cnv.height - this.radius || this.vector.vectorCoord.y < this.radius) {
			this.vector.bounce(new Angle(0));
		}
		this._trail.push(this.rigidCircle.center.copy());
		if (this._trail.length > 25) {
			this._trail.shift();
		}
		this._trail.forEach(p => {
			MainCanvas.drawPoint(p);
		});
		
	}
	onCollisionEnter: CollisionEvent = (collision: Collision) => {
		console.log('onCollisionEnter', collision);
	}
}
Game.start = () => {
	POINT_DEFAULT.radius = 5;
	POINT_DEFAULT.setFillStyle(Color.byName("Red"));

	//* For now limit to 1 object to test the correct order of the events
	for (let i = 0; i < 100; i++) {
		new TestObject();
	}
}