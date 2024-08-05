import { CollisionEvent, LayerMask, MouseCollisionEvent, RigidBody, RigidCirc, Vector } from './index.js';
import { rand, rand0 } from '@gandolphinnn/utils';
import { Coord, Angle, Line, Circle, MainCanvas, Color, Text, Time, Component, Mesh, POINT_DEFAULT } from '@gandolphinnn/graphics2';
import { BtnState, Input } from '@gandolphinnn/inputs';

class GameObject {

	onMouseEnter: MouseCollisionEvent;
	onMouseLeave: MouseCollisionEvent;
	onClick: MouseCollisionEvent;
	onCollisionEnter: CollisionEvent;
	onCollisionLeave: CollisionEvent;
	
	get mesh() { return this.components.find(c => c instanceof Mesh) as Mesh }
	get rigidBody() { return this.components.find(c => c instanceof RigidBody) as RigidBody }
	get vector() { return this.rigidBody.vector as Vector }
	get rigidCirc() { return this.rigidBody as RigidCirc }

	protected constructor(
		public components: Component[]
	) {
		GameObject._gameObjects.push(this);
		this.onMouseEnter = this.rigidBody.onMouseEnter;
		this.onMouseLeave = this.rigidBody.onMouseLeave;
		this.onClick = this.rigidBody.onClick;
		this.onCollisionEnter = this.rigidBody.onCollisionEnter;
		this.onCollisionLeave = this.rigidBody.onCollisionLeave;
	}

	start() {
		this.components.forEach(c => {
			if (typeof c.start === 'function') {
				c.start();
			}
		});
	};
	update() {
		this.components.forEach(c => {
			if (typeof c.update === 'function') {
				c.update();
			}
		});
	};

	private static _gameObjects: GameObject[] = [];

	static get gameObjects() {
		return Object.freeze(GameObject._gameObjects);
	}

	static start() {
		GameObject.gameObjects.forEach(go => go.start());
	}
	static update() {
		RigidBody.update();
		GameObject.gameObjects.forEach(go => go.update());
	}
}

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

const animate: FrameRequestCallback = async (timestamp: DOMHighResTimeStamp) => {
	Time.update(timestamp);
	MainCanvas.clean();
	//MainCanvas.drawSampleMetric(50);
	Time.showData();

	GameObject.update();
	
	requestAnimationFrame(animate);
}
LayerMask.init();
POINT_DEFAULT.radius = 5;
POINT_DEFAULT.setFillStyle(Color.byName("Red"));
for (let i = 0; i < 1; i++) {
	new TestObject(MainCanvas.center.copy(), 10, new Angle(), 0);
}

GameObject.start();
animate(0);

