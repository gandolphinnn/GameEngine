import { MainCanvas, Coord, Img, parseRGBA, Color, CircleSector, Angle, Circle, Poly, Line, CircleSlice, RenderAction, Mesh, Text, RGBA } from '@gandolphinnn/graphics';
import { test } from '@gandolphinnn/utils';
import { ImagesDemo } from './images';
import { ElementsDemo } from './elements';

MainCanvas.cnv.style.backgroundColor = 'grey';

/* test('rgbParse INVALID', parseRGBA(''), null);
test('rgbParse RGBA', parseRGBA('rgba(4,3,2,0.6)'), {red: 4, green: 3, blue: 2, alpha: 0.6} as RGBA);
test('rgbParse RGB', parseRGBA('rgb(300,6,5)'), {red: 255, green: 6, blue: 5, alpha: 1} as RGBA);
test('rgbParse HEX1', parseRGBA('#abc'), {red: 10, green: 11, blue: 12, alpha: 1} as RGBA);
test('rgbParse HEX2', parseRGBA('#abcdef'), {red: 171, green: 205, blue: 239, alpha: 1} as RGBA);
test('Color.byName', Color.byName('AliceBlue'), {red: 240, green: 248, blue: 255, alpha: 1} as RGBA);

mesh.moveBy(600, -50).render(true)
mesh.moveBy(300, -50).render()
/* */
/* MainCanvas.drawFunction(x => {
	return Math.sin(x) * 100;
}, .1, 2); */

//ImagesDemo();
ElementsDemo();
//MainCanvas.drawSampleColors();