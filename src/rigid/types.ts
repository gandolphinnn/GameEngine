import { RigidBody } from './index.js'

export type CollisionEvent = (val: RigidBody) => void;
export type MouseCollisionEvent = (mouse: Mouse) => void;

export interface OnCollisionEnter {

}