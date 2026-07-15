export type Point = { x: number; y: number };

export type Segment = {
  a: Point;
  b: Point;
};

/**
 * hinge: 'L' = scharnier bij openA (begin opening langs muur-richting),
 *        'R' = scharnier bij openB.
 * swing: 1 = 90° naar links t.o.v. muur-richting (CCW),
 *       -1 = 90° naar rechts (CW).
 */
export type Door = {
  id: string;
  wallIndex: number;
  /** Center of door along wall, 0 = start vertex, 1 = end vertex. */
  t: number;
  /** Clear opening width in meters. */
  widthM: number;
  hinge: 'L' | 'R';
  swing: 1 | -1;
};

/** Committed closed polygon (no repeated first vertex). */
export type Loop = {
  id: string;
  vertices: Point[];
  doors: Door[];
};

/** Active freehand chain (not yet a loop). */
export type ActiveStatus = 'idle' | 'open' | 'drawing';

export type DrawingModel = {
  loops: Loop[];
  status: ActiveStatus;
  /** Active open chain corners. */
  vertices: Point[];
  draftEnd: Point | null;
};

/** Selection of a wall, corner, or door. */
export type Selection =
  | { kind: 'none' }
  | {
      kind: 'wall';
      /** null = active chain */
      loopIndex: number | null;
      wallIndex: number;
    }
  | {
      kind: 'vertex';
      loopIndex: number | null;
      vertexIndex: number;
    }
  | {
      kind: 'door';
      loopIndex: number;
      doorId: string;
    };
