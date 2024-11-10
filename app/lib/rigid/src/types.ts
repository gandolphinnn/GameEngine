import { Mouse } from '@gandolphinnn/inputs';
import { Collision } from '..';

export enum ERigidBodyEvent {
	OnCollisionEnter,
	OnCollisionStay,
	OnCollisionLeave,
	OnMouseEnter,
	OnMouseStay,
	OnMouseLeave
}

export type CollisionEvent = (collision: Collision) => void;
//TODO Convert param type to MouseCollision
export type MouseCollisionEvent = (mouse: Mouse) => void;

/**
 * Called when the object first collides with another object
 */
export interface OnCollisionEnter {
	OnCollisionEnter: CollisionEvent;
}

/**
 * Called when the object keeps colliding with another object. Not the first time
 */
export interface OnCollisionStay {
	OnCollisionStay: CollisionEvent;
}

/**
 * Called when the object stops colliding with another object
 */
export interface OnCollisionLeave {
	OnCollisionLeave : CollisionEvent;
}

/**
 * Called when the mouse is over the object
 */
export interface OnMouseEnter {
	OnMouseEnter: MouseCollisionEvent;
}

/**
 * Called when the mouse keeps staying over the object. Not the first time
 */
export interface OnMouseStay {
	OnMouseStay: MouseCollisionEvent;
}

/**
 * Called when the mouse stops being over the object
 */
export interface OnMouseLeave {
	OnMouseLeave: MouseCollisionEvent;
}