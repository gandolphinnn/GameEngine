[Main docs](../../..//README.md#graphics)

# Graphics

This package have 2 source files: Style.ts and Index.ts.
Style.ts is used to modify the style of the CnvElements (see Index > CnvElements).
You don't need to import this file because it's already exported by Index.ts.
Index.ts contains multiple types, enums and classes to draw and write inside the canvas.
The HTML canvas is managed by the MainCanvas Singleton.
Coord, Angle.
TODO

### Style.ts
<details>
<summary>Color</summary>
The Color class represents a color in RGBA format (Red, Green, Blue, Alpha).
The class also has three getter methods: hexStr, rgbaStr, and rgbaObj, which return the color in hexadecimal string format, RGBA string format, and RGBA object format, respectively.

The Color class must be called using its static methods, since the constructor is private.
- The byName method creates a Color from a color name.
- The byStr method creates a Color from an RGBA string.
- The byValues method creates a Color from individual RGBA values.
- The byObj method creates a Color from an RGBA object.
- The default method creates a Color using the default color (black, but can be modified).
</details>

<details>
<summary>Style</summary>
The Style class represents a style that can be applied to a canvas element.
It has 5 main properties: fillStyle, strokeStyle, lineWidth, textAlign, and font:
<table>
	<thead>
		<tr>
			<th>Property</th>
			<th>Type</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>fillStyle</td>
			<td>SubStyle</td>
		</tr>
		<tr>
			<td>strokeStyle</td>
			<td>SubStyle</td>
		</tr>
		<tr>
			<td>lineWidth</td>
			<td>number</td>
		</tr>
		<tr>
			<td>textAlign</td>
			<td>string</td>
		</tr>
		<tr>
			<td>font</td>
			<td>string</td>
		</tr>
	</tbody>
</table>

The SubStyle type is a union type that can be a Color, CanvasGradient, or CanvasPattern.

The Style class can also perform merge operations with other Style instances using the merge method: it is used to override the properties of the current Style with the properties of another Style.
Undefined properties are not overridden, null properties set the merged property to undefind.
The empty and default methods create an empty and default Style, respectively.
These methods return the Style instance itself, allowing the methods to be chained together.
</details>

<a name="index"></a>

### Index.ts
TODO
<details>
<summary>RenderAction</summary>
An enum used by every CnvElement to 
</details>
<details>
<summary>Size</summary>

</details>
<details>
<summary>Coord</summary>

</details>
<details>
<summary>Angle</summary>

</details>
<details>
<summary>Mesh</summary>
A group of CnvElements with a user-defined center.
</details>
<details>
<summary>CnvElement</summary>
CnvDrawing is an abstract child of CnvElement and is the parent of all of the following classes, Text excluded.
	<table>
		<thead>
			<tr>
				<th>Class</th>
				<th colspan="6">Constructor</th>
				<th>Default RenderAction</th>
				<th colspan="2">Example</th>
			</tr>
		</thead>
		<tbody style="font-size:14px">
			<tr>
				<td>Text</td>
				<td colspan="3">center: Coord</td>
				<td colspan="3">content: string</td>
				<td>Fill</td>
				<td><img src="demos/demo_text1.png"></td>
				<td><img src="demos/demo_text2.png"></td>
			</tr>
			<tr>
				<td>Line</td>
				<td colspan="3">point1: Coord</td>
				<td colspan="3">point2: Coord</td>
				<td>Stroke</td>
				<td colspan="2"><img src="demos/demo_line.png"></td>
			</tr>
			<tr>
				<td>Rect</td>
				<td colspan="3">center: Coord</td>
				<td colspan="3">size: Size</td>
				<td>Both</td>
				<td colspan="2"><img src="demos/demo_rect.png"></td>
			</tr>
			<tr>
				<td>Poly</td>
				<td colspan="6">...points: Coord[]</td>
				<td>Both</td>
				<td colspan="2"><img src="demos/demo_poly.png"></td>
			</tr>
			<tr>
				<td>Circle</td>
				<td colspan="3">center: Coord</td>
				<td colspan="3">radius: number</td>
				<td>Both</td>
				<td colspan="2"><img src="demos/demo_circle.png"></td>
			</tr>
			<tr>
				<td>Arc</td>
				<td>center: Coord</td>
				<td>radius: number</td>
				<td>start: Angle</td>
				<td>end: Angle</td>
				<td>counterClockwise = true</td>
				<td>cutByCenter = true</td>
				<td>Both</td>
				<td><img src="demos/demo_arc1.png"></td>
				<td><img src="demos/demo_arc2.png"></td>
			</tr>
		</tbody>
	</table>
</details>