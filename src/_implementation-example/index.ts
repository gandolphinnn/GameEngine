import { Game } from "@gandolphinnn/game";
import { TestObject } from "./GameObjects/TestObject.gameobject";

Game.start = () => {
	new TestObject();
}