import { AppSettings } from '@gandolphinnn/shared';
import { describe, test, expect } from '@jest/globals';

class TestSettings extends AppSettings {
	//#region Boilerplate
	protected static _appSettings = new TestSettings();
	protected static get instance() {
		return this._appSettings as TestSettings;
	}
	protected constructor() {
		super();
		AppSettings._override = this;
	}
	//#endregion Boilerplate

	protected readonly _DEBUG = false;
}

describe('AppSettings behaviour', () => {
    test('Checks the correct override of the AppSettings', () => {
		const debug = AppSettings.DEBUG;
        expect(debug).toBeFalsy();
    });
});