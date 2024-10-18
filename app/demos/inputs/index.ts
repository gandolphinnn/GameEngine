import { Circle, Color, Coord, MainCanvas, Mesh, Text } from '@gandolphinnn/graphics';
import { BtnState, Input } from '@gandolphinnn/inputs';
import Enumerable from 'linq/linq.js';

//TODO this demo does not work

MainCanvas.writeStyle.mergeFont('15px Arial');
MainCanvas.bgColor = Color.byName('Grey');

function logInput(toLog: Record<any, any>) {
	const recordArr = Enumerable.from(toLog).toArray().filter((btn) => btn.value.state !== BtnState.Up);
	recordArr.sort((a, b) => a.key > b.key ? 1 : -1);
	const toRet = JSON.stringify(recordArr.map((btn) => {
		return `(${btn.key}: ${BtnState[btn.value.state]})`;
	}));
	return toRet.replace(/"/g, '');
}

function animate(timestamp: number) {
	MainCanvas.clean();
	requestAnimationFrame(animate);
	MainCanvas.drawSampleMetric(50);
	circ.style.mergeFillStyle(Color.byName(Input.mouseIn? 'Black' : 'Red'));

	mesh.center = Input.mousePos;

	mouseText.content = `pos: (${Input.mousePos.x}, ${Input.mousePos.y}) wheel: (${Input.mouseWheel.x}, ${Input.mouseWheel.y}) isInside: ${Input.mouseIn}`;
	mouseBtnText.content = `btns ${logInput(Input.mouseBtn)}`;
	keyText.content = `keys ${logInput(Input.keys)}`;

	mesh.render();
}

const circ			= new Circle(new Coord(0,0), 5);
const mouseText		= new Text(new Coord(0,-55), '');
const mouseBtnText	= new Text(new Coord(0,-35), '');
const keyText		= new Text(new Coord(0,-15), '');

const mesh			= new Mesh(new Coord(0,0), [circ, keyText, mouseBtnText, mouseText]);

window.requestAnimationFrame(animate);
/**/