import { AppSettings } from '@gandolphinnn/shared';

export enum BtnState {
	Up, Down, Released, Hold, Dbl
}
export type WheelState = 0 | 1 | -1;

/**
 * Grouping of states
 */
const EVENT_BTNSTATE = {
	[BtnState.Up]: [BtnState.Up, BtnState.Released],
	[BtnState.Down]: [BtnState.Down, BtnState.Hold, BtnState.Dbl]
}

export function getTodayTimeStamp() {
	const date = new Date();
	return ((date.getHours() * 60 + date.getMinutes())*60 + date.getSeconds()) * 1000 + date.getMilliseconds();
}
class InputTimer {
	protected _timeStamp: number;
	protected get elapsed() {
		return getTodayTimeStamp() - this._timeStamp;
	}
	constructor() {
		this._timeStamp = getTodayTimeStamp();
	}
	protected setTS() {
		this._timeStamp = getTodayTimeStamp();
	}
}
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
export class Button extends InputTimer {
	private _state: BtnState;
	get state() {
		if (this.elapsed >= AppSettings.MS_DELAY_BTN_DOWN && (this._state == BtnState.Down || this._state == BtnState.Dbl))
			this._state = BtnState.Hold;

		if (this.elapsed >= AppSettings.MS_DELAY_BTN_UP && this._state == BtnState.Released)
			this._state = BtnState.Up;

		return this._state;
	}
	private set state(state: BtnState) {
		if (this.state === state) {
			return;
		}
		this.setTS();
		this._state = state;
	}

	constructor() {
		super();
		this.state = BtnState.Up;
	}
	
	toggle(newState: BtnState.Up | BtnState.Down) {
		const currentState = this.state; //? MUST PICK the getter
		if (EVENT_BTNSTATE[newState].indexOf(currentState) != -1) { //? If the new State is similar to the current state (like released and up)
			return;
		}
		switch (currentState) {
			case BtnState.Up:		this.state = BtnState.Down;		break;
			case BtnState.Down:		this.state = BtnState.Released;	break;
			case BtnState.Released:	this.state = BtnState.Dbl;		break;
			case BtnState.Hold:		this.state = BtnState.Up;		break;
			case BtnState.Dbl:		this.state = BtnState.Released;	break;
		}
	}
}