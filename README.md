# Logifaces solver

Generates solutions for Logifaces [original](https://www.logifaces.com/product-page/copy-of-logifaces-original-16-pcs-game-concrete) and [miracle edition](https://www.logifaces.com/product-page/logifaces-miracle-edition) games

Run `npm start` to generate solution jsons in the `/solution` folder, for each shape on [logifaces.jpg](./logifaces.jpg)

Solutions are an array of [placed triangles](./src/placed-triangle.ts). They can be read according to [grid.jpg](./grid.jpg):

-   `place` is coded as the black script
-   `triangle` block (numbers denote hight clockwise) is placed according to the green arrows, corner with first hight where arrow starts if `rotation` is zero
-   `rotation` codes rotation of the triangle clockwise, along the green arrow

If you want to solve another logifaces set, or another shape with the same set, expand the existing datasets or add new ones in the (data folder)[./data]
