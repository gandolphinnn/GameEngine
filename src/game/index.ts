import { MainCanvas, Mesh, Time } from "../graphics/index.js";
import { Component } from "../graphics/index.js";
import { MouseCollisionEvent, CollisionEvent, Vector, LayerMask } from "../rigid/index.js";
import { RigidCirc } from "../rigid/index.js";
import { RigidBody } from "../rigid/index.js";

export class Game {
	static start() {};
}
export class GameObject {

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
		this.onMouseEnter = this.rigidBody.onMouseEnter;
		this.onMouseLeave = this.rigidBody.onMouseLeave;
		this.onClick = this.rigidBody.onClick;
		this.onCollisionEnter = this.rigidBody.onCollisionEnter;
		this.onCollisionLeave = this.rigidBody.onCollisionLeave;
		GameObject._gameObjects.push(this);
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
		//return Object.freeze(GameObject._gameObjects);
		return GameObject._gameObjects;
	}

	static start() {
		GameObject.gameObjects.forEach(go => go.start());
	}
	static update() {
		RigidBody.update();
		GameObject.gameObjects.forEach(go => go.update());
	}
}
const animate: FrameRequestCallback = async (timestamp: DOMHighResTimeStamp) => {
	Time.update(timestamp);
	MainCanvas.clean();
	Time.showData();

	GameObject.update();
	
	requestAnimationFrame(animate);
}
LayerMask.init();

Game.start();

GameObject.start();
animate(0);
