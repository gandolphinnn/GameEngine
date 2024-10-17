import { Singleton } from '@gandolphinnn/utils';
import { AppSettings } from '@gandolphinnn/shared';
import { KeyOfTime } from '@gandolphinnn/graphics';

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
	protected _TIME_DEBUG_PARAMS: KeyOfTime[] = ['fps'];
}