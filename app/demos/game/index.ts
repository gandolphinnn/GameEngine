import { rand } from '@gandolphinnn/utils';
import { AppSettings } from '@gandolphinnn/shared';
import { Angle,  Coord, MainCanvas, Time } from '@gandolphinnn/graphics';
import { Vector } from '@gandolphinnn/rigid';
import { Game } from '@gandolphinnn/game';

import { GameSettings } from './GameSettings';
import { TestObject1 } from './GameObjects/TestObject1.gameobject';
import { TestObject2 } from './GameObjects/TestObject2.gameobject';

function Sim1() {
	//* For now limit to 1 object to test the correct order of the events
	for (let i = 0; i < 1; i++) {
		new TestObject1([new Coord(100, 100), new Coord(150, 100), new Coord(150, 150)]);
	}
}
function Sim2() {
	const coords = Coord.regularPoly(MainCanvas.center, 50, 400);
	coords.forEach(coord => {
		const radius = rand(10, 20);
		const strength = 20//rand(3, 8);
		const vector = new Vector(coord, Angle.random(), strength);
		new TestObject2(radius, vector);
	});
	/* const vector = Vector.random(50)
	new TestObject2(50, vector);
	new TestObject2(100, Vector.down(new Coord(800, 500)), true); */

	//Vector.fromAtoB(new Coord(100, 100), new Coord(200, 200)).render();
	//MainCanvas.drawSampleMetric(50);
	//Vector.fromAtoB(MainCanvas.center, new Coord(300, 300)).render();
}

Game.start = () => {
	console.log(AppSettings.LINE_WIDTH);
	console.log(GameSettings.LINE_WIDTH);
	const SIMULATION_NUM: number = 2

	switch (SIMULATION_NUM) {
		case 1:
			Sim1();
			break;
		case 2:
			Sim2();
			break;
	}
}

Game.update = () => {
	MainCanvas.clean();
	Time.showData(['fps']);
}