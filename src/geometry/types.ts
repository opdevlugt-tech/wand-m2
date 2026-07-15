export type Point = { x: number; y: number };

export type Segment = {
  a: Point;
  b: Point;
};

/** Open chain or closed polygon as ordered vertices (closed: last ≈ first is NOT duplicated). */
export type DrawingStatus = 'empty' | 'open' | 'drawing' | 'closed';

export type DrawingModel = {
  status: DrawingStatus;
  /** Corner points. When closed, polygon is vertices[0..n-1] without repeating first. */
  vertices: Point[];
  /** Live rubber-band end while pointer is down. */
  draftEnd: Point | null;
};
