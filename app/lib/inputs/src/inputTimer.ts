import { BtnState } from '..';

/**
 * Grouping of states
 */
export const EVENT_BTNSTATE = {
	[BtnState.Up]: [BtnState.Up, BtnState.Released],
	[BtnState.Down]: [BtnState.Down, BtnState.Hold, BtnState.Dbl]
}

function getTodayTimeStamp() {
	const date = new Date();
	return ((date.getHours() * 60 + date.getMinutes())*60 + date.getSeconds()) * 1000 + date.getMilliseconds();
}
export class InputTimer {
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