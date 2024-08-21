import { Mouse } from '@gandolphinnn/inputs'
import { Collision } from './collision.js'

export enum ERigidBodyEvent {
	onCollisionEnter,
	onCollisionStay,
	onCollisionLeave,
	onMouseEnter,
	onMouseStay,
	onMouseLeave
}
export const RigidBodyCollisionEvents = [
	ERigidBodyEvent.onCollisionEnter,
	ERigidBodyEvent.onCollisionStay,
	ERigidBodyEvent.onCollisionLeave
]
export const RigidBodyMouseEvents = [
	ERigidBodyEvent.onMouseEnter,
	ERigidBodyEvent.onMouseStay,
	ERigidBodyEvent.onMouseLeave
]

//TODO Convert param type to Collision and MouseCollision
export type CollisionEvent = (collision: Collision) => void;
export type MouseCollisionEvent = (mouse: Mouse) => void;

/**
 * Called when the object first collide with another object
 */
export interface OnCollisionEnter {
	onCollisionEnter: CollisionEvent;
}

/**
 * Called when the object keeps colliding with another object. Not the first time
 */
export interface OnCollisionStay {
	onCollisionStay: CollisionEvent;
}

/**
 * Called when the object stops colliding with another object
 */
export interface OnCollisionLeave {
	onCollisionLeave : CollisionEvent;
}

/**
 * Called when the mouse is over the object
 */
export interface OnMouseEnter {
	onMouseEnter: MouseCollisionEvent;
}

/**
 * Called when the mouse keeps staying over the object. Not the first time
 */
export interface OnMouseStay {
	onMouseStay: MouseCollisionEvent;
}

/**
 * Called when the mouse stops being over the object
 */
export interface OnMouseLeave {
	onMouseLeave: MouseCollisionEvent;
}