export type BtnCode = 0 | 1 | 2 | 3 | 4;
export type KeyCode = 'Backspace' | 'Tab' | 'Enter' | 'ShiftLeft' | 'ShiftRight' | 'ControlLeft' | 'ControlRight' | 'AltLeft' | 'AltRight' | 'Pause' | 'CapsLock' | 'Escape' | 'Space' | 'PageUp' | 'PageDown' | 'End' | 'Home' | 'Left' | 'Up' | 'Right' | 'Down' | 'PrintScreen' | 'Insert' | 'Delete' | 'D0' | 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | 'D6' | 'D7' | 'D8' | 'D9' | 'Quote' | 'KA' | 'KB' | 'KC' | 'KD' | 'KE' | 'KF' | 'KG' | 'KH' | 'KI' | 'KJ' | 'KK' | 'KL' | 'KM' | 'KN' | 'KO' | 'KP' | 'KQ' | 'KR' | 'KS' | 'KT' | 'KU' | 'KV' | 'KW' | 'KX' | 'KY' | 'KZ' | 'MetaLeft' | 'MetaRight' | 'ContextMenu' | 'P0' | 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7' | 'P8' | 'P9' | 'PMultiply' | 'PAdd' | 'PSubtract' | 'PDecimal' | 'PDivide' | 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12' | 'NumLock' | 'ScrollLock' | 'Semicolon' | 'Equal' | 'Comma' | 'Minus' | 'Period' | 'Slash' | 'Backquote' | 'BracketLeft' | 'Backslash' | 'BracketRight'
export type PreventableCodes = KeyCode | 'mousedown' | 'wheel' | 'contextmenu'

export enum BtnState {
	Up, Down, Released, Hold, Dbl
}
export type WheelState = 0 | 1 | -1;