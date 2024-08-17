import { Coord, Angle, Line, Component } from '@gandolphinnn/graphics'
import { LayerMask } from './layerMask.js'
import { CollisionEvent, MouseCollisionEvent } from './types.js'
import { Vector } from './vector.js'
import { className } from '@gandolphinnn/utils'
export * from './types.js'
export * from './layerMask.js'
export * from './vector.js'

export function RayCast (
	origin: Coord,
	direction: Angle,
	maxDistance: number,
	layerMask = LayerMask.default,
) {
	const ray = new RigidLine([origin, new Coord(
		origin.x + direction.cos * maxDistance,
		origin.y + direction.sin * maxDistance
	)], layerMask);
	const bodies = RigidBody.getByLayerMask(layerMask);
	const distances: { rigidBody: RigidBody, point: Coord, distance: number}[] = [];
	for (const body of bodies) {
		const hit = ray.checkCollision(body);
		if (!hit) continue;
		distances.push({ rigidBody: body, point: hit, distance: Coord.distance(origin, hit)});
	}

	if (distances.length == 0) return null;

	return distances.sort((a, b) => a.distance - b.distance)[0];
}

export enum RigidBodyEvent {
	MOUSE_ENTER = 'mouseEnter',
	MOUSE_LEAVE = 'mouseLeave',
	CLICK = 'click',
	COLLISION_ENTER = 'collisionEnter',
	COLLISION_LEAVE = 'collisionLeave',
}

export class RigidLine {
	constructor(
		public points: [Coord, Coord],
		public layerMask = LayerMask.default
	) {
	}
	checkCollision(rigidBody: RigidBody) {
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
				//? copilot code vvv, not even read
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
// Il nome in inglese di una interfaccia che definisce un oggetto con cui l'utente può interagire
export interface Interactable {
	onMouseEnter: MouseCollisionEvent;
	onMouseLeave: MouseCollisionEvent;
	onClick: MouseCollisionEvent;
}

export abstract class RigidBody implements Component {
	abstract onMouseEnter: MouseCollisionEvent;
	abstract onMouseLeave: MouseCollisionEvent;
	abstract onClick: MouseCollisionEvent;
	abstract onCollisionEnter: CollisionEvent;
	abstract onCollisionLeave: CollisionEvent;

	activeEvents: { eventType: RigidBodyEvent, rigidBody?: RigidBody }[] = [];

	constructor(
		public vector = Vector.up(),
		public layerMask = LayerMask.default
	) {
		RigidBody._rigidBodies.push(this);
	}

	private static _rigidBodies: RigidBody[] = [];

	static get rigidBodies() { return Object.freeze(this._rigidBodies) }

	start() {}
	update() {
		this.vector.advance();
		//? In every frame, check every active event of the rigidBody
		//this.event.activeEvents.forEach(); //todo implement
	}
	abstract detectCollision(rBody: RigidBody): boolean;

	static getByLayerMask(layerMask = LayerMask.default) {
		return this.rigidBodies.filter(rBody => rBody.layerMask == layerMask);
	}

	static update() {
		LayerMask.layerMasks.forEach(layerMask => {
			const bodies = this.getByLayerMask(layerMask);
			for (let i = 0; i < bodies.length - 1; i++) {
				for (let j = i + 1; j < bodies.length; j++) {
					const bodyA = bodies[i];
					const bodyB = bodies[j];
					const bodyAActiveEventIndex = bodyA.activeEvents.findIndex(e => e.eventType == RigidBodyEvent.COLLISION_ENTER && e.rigidBody == bodyB);
					const bodyBActiveEventIndex = bodyB.activeEvents.findIndex(e => e.eventType == RigidBodyEvent.COLLISION_ENTER && e.rigidBody == bodyA);
					const isColliding = bodyA.detectCollision(bodyB);
					if (bodyAActiveEventIndex == -1 && bodyBActiveEventIndex == -1 && isColliding) {
						bodyA.activeEvents.push({ eventType: RigidBodyEvent.COLLISION_ENTER, rigidBody: bodyB });
						bodyB.activeEvents.push({ eventType: RigidBodyEvent.COLLISION_ENTER, rigidBody: bodyA });
						bodyA.onCollisionEnter(bodyB);
						bodyB.onCollisionEnter(bodyA);
					}
					if (bodyAActiveEventIndex != -1 && bodyBActiveEventIndex != -1 && !isColliding) {
						bodyA.activeEvents.splice(bodyAActiveEventIndex, 1);
						bodyB.activeEvents.splice(bodyBActiveEventIndex, 1);
						bodyA.onCollisionLeave(bodyB);
						bodyB.onCollisionLeave(bodyA);
					}
				}
			}
		});
	}
}

export class RigidPoly extends RigidBody {

	lines: RigidLine[] = [];

	get points() { return this.lines.map(line => line.points[0]) }

	constructor(vector: Vector, points: Coord[], layerMask = LayerMask.default) {
		super(vector, layerMask);

		if(points.length < 3) throw new Error('A polygon must have at least 3 points');
		
		for (let i = 1; i < points.length; i++) {
			this.lines.push(new RigidLine([points[i-1], points[i]]));
		}
		this.lines.push(new RigidLine([points.last(), points[0]]))
	}

	onMouseEnter: MouseCollisionEvent = () => {};
	onMouseLeave: MouseCollisionEvent = () => {};
	onClick: MouseCollisionEvent = () => {};
	onCollisionEnter: CollisionEvent = () => {};
	onCollisionLeave: CollisionEvent = () => {};

	pointInside(point: Coord) {
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
	showHitbox() {
		/* let color = ctx.strokeStyle;
		ctx.strokeStyle = this.color;
		for (let i = 0; i < this.points.length; i++) {
			drawF.line(this.points[i], this.points[(i+1)%this.points.length]);
		}
		drawF.circle(this.coord, 3);
		ctx.strokeStyle = color; */
	}
}
export class RigidCirc extends RigidBody {

	get center() { return this.vector.coord }

	constructor(vector: Vector, public radius: number, layerMask = LayerMask.default) {
		super(vector, layerMask);
		this.radius = radius;
	}

	onMouseEnter: MouseCollisionEvent = () => {};
	onMouseLeave: MouseCollisionEvent = () => {};
	onClick: MouseCollisionEvent = () => {};
	onCollisionEnter: CollisionEvent = () => {};
	onCollisionLeave: CollisionEvent = () => {};

	detectCollision(rBody: RigidBody) {
		/* if (mathF.parentClass(rBody) == 'RigidRect') {
			console.log('Work In Progress');
			return false;
		}
		else if(mathF.parentClass(rBody) == 'RigidCirc') {
			let hitPoints = new Array();
			let d = Math.sqrt((this.coord.x - rCirc.coord.x) ** 2 + (this.coord.y - rCirc.coord.y) ** 2);
			if (d > this.radius + rCirc.radius) {
				return false;			
			}
			else {
				let x1 = this.coord.x, y1 = this.coord.y, r1 = this.radius;
				let x2 = rCirc.coord.x, y2 = rCirc.coord.y, r2 = rCirc.radius;
				let l = (r1**2 - r2**2 + d**2) / (2*d);
				let h = Math.sqrt(r1**2 - l**2);
				hitPoints.push(new Coord(l/d*(x2-x1) + h/d*(y2-y1) + x1, l/d*(y2-y1) - h/d*(x2-x1) + y1));
				hitPoints.push(new Coord(l/d*(x2-x1) - h/d*(y2-y1) + x1, l/d*(y2-y1) + h/d*(x2-x1) + y1));
			}
			return hitPoints;
		} */
		return false;
	}
	showHitbox() {
		/* let color = ctx.strokeStyle;
		ctx.strokeStyle = this.color;
		drawF.circle(this.coord, this.radius, 'stroke');
		drawF.circle(this.coord, 3);
		ctx.strokeStyle = color; */
	}
}
const rigidF = {
	/**
	 * Convert from unix timestamp to time.
	 * @param {RigirRect | RigidCirc} rBody1 The first rigidBody.
	 * @param {RigirRect | RigidCirc} rBody2 The second rigidBody.
	 * @return {boolean | array} 
	 * * false if they don't collide
	 * * an array with the coordinates of the intersections
	 * * an empty array if they are one inside the other without intersection 
	 */
	/* collision(rBody1, rBody2) {
		let hitPoints = new Array();
		//* rect and rect
		if (mathF.parentClass(rBody1) == 'RigidRect' && mathF.parentClass(rBody2) == 'RigidRect') {
			let line1, line2;
			for (let i = 0; i < rBody1.corners.length; i++) { //? get intersections
				line1 = new Line(rBody1.corners[i], rBody1.corners[(i+1) % rBody1.corners.length]);
				for (let i = 0; i < rBody2.corners.length; i++) {
					line2 = new Line(rBody2.corners[i], rBody2.corners[(i+1) % rBody2.corners.length]);
					if(line1.hitL(line2)) {
						hitPoints.push(line1.hitL(line2));
					}
				}
			}
			if (hitPoints.length == 0) { //todo add '&& point not inside' in condition
				return false;
			}
		}
		//* circ and circ
		else if (mathF.parentClass(rBody1) == 'RigidCirc' && mathF.parentClass(rBody2) == 'RigidCirc') {
			let d = Math.sqrt((rBody1.coord.x - rBody2.coord.x) ** 2 + (rBody1.coord.y - rBody2.coord.y) ** 2);
			if (d > rBody1.radius + rBody2.radius) { //? no intersections and outside
				return false;			
			}
			else if (d + rBody1.radius >= rBody2.radius && d + rBody2.radius >= rBody1.radius) { //? intersection
				let x1 = rBody1.coord.x, y1 = rBody1.coord.y, r1 = rBody1.radius;
				let x2 = rBody2.coord.x, y2 = rBody2.coord.y, r2 = rBody2.radius;
				let l = (r1**2 - r2**2 + d**2) / (2*d);
				let h = Math.sqrt(r1**2 - l**2);
				hitPoints.push(new Coord(l/d*(x2-x1) + h/d*(y2-y1) + x1, l/d*(y2-y1) - h/d*(x2-x1) + y1));
				hitPoints.push(new Coord(l/d*(x2-x1) - h/d*(y2-y1) + x1, l/d*(y2-y1) + h/d*(x2-x1) + y1));
			}
		}
		//* circ and rect
		else {
			//? define which one is rect and which one is circ
			let	rRect = mathF.parentClass(rBody1) == 'RigidRect'? rBody1 : rBody2;
			let	rCirc = mathF.parentClass(rBody1) == 'RigidCirc'? rBody1 : rBody2;
			if (coordF.dist(rRect.coord, rCirc.coord) > rRect.diagonal/2+rCirc.radius) { //? too far to possibly intersect, avoid useless computation
				return false;
			}
			//* (https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line)
			//* first detect closest point to circle on each line
			//* if distance <= radius, detect the 2 intersection using trigonometry
			//* to check if circle inside rectangle use tangent to determine the point on the line to use for the distance and compare D to distance circCenter-rectCenter
			let corn = rRect.corners;
			let D; //? has to prove it is outside
			for (let i = 0; i < corn.length; i++) {
				D = (corn[(i+1)%corn.length].x - corn[i].x) * (rCirc.coord.y - corn[i].y) - (rCirc.coord.x - corn[i].x) * (corn[(i+1)%rRect.corners.length].y - rRect.corners[i].y);
				if (D < 0) {
					hitPoints = false; //? center outside the circle
				}
			}
			return hitPoints;
		}
		return hitPoints;
	}, */
	/* closestPointRectCirc: (rRect, rCirc) => {
		let corn = rRect.corners, a, b, c, p1, p2, p = rCirc.coord, hitP;
		for (let i = 0; i < corn.length; i++) {
			p1 = corn[i];
			p2 = corn[(i+1)%corn.length];
			a = p1.y - p2.y;
			b = p2.x - p1.x;
			c = p1.x * p2.y - p2.x * p1.y;
			hitP = new Coord((b*(b*p.x-a*p.y)-a*c)/(a**2+b**2), (a*(a*p.y-b*p.x)-b*c)/(a**2+b**2));
			if (hitP.dist(p1) + hitP.dist(p2) > p1.dist(p2) + 0.001) {
				if (hitP.dist(p1) > hitP.dist(p2))
					hitP = p2;
				else
					hitP = p1;
			}
			hitPoints.push(hitP);
		}
		return hitPoints;
	}, */
	/* snap: (rBody, fixedBody) => {
		if (rigidF.collision(rBody, fixedBody)) {

		}
	},
	rayCast(coord, degr, rBodies) {

	} */
}

function pointInPoly(point: Coord, vs: unknown) {
	/* // pointInPoly algorithm from
	// https://observablehq.com/@tmcw/understanding-point-in-polygon

	var x = point.x, y = point.y;

	var inside = false;
	for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
		var xi = vs[i][0], yi = vs[i][1];
		var xj = vs[j][0], yj = vs[j][1];

		var intersect = ((yi > y) != (yj > y))
			&& (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
		if (intersect) inside = !inside;
	}

	return inside; */
};