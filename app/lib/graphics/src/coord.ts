import { arrPivot, overflow, rand0 } from '@gandolphinnn/utils';
import Enumerable from 'linq';
import { Angle, Circle, MainCanvas, POINT_DEFAULT } from '.';

export type Size = {
	width: number;
	height: number;
}

export class Coord {
	/**
	 * Check if the coordinate is visible on the canvas
	 */
	get isVisible() {
		return this.x >= 0
			&& this.y >= 0
			&& this.x <= MainCanvas.cnv.width
			&& this.y <= MainCanvas.cnv.height
	}

	constructor(
		public x: number,
		public y: number
	) {
	}

	/**
	 * Return a new Coord with the same x and y
	 */
	copy() { return new Coord(this.x, this.y) }

	/**
	 * Sum x/y to THIS coordinate
	 */
	sumXY(x: number, y: number) {
		this.x += x;
		this.y += y;
		return this;
	}

	/**
	 * Move this coordinate to another without reference
	 */
	moveTo(coord: Coord) {
		this.x = coord.x;
		this.y = coord.y;
		return this;
	}

	render() {
		POINT_DEFAULT.center = this.copy();
		POINT_DEFAULT.render();
	}
	
	/**
	 * Get a default coordinate (0, 0)
	 */
	static get origin() {
		return new Coord(0, 0);
	}

	static random() {
		return new Coord(rand0(MainCanvas.cnv.width), rand0(MainCanvas.cnv.height));
	}

	/**
	 * Get a new coordinate with the sum of x/y
	 */
	static sumXY(coord: Coord, x: number, y: number) {
		return new Coord(coord.x + x, coord.y + y)
	}

	/**
	 * Sum every coordinate
	 */
	static sum(...coords: Coord[]) {
		return coords.reduce((acc, curr) => new Coord(acc.x + curr.x, acc.y + curr.y), Coord.origin);
	}

	/**
	 * Get the center of multiple coordinates
	 */
	static center(...coords: Coord[]) {
		return new Coord(this.sum(...coords).x/coords.length, this.sum(...coords).y/coords.length);
	}

	/**
	 * The x/y difference between 2 points. Order matters
	 */
	static difference(coord1: Coord, coord2: Coord) {
		return {x: coord2.x - coord1.x, y: coord2.y - coord1.y};
	}

	/**
	 * The width/height size of an area defined by multiple points
	 */
	static size(...coords: Coord[]) {
		const pivoted: { x: number[], y: number[] } = arrPivot(coords);	
		const cMax = new Coord(Math.max(...pivoted.x), Math.max(...pivoted.y));
		const cMin = new Coord(Math.min(...pivoted.x), Math.min(...pivoted.y));
		return {width: Math.abs(cMax.x - cMin.x), height: Math.abs(cMax.y - cMin.y)} as Size;
	}

	/**
	 * Diagonal distance between 2 points
	 */
	static distance(coord1: Coord, coord2: Coord) {
		return Math.sqrt(((coord1.x - coord2.x) ** 2) + ((coord1.y - coord2.y) ** 2));
	}

	/**
	 * Get the closest point to a reference coordinate with the distance
	 */
	static getClosestTo(reference: Coord, ...coords: Coord[]): { coord: Coord, distance: number } {
		const distances = coords.map(coord => this.distance(reference, coord));
		const minIndex = distances.indexOf(Math.min(...distances));
		return { coord: coords[minIndex], distance: distances[minIndex] };
	}

	/**
	 * Get the farthest point from a reference coordinate with the distance
	 */
	static getFarthestFrom(reference: Coord, ...coords: Coord[]): { coord: Coord, distance: number } {
		const distances = coords.map(coord => this.distance(reference, coord));
		const maxIndex = distances.indexOf(Math.max(...distances));
		return { coord: coords[maxIndex], distance: distances[maxIndex] };
	}

	/**
	 * Rotate some coordinates around a center by an angle
	 */
	static rotate(center: Coord, angle: Angle, ...coords: Coord[]): Coord[] {
		return coords.map(coord => {
			const x = center.x + (coord.x - center.x) * angle.cos - (coord.y - center.y) * angle.sin;
			const y = center.y + (coord.x - center.x) * angle.sin + (coord.y - center.y) * angle.cos;
			return new Coord(x, y);
		});
	}

	/**
	 * Generate the coordinates of all the points of a regular polygon
	 */
	static regularPoly(center: Coord, numberOfCoord: number, distance: number) {
		const angle = 2 * Math.PI / numberOfCoord;
		return Enumerable.range(0, numberOfCoord).select(i => new Coord(Math.cos(i * angle) * distance + center.x, Math.sin(i * angle) * distance + center.y)).toArray();
	}

	/**
	 * Get the circle that encircles all the points
	 */
	static encircle(...points: Coord[]) {
		let maxDist = -1;
		let center: Coord;
		for (let i = 0; i < points.length; i++) {
			const p1 = points[i];
			const p2 = points[overflow(i + 1, 0, points.length)];
			const distance = this.distance(p1, p2);
			if (distance > maxDist) {
				maxDist = distance;
				center = this.center(p1, p2);
			}
		}
		return new Circle(center, maxDist / 2);
	}

	/**
	 * Generate the coordinates of all the points of a star
	 */
	static starPoints(center: Coord, radius: number, points: number, innerRadius: number) {
		const angle = Math.PI / points;
		const coords = [];
		for (let i = 0; i < 2 * points; i++) {
			const r = i % 2 == 0 ? radius : innerRadius;
			coords.push(new Coord(center.x + r * Math.cos(i * angle), center.y + r * Math.sin(i * angle)));
		}
		return coords;
	}
};