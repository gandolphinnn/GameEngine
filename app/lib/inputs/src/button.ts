import { AppSettings } from '@gandolphinnn/shared';
import { BtnState, EVENT_BTNSTATE, InputTimer } from '.';

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