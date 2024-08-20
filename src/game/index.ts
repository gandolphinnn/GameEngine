import { MainCanvas, Mesh, Time, GameCycle } from "@gandolphinnn/graphics";
import { MouseCollisionEvent, CollisionEvent, Vector, LayerMask, RigidCirc, RigidBody, ERigidBodyEvent, Collision } from "@gandolphinnn/rigid";

export class Game {
	static start() {};
	static update() {};
}
export abstract class GameObject implements GameCycle {

	get vector() { return this.rigidBody.vector as Vector }

	private _events: Map<ERigidBodyEvent, CollisionEvent> = null;
	public get events(): Map<ERigidBodyEvent, CollisionEvent> {
		if (this._events === null) {
			const asAny = this as any;
			for (let event in ERigidBodyEvent) {
				if (typeof asAny[event] === 'function') {
					this._events.set(ERigidBodyEvent[event as keyof typeof ERigidBodyEvent], asAny[event]);
				}
			}
		}
		return this._events;
	}

	protected constructor(
		public mesh: Mesh,
		public rigidBody: RigidBody,
	) {
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
			go.mesh.start();
			go.rigidBody.start();
		});
	}
	static update() {
		RigidBody.update();
		GameObject.gameObjects.forEach(go => {
			go.update();
			go.mesh.update();
			go.rigidBody.start();
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