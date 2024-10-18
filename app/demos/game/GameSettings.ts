import { Singleton } from '@gandolphinnn/utils';
import { AppSettings } from '@gandolphinnn/shared';
import { KeyOfTime } from '@gandolphinnn/graphics';

export class GameSettings extends AppSettings {
	//#region Boilerplate
	protected static _appSettings: Singleton = new GameSettings();
	protected static get instance() {
		return this._appSettings as GameSettings;
	}
	protected constructor() {
		super();
	}
	//#endregion Boilerplate

	protected readonly _LINE_WIDTH = 10;
	protected readonly _TIME_DEBUG_PARAMS: KeyOfTime[] = ['fps'];
}