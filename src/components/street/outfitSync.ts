/* The outfit ChibiHero is currently showing, readable outside React. The fold
   backdrop reads this once per frame to steer its shader uniforms — a mutable
   slot on purpose: driving it through React state would re-render the page
   sixty times a second for a colour that only a uniform needs. */
export const activeOutfit = { index: 0 };
