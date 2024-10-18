import { RigidBody } from '@gandolphinnn/rigid';
import { GameObject } from '..';
import { GameCycle, Time } from '@gandolphinnn/shared';

export class Game implements GameCycle {
	static Start() {};
	static Update() {};
	static FixedUpdate() {};
}

const animate: FrameRequestCallback = async (timestamp: DOMHighResTimeStamp) => {
	Time.Update(timestamp);

	Game.Update();
	RigidBody.Update();
	GameObject.Update();

	requestAnimationFrame(animate);
};

window.onload = () => {
	Game.Start();
	RigidBody.Start();
	GameObject.Start();
	animate(0);
};