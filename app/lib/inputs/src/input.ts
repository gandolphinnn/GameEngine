import { clamp, Singleton } from '@gandolphinnn/utils';
import { AppSettings } from '@gandolphinnn/shared';
import { MainCanvas } from '@gandolphinnn/graphics';
import { BtnCode, BtnState, Button, KeyCode, Mouse, PreventableCodes, WheelState } from '..';

export class Input extends Singleton {
	private static _Input: Singleton = new Input();
	private static get instance() {
		return this._Input as Input;
	};

	private _mouse = new Mouse();
	static get mouse() { return this.instance._mouse };
	
	private _keys: Record<KeyCode, Button>;
	static get keys() { return this.instance._keys };

	private constructor() {
		super();
		this._keys = {
			'Backspace': new Button(),
			'Tab': new Button(),
			'Enter': new Button(),
			'ShiftLeft': new Button(),
			'ShiftRight': new Button(),
			'ControlLeft': new Button(),
			'ControlRight': new Button(),
			'AltLeft': new Button(),
			'AltRight': new Button(),
			'Pause': new Button(),
			'CapsLock': new Button(),
			'Escape': new Button(),
			'Space': new Button(),
			'PageUp': new Button(),
			'PageDown': new Button(),
			'End': new Button(),
			'Home': new Button(),
			'Left': new Button(),
			'Up': new Button(),
			'Right': new Button(),
			'Down': new Button(),
			'PrintScreen': new Button(),
			'Insert': new Button(),
			'Delete': new Button(),
			'D0': new Button(),
			'D1': new Button(),
			'D2': new Button(),
			'D3': new Button(),
			'D4': new Button(),
			'D5': new Button(),
			'D6': new Button(),
			'D7': new Button(),
			'D8': new Button(),
			'D9': new Button(),
			'Quote': new Button(),
			'KA': new Button(),
			'KB': new Button(),
			'KC': new Button(),
			'KD': new Button(),
			'KE': new Button(),
			'KF': new Button(),
			'KG': new Button(),
			'KH': new Button(),
			'KI': new Button(),
			'KJ': new Button(),
			'KK': new Button(),
			'KL': new Button(),
			'KM': new Button(),
			'KN': new Button(),
			'KO': new Button(),
			'KP': new Button(),
			'KQ': new Button(),
			'KR': new Button(),
			'KS': new Button(),
			'KT': new Button(),
			'KU': new Button(),
			'KV': new Button(),
			'KW': new Button(),
			'KX': new Button(),
			'KY': new Button(),
			'KZ': new Button(),
			'MetaLeft': new Button(),
			'MetaRight': new Button(),
			'ContextMenu': new Button(),
			'P0': new Button(),
			'P1': new Button(),
			'P2': new Button(),
			'P3': new Button(),
			'P4': new Button(),
			'P5': new Button(),
			'P6': new Button(),
			'P7': new Button(),
			'P8': new Button(),
			'P9': new Button(),
			'PMultiply': new Button(),
			'PAdd': new Button(),
			'PSubtract': new Button(),
			'PDecimal': new Button(),
			'PDivide': new Button(),
			'F1': new Button(),
			'F2': new Button(),
			'F3': new Button(),
			'F4': new Button(),
			'F5': new Button(),
			'F6': new Button(),
			'F7': new Button(),
			'F8': new Button(),
			'F9': new Button(),
			'F10': new Button(),
			'F11': new Button(),
			'F12': new Button(),
			'NumLock': new Button(),
			'ScrollLock': new Button(),
			'Semicolon': new Button(),
			'Equal': new Button(),
			'Comma': new Button(),
			'Minus': new Button(),
			'Period': new Button(),
			'Slash': new Button(),
			'Backquote': new Button(),
			'BracketLeft': new Button(),
			'Backslash': new Button(),
			'BracketRight': new Button()
		};

		//#region Add events
		MainCanvas.cnv.addEventListener('contextmenu', e =>
			this.preventDefault('contextmenu', e)
		);

		MainCanvas.cnv.addEventListener('wheel', e => {
			this.preventDefault('wheel', e);
			this._mouse.wheel.x.state = clamp(e.deltaX, -1, 1) +1 -1 as WheelState;
			this._mouse.wheel.y.state = clamp(e.deltaY, -1, 1) +1 -1 as WheelState;
		}, {passive: false}); //? passive -> https://chromestatus.com/feature/6662647093133312

		MainCanvas.cnv.addEventListener('mousemove', e => {
			this._mouse.position.x = e.clientX;
			this._mouse.position.y = e.clientY;
		});

		MainCanvas.cnv.addEventListener('mousedown', e => {
			this.preventDefault('mousedown', e);
			this.toggleMouseBtn(e.button as BtnCode, BtnState.Down);
		});

		MainCanvas.cnv.addEventListener('mouseup', e => {
			this.toggleMouseBtn(e.button as BtnCode, BtnState.Up);
		});

		MainCanvas.cnv.addEventListener('mouseenter', e => {
			this._mouse.isInside = true;
		});

		MainCanvas.cnv.addEventListener('mouseleave', e => {
			this._mouse.isInside = false;
		});

		window.addEventListener('keydown', e => {
			if (e.repeat || !this._mouse.isInside) return;
			const code = Input.GetKeyCode(e.code);
			this.preventDefault(code, e);
			this.toggleKeybtn(code, BtnState.Down);
		});

		window.addEventListener('keyup', e => {
			if (!this._mouse.isInside) return;
			const code = Input.GetKeyCode(e.code);
			this.toggleKeybtn(code, BtnState.Up);
		});
		//#endregion
	}

	static GetKeyCode(code: string) {
		return code.replace('Key', 'K').replace('Digit', 'D').replace('Numpad', 'P').replace('Arrow', '') as KeyCode;
	}

	private preventDefault(code: PreventableCodes, e: Event) {
		if (AppSettings.UNPREVENTED_CODES.indexOf(code) == -1)
			e.preventDefault()
	}
	private toggleMouseBtn(btnIndex: BtnCode, newState: BtnState.Up | BtnState.Down) {
		if (this._mouse.btn[btnIndex] === undefined)
			this._mouse.btn[btnIndex] = new Button();
		this._mouse.btn[btnIndex].toggle(newState);
	}
	private toggleKeybtn(code: KeyCode, newState: BtnState.Up | BtnState.Down) {
		if (this._keys[code] === undefined)
			this._keys[code] = new Button();

		this._keys[code].toggle(newState);
	}

	//#region Static getters and methods
	static get mousePos() {
		return Input.mouse.position;
	}
	static get mouseIn() {
		return Input.mouse.isInside;
	}
	static get mouseWheel() {
		return { x: Input.mouse.wheel.x.state, y: Input.mouse.wheel.y.state };
	}
	static get mouseBtn() {
		return Input.mouse.btn;
	}
	static btnState(btnCode: BtnCode) {
		if (Input.mouse.btn[btnCode] === undefined)
			return BtnState.Up;

		return Input.mouse.btn[btnCode].state;
	}
	static keyState(keyCode: KeyCode) {
		if (Input.keys[keyCode] === undefined)
			return BtnState.Up;

		return Input.keys[keyCode].state;
	}
	//#endregion Static getters and methods
}