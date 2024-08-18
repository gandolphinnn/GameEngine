import { Coord, MainCanvas } from "@gandolphinnn/graphics";
import { Game } from "@gandolphinnn/game";
import { PolygonTestObject } from "./GameObjects/TestObject.gameobject";

Game.start = () => {
	new PolygonTestObject(MainCanvas.center, [new Coord(0, 0), new Coord(100, 0), new Coord(100, 100), new Coord(0, 100)]);
}