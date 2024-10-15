import { Singleton } from '@gandolphinnn/utils';
import { AppSettings } from '@gandolphinnn/shared';

export class GameSettings extends AppSettings {
	//#region Boilerplate
	protected static _AppSettings: Singleton = new GameSettings();
	protected static get instance() {
		return this._AppSettings as GameSettings;
	}
	protected constructor() {
		super();
	}
	//#endregion Boilerplate

	protected _LINE_WIDTH = 10;
}