import { Coord, Poly } from '@gandolphinnn/graphics'
import { RigidBody, RigidLine, Vector } from '../..';

export class RigidPoly extends RigidBody {

	cnvElement: Poly;
	
	lines: RigidLine[] = [];

	get points() { return this.lines.map(line => line.points[0]) }

	constructor(
		vector: Vector,
		points: Coord[],
		mass = 0,
	) {
		super(vector, mass);

		if(points.length < 3) throw new Error('A polygon must have at least 3 points');
		
		for (let i = 1; i < points.length; i++) {
			this.lines.push(new RigidLine([points[i-1], points[i]]));
		}
		this.lines.push(new RigidLine([points.last(), points[0]]))

		this.cnvElement = new Poly(points);
	}

	detectCollision(rBody: RigidBody) {
		/* if (parentClass(rBody).name == 'RigidRect') {
			let hitPoints = new Array(), line1, line2;
			for (let i = 0; i < this.points.length; i++) {
				line1 = new Line(this.points[i], this.points[(i+1) % this.points.length]);
				for (let i = 0; i < rBody.corners.length; i++) {
					line2 = new Line(rBody.corners[i], rBody.corners[(i+1) % rBody.corners.length]);
					if(line1.hitL(line2)) {
						hitPoints.push(line1.hitL(line2));
					}
				}
			}
			if (hitPoints.length == 0)
				return false;
			return hitPoints;
		}
		else if(parentClass(rBody).name == 'RigidCirc') {
			console.log('Work In Progress');
			return false;
		} */
		return false;
	}
}