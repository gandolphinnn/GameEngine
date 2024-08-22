import { Color, Coord, MainCanvas, POINT_DEFAULT, Time } from "@gandolphinnn/graphics";
import { Game } from "@gandolphinnn/game";
import { TestObject1 } from "./GameObjects/TestObject1.gameobject";
import { rand } from "@gandolphinnn/utils";
import { TestObject2 } from "./GameObjects/TestObject2.gameobject";
import { Vector } from "@gandolphinnn/rigid";

function Sim1() {
	POINT_DEFAULT.radius = 5;
	POINT_DEFAULT.setFillStyle(Color.byName("Red"));

	//* For now limit to 1 object to test the correct order of the events
	for (let i = 0; i < 1; i++) {
		new TestObject1([new Coord(100, 100), new Coord(150, 100), new Coord(150, 150)]);
	}
}
function Sim2() {
	for (let i = 0; i < 50; i++) {
		const radius = rand(20, 30);
		const strength = 10//rand(3, 8);
		const vector = Vector.random(strength);
		new TestObject2(radius, vector);
	}
	/* const vector = Vector.random(50)
	new TestObject2(50, vector);
	new TestObject2(100, Vector.down(new Coord(800, 500)), true); */

	//Vector.fromAtoB(new Coord(100, 100), new Coord(200, 200)).render();
	//MainCanvas.drawSampleMetric(50);
	//Vector.fromAtoB(MainCanvas.center, new Coord(300, 300)).render();
}

Game.start = () => {
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