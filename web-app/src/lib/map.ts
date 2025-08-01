type Point = {
  x: number;
  y: number;
};

export function getCenterOfPoints(points: Point[]) {
  if (!points.length) {
    return {
      x: 0,
      y: 0,
    };
  }

  const sum = points.reduce(
    (acc, point) => ({
      x: acc.x + point.x,
      y: acc.y + point.y,
    }),
    { x: 0, y: 0 }
  );

  return {
    x: sum.x / points.length,
    y: sum.y / points.length,
  };
}
