import { GameCycle, Coord, Angle, CnvElement } from "@gandolphinnn/graphics";
import { RigidBody, ERigidBodyEvent, CollisionEvent } from "@gandolphinnn/rigid";

export abstract class GameObject implements GameCycle {
	private _rigidBody: RigidBody;
	public get rigidBody(): RigidBody {
		return this._rigidBody;
	}
	public set rigidBody(value: RigidBody) {
		this._rigidBody = value;
	}

	get vector() { return this.rigidBody.vector }

	/**
	 * Get the vector's coordinate in the next frame
	 */
	get vectorCoord() { return this.vector.vectorCoord }

	get coord() { return this.vector.coord }
	set coord(coord: Coord) { this.vector.coord.moveTo(coord) }

	get angle() { return this.vector.angle }
	set angle(angle: Angle) { this.vector.angle.degrees = angle.degrees }

	get strength() { return this.vector.strength }
	set strength(strength: number) { this.vector.strength = strength }

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