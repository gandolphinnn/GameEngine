import { Vector, Impulse } from '@gandolphinnn/rigid';
import { Angle, Color, MainCanvas } from '@gandolphinnn/graphics';

const v1 = new Impulse(Angle.up(), 200);
new Vector(MainCanvas.center, v1.angle, v1.strength).render();

const v2 = new Impulse(Angle.left(), 100);
new Vector(MainCanvas.center, v2.angle, v2.strength).render();

const v3 = new Impulse(Angle.left(), 100);
new Vector(MainCanvas.center, v3.angle, v3.strength).render();

const vSum = Impulse.sum(v1, v2, v3);
new Vector(MainCanvas.center, vSum.angle, vSum.strength).render(true, Color.byName('Green'));