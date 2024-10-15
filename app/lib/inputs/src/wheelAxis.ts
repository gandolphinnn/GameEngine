import { AppSettings } from '@gandolphinnn/shared';
import { InputTimer, WheelState } from '.';

export class WheelAxis extends InputTimer {
	private _state: WheelState;
	get state() {
		if (this._state !== 0 && this.elapsed >= AppSettings.MS_DELAY_WHEEL) {
			this._state = 0;
		}
		return this._state;
	}
	set state(state: WheelState) {
		if (this.state === state) {
			return;
		}
		this.setTS();
		this._state = state;
	}

	constructor() {
		super();
		this._state = 0;
	}
}