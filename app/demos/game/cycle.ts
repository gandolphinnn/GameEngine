import { Angle, Circle, Color, Coord, MainCanvas, RenderAction } from '@gandolphinnn/graphics';
import { Collision, CollisionEvent, LayerMask, OnCollisionEnter, RigidCircle, Vector } from '@gandolphinnn/rigid';
import { GameObject } from '@gandolphinnn/game';
import { Time } from '@gandolphinnn/shared';
import { BtnState, Input } from '@gandolphinnn/inputs';

class TestObject2Mesh extends Circle {
	constructor(
		center: Coord,
		radius: number
	) {
		super(
			center,
			radius
		);
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
		);
	}
}

class CycleObject extends GameObject {
	private pastTS: number = null;
	private pastFixedTS: number = null;

	private delays: number[] = [];
	private delaysFixed: number[] = [];

	get rigidCircle() { return this.rigidBody as RigidCircle; }
	get radius() { return this.rigidCircle.radius; }
	set radius(value: number) { this.rigidCircle.radius = value; (this.cnvElement as Circle).radius = value; }

	constructor() {
		const radius = 1;
		const vector = Vector.random();
		super(
			new TestObject2Mesh(vector.coord, 1),
			new TestObject2Body(vector, radius)
		);
		this.rigidBody.setLayerMask(LayerMask.get('Test'));
	}

	Start(): void {
		console.log(Time.fixedUpdateDelay);
	}

	Update() {
		const ts = this.GetTimeStamp();
		console.log('Update', ts);
		if (this.pastTS) {
			this.delays.push(ts - this.pastTS);
		}
		this.pastTS = ts;

		if (Input.btnState(0) == BtnState.Down) {
			Time.Stop();
		}
	}

	FixedUpdate(): void {
		const ts = this.GetTimeStamp();
		console.log('FixedUpdate', ts);
		if (this.pastFixedTS) {
			this.delaysFixed.push(ts - this.pastFixedTS);
		}
		this.pastFixedTS = ts;
	}

	Stop(): void {
		const mean = this.delays.reduce((acc, curr) => acc + curr, 0) / this.delays.length;
		const meanFixed = this.delaysFixed.reduce((acc, curr) => acc + curr, 0) / this.delaysFixed.length;
		console.log('Mean delay:', mean, 'Mean fixed delay:', meanFixed);
	}

	GetTimeStamp() {
		return Date.now();
	}
}

export function CycleDemo() {
	new CycleObject();
}