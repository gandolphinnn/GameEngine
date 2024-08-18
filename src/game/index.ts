import { MainCanvas, Mesh, Time, Component } from "@gandolphinnn/graphics";
import { MouseCollisionEvent, CollisionEvent, Vector, LayerMask, RigidCirc, RigidBody } from "@gandolphinnn/rigid";

export class Game {
	static start() {};
	static update() {};
}
export abstract class GameObject {

	onCollisionEnter: CollisionEvent;
	onCollisionStay: CollisionEvent;
	onCollisionLeave: CollisionEvent;
	onMouseEnter: MouseCollisionEvent;
	onMouseStay: MouseCollisionEvent;
	onMouseLeave: MouseCollisionEvent;
	
	get mesh() { return this.components.find(c => c instanceof Mesh) as Mesh }
	get rigidBody() { return this.components.find(c => c instanceof RigidBody) as RigidBody }
	get vector() { return this.rigidBody.vector as Vector }
	get rigidCirc() { return this.rigidBody as RigidCirc }

	protected constructor(
		public components: Component[]
	) {
		//? Maybe the order is wrong. Maybe the assignment should be reversed
		this.onCollisionEnter = this.rigidBody.onCollisionEnter;
		this.onCollisionStay = this.rigidBody.onCollisionStay;
		this.onCollisionLeave = this.rigidBody.onCollisionLeave;
		this.onMouseEnter = this.rigidBody.onMouseEnter;
		this.onMouseStay = this.rigidBody.onMouseStay;
		this.onMouseLeave = this.rigidBody.onMouseLeave;

		GameObject._gameObjects.push(this);
	}

	start() {};
	update() {};

	private static _gameObjects: GameObject[] = [];

	static get gameObjects() {
		//return Object.freeze(GameObject._gameObjects);
		return GameObject._gameObjects;
	}

	static start() {
		GameObject.gameObjects.forEach(go => {
			go.start();
			go.components.forEach(c => {
				if (typeof c.start === 'function') {
					c.start();
				}
			});
		});
	}
	static update() {
		RigidBody.update();
		GameObject.gameObjects.forEach(go => {
			go.update();
			go.components.forEach(c => {
				if (typeof c.update === 'function') {
					c.update();
				}
			});
		});
	}
}
const animate: FrameRequestCallback = async (timestamp: DOMHighResTimeStamp) => {
	Time.update(timestamp);

	//? Only these lines are not fixed. The user might want to change these: implement a way to do so with an AppSettings
	MainCanvas.clean();
	Time.showData();
	//? ^

	Game.update();
	GameObject.update();
	
	requestAnimationFrame(animate);
}

window.onload = () => {
	LayerMask.init();
	Game.start();
	GameObject.start();
	animate(0);
}