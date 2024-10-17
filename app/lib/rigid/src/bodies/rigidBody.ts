import { GameCycle } from '@gandolphinnn/shared';
import { CnvElement } from '@gandolphinnn/graphics'
import { GameObject } from '@gandolphinnn/game'
import { Collision, ERigidBodyEvent, LayerMask, Vector } from '../..';

export abstract class RigidBody implements GameCycle {
	
	public gameObject: GameObject;
	public layerMask = LayerMask.default;

	get coord() { return this.vector.coord }
	get angle() { return this.vector.angle }

	constructor(
		public vector = Vector.up(),
		public mass = 0,
	) {
		RigidBody._rigidBodies.push(this);
	}

	Start() {}
	Update() {
		this.vector.advance();
	}

	render() {
		this.cnvElement.render(false);
	}

	setLayerMask(layerMask: LayerMask) {
		this.layerMask = layerMask;
		return this;
	}

	//#region Abstract
	protected abstract cnvElement: CnvElement;
	//#endregion Abstract

	//#region Static
	/**
	 * Map every collision happening between two rigid bodies.
	 * For each pair of rigid bodies, if they are colliding, they are mapped to each other, with 2 different entries.
	 * ```
	 * this.collisionMap.get(bodyA) -> bodyB
	 * this.collisionMap.get(bodyB) -> bodyA;
	 * ```
	 */
	static readonly collisionMap = new Map<RigidBody, RigidBody>();
	
	private static _rigidBodies: RigidBody[] = [];
	static get rigidBodies() { return Object.freeze(this._rigidBodies) }

	static getByLayerMask(layerMask = LayerMask.default) {
		return this.rigidBodies.filter(rBody => rBody.layerMask == layerMask );
	}
	
	static update() {
		LayerMask.layerMasks.forEach(layerMask => {
			const bodies = this.getByLayerMask(layerMask);
			for (let i = 0; i < bodies.length - 1; i++) {
				for (let j = i + 1; j < bodies.length; j++) {
					const bodyA = bodies[i];
					const goA = bodyA.gameObject;
					const bodyB = bodies[j];
					const goB = bodyB.gameObject;
			
					if (goA.events.size == 0 || goB.events.size == 0) {
						continue;
					}

					const areAlreadyColliding = this.collisionMap.get(bodyA) == bodyB || this.collisionMap.get(bodyB) == bodyA;
					
					const collision = new Collision(bodyA, bodyB);
					const isColliding = collision.doCollide;

					if (!areAlreadyColliding && isColliding) {
						this.collisionMap.set(bodyA, bodyB);
						this.collisionMap.set(bodyB, bodyA);
						goA.events.get(ERigidBodyEvent.onCollisionEnter)?.(collision);
						goB.events.get(ERigidBodyEvent.onCollisionEnter)?.(collision);
					}

					else if (areAlreadyColliding && isColliding) {
						goA.events.get(ERigidBodyEvent.onCollisionStay)?.(collision);
						goB.events.get(ERigidBodyEvent.onCollisionStay)?.(collision);
					}

					else if (areAlreadyColliding && !isColliding) {
						this.collisionMap.delete(bodyA);
						this.collisionMap.delete(bodyB);
						goA.events.get(ERigidBodyEvent.onCollisionLeave)?.(collision);
						goB.events.get(ERigidBodyEvent.onCollisionLeave)?.(collision);
					}
				}
			}
		});
	}
	//#endregion Static
}