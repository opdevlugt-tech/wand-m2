export type Point = { x: number; y: number };

export type Segment = {
  a: Point;
  b: Point;
};

/** Committed closed polygon (no repeated first vertex). */
export type Loop = {
  id: string;
  vertices: Point[];
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

/** Selection of a wall or corner on a committed loop or the active chain. */
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
    };
