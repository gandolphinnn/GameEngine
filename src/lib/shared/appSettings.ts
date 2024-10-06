import { Color, ColorName, RGBA, Style } from "@gandolphinnn/graphics";
import { PreventableCodes } from "@gandolphinnn/inputs";
import { Singleton } from "@gandolphinnn/utils";

export class AppSettings extends Singleton {
	protected static _AppSettings: Singleton = new AppSettings();
	protected static get instance() {
		return this._AppSettings as AppSettings;
	}
	protected constructor() {
		super();
	}

	protected _COLOR_NAME: RGBA = {red: 0, green: 0, blue: 0, alpha: 1};
	protected _FILL_STYLE: RGBA = {red: 0, green: 0, blue: 0, alpha: 1};
	protected _STROKE_STYLE: RGBA = {red: 0, green: 0, blue: 0, alpha: 1};
	protected _LINE_WIDTH: number = 1;
	protected _TEXT_ALIGN: CanvasTextAlign = 'center';
	protected _FONT: string = '10px Arial';
	protected _VECTOR_STRENGTH_PIXEL_RATIO: number = 10;
	protected _DELTATIME_MULTIPLIER: number = 100;
	protected _VECTOR_ARROW_HEAD_LENGTH: number = 10;
	protected _VECTOR_ARROW_HEAD_ANGLE: number = 30;
	protected _MS_DELAY_BTN_UP: number = 300;
	protected _MS_DELAY_BTN_DOWN: number = 400;
	protected _MS_DELAY_WHEEL: number = 400;
	protected _UNPREVENTED_CODES: PreventableCodes[] = ['F5', 'F12', 'wheel'];

	//#region Graphics	
	/**
	 * The color name used in `Color.default()`
	*/
	public static get COLOR_NAME(): RGBA {
		return this.instance._COLOR_NAME;
	}
	
	/**
	 * The fill style used in `Style.default()`
	*/
	public static get FILL_STYLE(): RGBA {
		return this.instance._FILL_STYLE;
	}
	
	/**
	 * The stroke style used in `Style.default()`
	*/
	public static get STROKE_STYLE(): RGBA {
		return this.instance._STROKE_STYLE;
	}
	
	/**
	 * The line width used in `Style.default()`
	*/
	public static get LINE_WIDTH(): number {
		return this.instance._LINE_WIDTH;
	}
	
	/**
	 * The text align used in `Style.default()`
	*/
	public static get TEXT_ALIGN(): CanvasTextAlign {
		return this.instance._TEXT_ALIGN;
	}
	
	/**
	 * The font used in `Style.default()`
	*/
	public static get FONT(): string {
		return this.instance._FONT;
	}
	//#endregion Graphics
	
	//#region Rigid
	//TODO check if this comment is correct
	/**
	 * X VectorStrength = 1 Pixel
	*/
	public static get VECTOR_STRENGTH_PIXEL_RATIO(): number {
		return this.instance._VECTOR_STRENGTH_PIXEL_RATIO;
	}
	
	/**
	 * The multiplier of the delta time when calculating the time difference between frames
	*/
	public static get DELTATIME_MULTIPLIER(): number {
		return this.instance._DELTATIME_MULTIPLIER;
	}
	
	/**
	 * @DEBUG The length in pixels of each side of the arrow head. Used in `Vector.renderArrow()`
	*/
	public static get DEBUG_VECTOR_ARROW_HEAD_LENGTH(): number {
		return this.instance._VECTOR_ARROW_HEAD_LENGTH;
	}
	
	/**
	 * @DEBUG The angle in degree of the arrow head relative to its body. Used in `Vector.renderArrow()`
	*/
	public static get VECTOR_ARROW_HEAD_ANGLE(): number {
		return this.instance._VECTOR_ARROW_HEAD_ANGLE;
	}
	//#endregion Rigid
	
	//#region Inputs
	
	/**
	 * Delay from Button.Released to Button.Up
	*/
	public static get MS_DELAY_BTN_UP(): number {
		return this.instance._MS_DELAY_BTN_UP;
	}
	
	
	/**
	 * Delay from Button.Down or Button.Dbl to Button.Hold
	*/
	public static get MS_DELAY_BTN_DOWN(): number {
		return this.instance._MS_DELAY_BTN_DOWN;
	}
	
	
	/**
	 * Delay from Wheel.x or Wheel.y == -1 or 1 to == 0
	*/
	public static get MS_DELAY_WHEEL(): number {
		return this.instance._MS_DELAY_WHEEL;
	}
	
	
	/**
	 * Delay from Wheel.x or Wheel.y == -1 or 1 to == 0
	*/
	public static get UNPREVENTED_CODES(): PreventableCodes[] {
		return this.instance._UNPREVENTED_CODES;
	}
	//#endregion Inputs
}