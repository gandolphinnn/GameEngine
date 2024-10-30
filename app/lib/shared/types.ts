export interface GraphicCycle {
	Start(): void;
	Update(): void;
	Stop(): void;
}
export interface PhysicsCycle {
	Start(): void;
	FixedUpdate(): void;
	Stop(): void;
}
export interface GameCycle extends GraphicCycle, PhysicsCycle { }