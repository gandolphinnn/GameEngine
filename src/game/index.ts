import { MainCanvas, Mesh, Time, GameCycle, CnvElement } from "@gandolphinnn/graphics";
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
		public cnvElement: CnvElement,
		rigidBody: RigidBody
	) {
		this.rigidBody = rigidBody;
		this.rigidBody.gameObject = this;
		GameObject._gameObjects.push(this);
	}

	Start() {};
	Update() {};

	private static _gameObjects: GameObject[] = [];

	static get gameObjects() {
		//return Object.freeze(GameObject._gameObjects);
		return GameObject._gameObjects;
	}

	static start() {
		GameObject.gameObjects.forEach(go => {
			go.Start();
			go.cnvElement.Start();
			go.rigidBody.Start();
		});
	}
	static update() {
		GameObject.gameObjects.forEach(go => {
			go.Update();
			go.cnvElement.Update();
			go.rigidBody.Update();
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

	requestAnimationFrame(animate);
}

window.onload = () => {
	Game.start();
	GameObject.start();
	animate(0);
}