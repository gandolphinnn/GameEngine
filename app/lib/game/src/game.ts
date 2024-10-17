import { RigidBody } from '@gandolphinnn/rigid';
import { GameObject } from '..';
import { Time } from '@gandolphinnn/shared';

export class Game {
	static start() {};
	static update() {};
}

const animate: FrameRequestCallback = async (timestamp: DOMHighResTimeStamp) => {
	Time.update(timestamp);

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