import { rand, rand0 } from "@gandolphinnn/utils";
import { Coord, Circle, Angle, Mesh, MainCanvas, Time, POINT_DEFAULT, Color } from "../graphics/index.js";
import { RigidCirc, Vector, CollisionEvent, RigidBody, LayerMask } from "../rigid/index.js";
import { Game, GameObject } from ".";

class TestObject extends GameObject {

	private _trail: Coord[] = [];

	get radius() { return this.rigidCirc.radius }
	set radius(value: number) { this.rigidCirc.radius = value; (this.mesh.elements.first() as Circle).radius = value }

	constructor(
		center: Coord,
		radius: number,
		angle: Angle,
		strength: number
	) {
		super([
			new RigidCirc(new Vector(center, angle, strength), radius),
			new Mesh(center, new Circle(center, radius))
		])
	}

	start() {
		this.radius = rand(20, 30);
		this.vector.angle.degrees = rand0(359);
		this.vector.strength = rand(15, 80);
		super.start();
	}
	update() {
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
		
		super.update();
	}
	onCollisionEnter: CollisionEvent = (other: RigidBody) => {
		console.log('onCollisionEnter', other);
	}
}
Game.start = () => {
	POINT_DEFAULT.radius = 5;
	POINT_DEFAULT.setFillStyle(Color.byName("Red"));
	for (let i = 0; i < 1; i++) {
		new TestObject(MainCanvas.center.copy(), 10, new Angle(), 0);
	}
}
Game.start();