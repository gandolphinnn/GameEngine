import { arrPivot } from '@gandolphinnn/utils';
import { Coord, Angle } from '@gandolphinnn/graphics';
import { Collision, LayerMask, RigidBody, RigidLine } from '..';

export function RayCast (
	origin: Coord,
	direction: Angle,
	maxDistance: number,
	layerMask = LayerMask.default,
) {
	const ray = new RigidLine([origin, new Coord(
		origin.x + direction.cos * maxDistance,
		origin.y + direction.sin * maxDistance
	)]);
	const bodies = RigidBody.getByLayerMask(layerMask);
	const distances: { rigidBody: RigidBody, point: Coord, distance: number}[] = [];
	for (const body of bodies) {
		const hit = new Collision(ray, body);
		if (!hit.doCollide) {continue;}

		const closest = Coord.getClosestTo(origin, ...hit.contacts);
		distances.push({ rigidBody: body, point: closest.coord, distance: closest.distance});
	}

	if (distances.length == 0) {return null;}

	const minDistance = Math.min(...arrPivot(distances).distance);
	return distances[minDistance];
}
