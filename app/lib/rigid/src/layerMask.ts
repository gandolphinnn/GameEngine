export class LayerMask {
	private constructor(
		public name: string
	) {
	}

	private static _layerMasks: LayerMask[] = [];
	static get layerMasks() {
		//return Object.freeze(LayerMask._layerMasks);
		return LayerMask._layerMasks;
	}

	static get(name: string) {
		const layerMask = LayerMask._layerMasks.find(l => l.name == name);
		if (layerMask) return layerMask;

		const newLayerMask = new LayerMask(name);
		LayerMask._layerMasks.push(newLayerMask);
		return newLayerMask;
	}
	static get default() { return new LayerMask('Default') }
}