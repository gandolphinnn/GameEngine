import Enumerable from 'linq';
import { Coord, RenderAction, CnvElement } from '../..';

/**
 * A collection of CnvElements
 */
export class Mesh extends CnvElement {
	elements: Enumerable.IEnumerable<CnvElement>;
	doRender: boolean = true;

	get center() { return this._center; }
	set center(center: Coord) {
		const diff = Coord.difference(center, this.center);
		this.moveBy(diff.x, diff.y);
	}

	get isVisible() {
		return this.doRender && this.elements.any(item => item.isVisible);
	}
	constructor(center: Coord, items: CnvElement[]) {
		super(RenderAction.Both, center);
		this.elements = Enumerable.from(items);
	}
	moveBy(x: number, y: number) {
		//? keep it like this to trigger the setter
		this.center.sumXY(x, y);
		this.elements.forEach(item => {
			item.moveBy(x, y);
		});
		return this;
	}
	render(drawPoints = false) {
		if (this.isVisible) {
			this.elements.orderBy(elem => elem.zIndex).forEach(item => {
				item.render(drawPoints);
			});
		}
		if(drawPoints) {this.center.render();}
		return this;
	}
}