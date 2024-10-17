import { CnvElement, Circle } from '@gandolphinnn/graphics'
import { RigidBody, Vector } from '../..';

export class RigidCircle extends RigidBody {

	protected cnvElement: CnvElement;

	get center() { return this.vector.coord }

	constructor(
		vector: Vector,
		public radius: number,
		mass = 0,
	) {
		super(vector, mass);
		this.radius = radius;
		
		this.cnvElement = new Circle(this.center, this.radius);
	}

	detectCollision(rBody: RigidBody) {
		/* if (mathF.parentClass(rBody) == 'RigidRect') {
			console.log('Work In Progress');
			return false;
		}
		else if(mathF.parentClass(rBody) == 'RigidCirc') {
			
		} */
		return false;
	}
}
