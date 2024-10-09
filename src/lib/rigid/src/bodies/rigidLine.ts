import { className } from '@gandolphinnn/utils';
import { Coord, Line } from '@gandolphinnn/graphics'
import { RigidBody, Vector } from '..';



export class RigidLine extends RigidBody {

	cnvElement: Line;

	//TODO constructor and super call
	constructor(
		public points: [Coord, Coord],
	) {
		super(Vector.up(), 0);
		this.cnvElement = new Line(points);
	}
	detectCollision(rigidBody: RigidBody) {
		switch (className(rigidBody)) {
			case 'RigidLine': {
				// https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
				const rigidLine = rigidBody as unknown as RigidLine;
				let hitPoint: Coord = null;
				let x1 = this.points[0].x, x2 = this.points[1].x, x3 = rigidLine.points[0].x, x4 = rigidLine.points[1].x;
				let y1 = this.points[0].y, y2 = this.points[1].y, y3 = rigidLine.points[0].y, y4 = rigidLine.points[1].y;
				let denom = (x1-x2)*(y3-y4) - (x3-x4)*(y1-y2);
				let t = ((x1-x3)*(y3-y4) - (x3-x4)*(y1-y3)) / denom;
				let u = ((x1-x3)*(y1-y2) - (x1-x2)*(y1-y3)) / denom;
				if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
					hitPoint = new Coord(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
				}
				return hitPoint;
			}
			case 'RigidPoly': {
				// https://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon
				//! Copilot code, to be checked
				const rigidPoly = rigidBody as unknown as RigidLine;
				let hitPoint: Coord = null;
				let x = rigidPoly.points[0].x, y = rigidPoly.points[0].y;
				let inside = false;
				for (let i = 0, j = rigidPoly.points.length - 1; i < rigidPoly.points.length; j = i++) {
					let xi = rigidPoly.points[i].x, yi = rigidPoly.points[i].y;
					let xj = rigidPoly.points[j].x, yj = rigidPoly.points[j].y;
					let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
					if (intersect) inside = !inside;
				}
				if (inside) hitPoint = new Coord(x, y);
				return hitPoint;
			}
		}
	}
}