export type Point = { x: number; y: number };

export type Segment = {
  a: Point;
  b: Point;
};

/**
 * hinge: 'L' = scharnier bij openA, 'R' = openB.
 * swing: 1 = CCW 90°, -1 = CW 90°.
 */
export type Door = {
  id: string;
  wallIndex: number;
  t: number;
  widthM: number;
  hinge: 'L' | 'R';
  swing: 1 | -1;
};

/** Committed room polygon. */
export type Loop = {
  id: string;
  vertices: Point[];
  doors: Door[];
  /** Room type id from ROOM_CONFIG (single / double / other). */
  roomTypeId: string | null;
  /** Optional free label */
  name: string | null;
};

export type ActiveStatus = 'idle' | 'open' | 'drawing' | 'partition';

export type DrawingModel = {
  loops: Loop[];
  status: ActiveStatus;
  vertices: Point[];
  draftEnd: Point | null;
  /**
   * Free partition draft: points in world space.
   * First and last must snap to boundary of partitionLoopIndex.
   */
  partitionPath: Point[] | null;
  partitionLoopIndex: number | null;
};

export type Selection =
  | { kind: 'none' }
  | {
      kind: 'wall';
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
