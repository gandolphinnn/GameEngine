import { Angle, Circle, Coord, MainCanvas, Mesh, Poly } from "@gandolphinnn/graphics";
import { Collision, CollisionEvent, ERigidBodyEvent, LayerMask, OnCollisionEnter, RigidBody, RigidCircle, RigidPoly, Vector } from "@gandolphinnn/rigid";
import { GameObject } from "@gandolphinnn/game";
import { rand, rand0 } from "@gandolphinnn/utils";

class TestObject1Mesh extends Poly {
	constructor(
		points: Coord[]
	) {
		super(
			points
		)
	}
}

class TestObject1Body extends RigidPoly {
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

export class TestObject1 extends GameObject implements OnCollisionEnter {


	private _trail: Coord[] = [];

	get rigidCircle() { return this.rigidBody as RigidCircle }
	get radius() { return this.rigidCircle.radius }
	set radius(value: number) { this.rigidCircle.radius = value; (this.cnvElement as Circle).radius = value }

	constructor(
		points: Coord[]
	) {
		const center = MainCanvas.center.copy();
		super(
			new TestObject1Mesh(points),
			new TestObject1Body(center, points)
		)
		this.rigidBody.setLayerMask(LayerMask.get("Test"));
	}

	Start() {
		this.radius = rand(10, 20);
		this.angle.degrees = rand0(359);
		this.strength = rand(15, 80);
		console.log('start', this);
	}
	Update() {
		console.log('update');
		if (this.vectorCoord.x > MainCanvas.cnv.width - this.radius || this.vectorCoord.x < this.radius) {
			this.vector.bounce(new Angle(90));
		}
		if (this.vectorCoord.y > MainCanvas.cnv.height - this.radius || this.vectorCoord.y < this.radius) {
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