import { Coord, Img, RenderAction } from '@gandolphinnn/graphics';

export function ImagesDemo() {

	new Img(new Coord(600, 300), 'blue')
		.setLineWidth(4)
		.setAction(RenderAction.Stroke)
		.render()

		.moveBy(-100, 0)
		.resize({width: 100, height: 200})
		.setAction(RenderAction.Fill)
		.render()

		.moveBy(200, 0)
		.resize({width: 100})
		.setAction(RenderAction.Both)
		.render();
	//MainCanvas.center.render();
}