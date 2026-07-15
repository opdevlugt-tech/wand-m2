export type Point = { x: number; y: number };

export type Segment = {
  a: Point;
  b: Point;
};

/** Door opening on a wall, position along the wall as t∈(0,1). */
export type Door = {
  id: string;
  wallIndex: number;
  /** Center of door along wall, 0 = start vertex, 1 = end vertex. */
  t: number;
  /** Clear opening width in meters. */
  widthM: number;
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
