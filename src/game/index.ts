import { MainCanvas, Mesh, Time, GameCycle } from "@gandolphinnn/graphics";
import { CollisionEvent, Vector, LayerMask, RigidBody, ERigidBodyEvent } from "@gandolphinnn/rigid";

export class Game {
	static start() {};
	static update() {};
}
export abstract class GameObject implements GameCycle {
	private _rigidBody: RigidBody;
	public get rigidBody(): RigidBody {
		return this._rigidBody;
	}
	public set rigidBody(value: RigidBody) {
		this._rigidBody = value;
	}

	get vector() { return this.rigidBody.vector as Vector }

	private _events: Map<ERigidBodyEvent, CollisionEvent> = null;
	public get events(): Map<ERigidBodyEvent, CollisionEvent> {
		if (this._events === null) {
			this._events = new Map();
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
		rigidBody: RigidBody
	) {
		this.rigidBody = rigidBody;
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
		GameObject.gameObjects.forEach(go => {
			go.update();
			go.mesh.update();
			go.rigidBody.update();
		});
	}
}
const animate: FrameRequestCallback = async (timestamp: DOMHighResTimeStamp) => {
	Time.update(timestamp);

	//? Only these lines are not fixed. The user might want to change these: implement a way to do so with an AppSettings
	//TODO move these in Game.update() customization, just for test;
	MainCanvas.clean();
	Time.showData();
	//? ^

	Game.update();
	RigidBody.update();
	GameObject.update();

	Game.update();
	RigidBody.update();
	GameObject.update();
	
	//requestAnimationFrame(animate);
}

window.onload = () => {
	Game.start();
	GameObject.start();
	animate(0);
}