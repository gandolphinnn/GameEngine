import { rand, rand0 } from "@gandolphinnn/utils";
import { Coord, Circle, Angle, Mesh, MainCanvas, Time, POINT_DEFAULT, Color } from "@gandolphinnn/graphics";
import { RigidCirc, Vector, CollisionEvent, RigidBody, LayerMask } from "@gandolphinnn/rigid";
import { Game, GameObject } from ".";

class TestObject extends GameObject {

	private _trail: Coord[] = [];

	get radius() { return this.rigidCirc.radius }
	set radius(value: number) { this.rigidCirc.radius = value; (this.mesh.elements.first() as Circle).radius = value }

	constructor(
	) {
		//! The center MUST be the same object reference!!!
		const center = MainCanvas.center.copy();
		super([
			new RigidCirc(new Vector(center, new Angle(), 0), 10),
			new Mesh(center, [new Circle(center, 10)])
		])
	}

	start() {
		console.log('start');
		this.radius = rand(10, 20);
		this.vector.angle.degrees = rand0(359);
		this.vector.strength = rand(15, 80);
	}
	update() {
		console.log('update');
		if (this.vector.vectorCoord.x > MainCanvas.cnv.width - this.radius || this.vector.vectorCoord.x < this.radius) {
			this.vector.bounce(new Angle(90));
		}
		if (this.vector.vectorCoord.y > MainCanvas.cnv.height - this.radius || this.vector.vectorCoord.y < this.radius) {
			this.vector.bounce(new Angle(0));
		}
		this._trail.push(this.rigidCirc.center.copy());
		if (this._trail.length > 25) {
			this._trail.shift();
		}
		this._trail.forEach(p => {
			MainCanvas.drawPoint(p);
		});
		
	}
	onCollisionEnter: CollisionEvent = (other: RigidBody) => {
		console.log('onCollisionEnter', other);
	}
}
Game.start = () => {
	POINT_DEFAULT.radius = 5;
	POINT_DEFAULT.setFillStyle(Color.byName("Red"));

	//* For now limit to 1 object to test the correct order of the events
	for (let i = 0; i < 1; i++) {
		new TestObject();
	}
}