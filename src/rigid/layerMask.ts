export class LayerMask {
	constructor(
		public name: string
	) {
		if (!LayerMask.getByName(name))
			LayerMask._layerMasks.push(this);
	}

	private static _layerMasks: LayerMask[] = [];
	static init() {
		LayerMask._layerMasks ??= [
			new LayerMask("Default"),
		];
	}

	static get layerMasks() {
		return Object.freeze(LayerMask._layerMasks);
	}

	static getByName(name: string): LayerMask | undefined {
		return this.layerMasks.find(l => l.name == name);
	}
	static get default() { return this.getByName("Default") }
}