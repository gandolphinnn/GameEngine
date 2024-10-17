export interface GameCycle {
	Start(): void;
	Update(): void;
	FixedUpdate?(): void;
}