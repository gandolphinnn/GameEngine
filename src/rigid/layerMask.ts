export class LayerMask {
	private constructor(
		public name: string
	) {
		if (!LayerMask.layerMasks.find(l => l.name == name))
			LayerMask._layerMasks.push(this);
	}

	private static _layerMasks: LayerMask[] = [];

	static get layerMasks() {
		//return Object.freeze(LayerMask._layerMasks);
		return LayerMask._layerMasks;
	}

	static getByName(name: string): LayerMask | undefined {
		return this.layerMasks.find(l => l.name == name);
	}
	static get default() { return new LayerMask("Default") }
}