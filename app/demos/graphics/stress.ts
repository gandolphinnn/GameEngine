import { AppSettings, Time } from '@gandolphinnn/shared';
import { Circle, MainCanvas } from '@gandolphinnn/graphics';
import { Game } from '@gandolphinnn/game';

AppSettings.COLOR_RGBA.alpha = 0.1;
const totShapes = 20000;
const radius = 10;

Game.Update = () => {
	MainCanvas.clean();

	Time.showData();

	//#region Stress code
	for (let i = 0; i < totShapes; i++) {
		new Circle(MainCanvas.randomCoord(100), radius).render();
	}
	//#endregion Stress code
};