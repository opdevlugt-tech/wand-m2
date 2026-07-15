import { describe, expect, it } from 'vitest';
import {
  dist,
  snapWorldAngle,
  snapAngleRelative,
  segmentsIntersect,
  wouldIntersect,
  polygonAreaM2,
  lengthM,
  pointFromPolar,
  distPointToSegment,
  hitTestWall,
  scaleFromTypedLength,
  wallSegments,
  cornerAngleDeg,
  isCanonicalAngle,
  nearestCanonicalAngle,
  moveNextForCornerAngle,
  snapCornerToCanonical,
  interiorExterior,
  cornerAngleAt,
  listNonCanonicalCorners,
  absorbErrorAtCorner,
  setSegmentLengthPx,
  doorGeometry,
  wallPiecesWithDoors,
  listPartitionCandidates,
  splitPolygonByPartition,
  planEqualDivision,
  splitIntoEqualParts,
} from '../src/geometry/math';
import type { Point } from '../src/geometry/types';

describe('dist / length', () => {
  it('dist 3-4-5', () => {
    expect(dist({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
  });

  it('lengthM with scale 50', () => {
    expect(lengthM({ x: 0, y: 0 }, { x: 50, y: 0 }, 50)).toBeCloseTo(1, 6);
  });
});

describe('snap angles', () => {
  it('snapWorldAngle to 45° grid', () => {
    const deg = (d: number) => (d * Math.PI) / 180;
    expect(snapWorldAngle(deg(40))).toBeCloseTo(deg(45), 6);
    expect(snapWorldAngle(deg(20))).toBeCloseTo(deg(0), 6);
    expect(snapWorldAngle(deg(100))).toBeCloseTo(deg(90), 6);
  });

  it('snapAngleRelative vs previous wall', () => {
    const prev = 0; // pointing +x
    const deg = (d: number) => (d * Math.PI) / 180;
    // want ~40° relative → 45°
    expect(snapAngleRelative(prev, deg(40))).toBeCloseTo(deg(45), 6);
    // want ~100° relative → 90°
    expect(snapAngleRelative(prev, deg(100))).toBeCloseTo(deg(90), 6);
    // previous at 90°, desire absolute ~135° → relative 45°
    expect(snapAngleRelative(deg(90), deg(130))).toBeCloseTo(deg(135), 6);
  });
});

describe('intersection', () => {
  it('detects crossing', () => {
    expect(
      segmentsIntersect(
        { a: { x: 0, y: 0 }, b: { x: 10, y: 10 } },
        { a: { x: 0, y: 10 }, b: { x: 10, y: 0 } },
      ),
    ).toBe(true);
  });

  it('shared endpoint is not crossing', () => {
    expect(
      segmentsIntersect(
        { a: { x: 0, y: 0 }, b: { x: 10, y: 0 } },
        { a: { x: 10, y: 0 }, b: { x: 10, y: 10 } },
      ),
    ).toBe(false);
  });

  it('wouldIntersect rejects diagonal across L', () => {
    const verts: Point[] = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
    ];
    // from (100,100) back across first edge
    expect(wouldIntersect(verts, { x: 50, y: -10 }, false)).toBe(true);
  });

  it('wouldIntersect allows normal next edge', () => {
    const verts: Point[] = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
    ];
    expect(wouldIntersect(verts, { x: 100, y: 100 }, false)).toBe(false);
  });
});

describe('polygonAreaM2', () => {
  it('unit square in px → 1 px²', () => {
    const sq = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ];
    // pxPerMeter = 1 → area m² = area px²
    expect(polygonAreaM2(sq, 1)).toBeCloseTo(1, 6);
  });

  it('50×50 px square at 50 px/m → 1 m²', () => {
    const sq = [
      { x: 0, y: 0 },
      { x: 50, y: 0 },
      { x: 50, y: 50 },
      { x: 0, y: 50 },
    ];
    expect(polygonAreaM2(sq, 50)).toBeCloseTo(1, 6);
  });

  it('100×50 px rect at 50 px/m → 2 m²', () => {
    const r = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 50 },
      { x: 0, y: 50 },
    ];
    expect(polygonAreaM2(r, 50)).toBeCloseTo(2, 6);
  });
});

describe('pointFromPolar', () => {
  it('length along +x', () => {
    const p = pointFromPolar({ x: 10, y: 10 }, 0, 5);
    expect(p.x).toBeCloseTo(15, 6);
    expect(p.y).toBeCloseTo(10, 6);
  });
});

describe('setSegmentLengthPx', () => {
  it('resizes wall by moving end', () => {
    const verts = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 50 },
    ];
    const next = setSegmentLengthPx(verts, 0, 50, false);
    expect(next).not.toBeNull();
    expect(dist(next![0], next![1])).toBeCloseTo(50, 5);
    expect(next![0]).toEqual({ x: 0, y: 0 });
  });

  it('works closed', () => {
    const verts = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
    ];
    const next = setSegmentLengthPx(verts, 0, 80, true);
    expect(next).not.toBeNull();
    expect(dist(next![0], next![1])).toBeCloseTo(80, 5);
  });
});

describe('doors', () => {
  it('doorGeometry places opening on wall', () => {
    const a = { x: 0, y: 0 };
    const b = { x: 100, y: 0 };
    const g = doorGeometry(a, b, 0.5, 0.9, 50); // 0.9m * 50 = 45px wide
    expect(g).not.toBeNull();
    expect(dist(g!.openA, g!.openB)).toBeCloseTo(45, 4);
    expect(g!.center.x).toBeCloseTo(50, 0);
  });

  it('wallPiecesWithDoors cuts a gap', () => {
    const a = { x: 0, y: 0 };
    const b = { x: 100, y: 0 };
    const pieces = wallPiecesWithDoors(a, b, [{ t: 0.5, widthM: 0.9 }], 50);
    expect(pieces.length).toBe(2);
    expect(pieces[0].a.x).toBeCloseTo(0, 5);
    expect(pieces[1].b.x).toBeCloseTo(100, 5);
  });
});

describe('partition split', () => {
  const square = [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 100, y: 100 },
    { x: 0, y: 100 },
  ];

  it('lists mid-mid candidates for square', () => {
    const c = listPartitionCandidates(square);
    expect(c.length).toBeGreaterThan(0);
    // opposite mids wall0-wall2 or wall1-wall3
    expect(c.some((x) => Math.abs(x.tA - 0.5) < 0.02 && Math.abs(x.tB - 0.5) < 0.02)).toBe(
      true,
    );
  });

  it('splits square into two rectangles', () => {
    const split = splitPolygonByPartition(square, 0, 0.5, 2, 0.5);
    expect(split).not.toBeNull();
    expect(split!.loopA.length).toBeGreaterThanOrEqual(3);
    expect(split!.loopB.length).toBeGreaterThanOrEqual(3);
    const a1 = polygonAreaM2(split!.loopA, 1);
    const a2 = polygonAreaM2(split!.loopB, 1);
    expect(a1 + a2).toBeCloseTo(10000, 0);
  });

  it('equal division by 2/3/4 preserves total area', () => {
    for (const n of [2, 3, 4] as const) {
      const plan = planEqualDivision(square, n, 'x');
      expect(plan).not.toBeNull();
      expect(plan!.cuts.length).toBe(n - 1);
      const parts = splitIntoEqualParts(square, n, 'x');
      expect(parts).not.toBeNull();
      expect(parts!.length).toBe(n);
      const sum = parts!.reduce((s, p) => s + polygonAreaM2(p, 1), 0);
      expect(sum).toBeCloseTo(10000, 0);
    }
  });
});

describe('hit-test + scale from typed length', () => {
  it('distPointToSegment midpoint', () => {
    expect(distPointToSegment({ x: 5, y: 3 }, { x: 0, y: 0 }, { x: 10, y: 0 })).toBeCloseTo(3, 6);
  });

  it('hitTestWall finds segment', () => {
    const verts: Point[] = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 80 },
    ];
    expect(hitTestWall({ x: 50, y: 2 }, verts, false, 8)).toBe(0);
    expect(hitTestWall({ x: 98, y: 40 }, verts, false, 8)).toBe(1);
  });

  it('wallSegments adds close edge when closed', () => {
    const verts: Point[] = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 10 },
    ];
    expect(wallSegments(verts, false)).toHaveLength(2);
    expect(wallSegments(verts, true)).toHaveLength(3);
  });

  it('scaleFromTypedLength: 100px = 2m → 50 px/m', () => {
    expect(scaleFromTypedLength(100, 2)).toBeCloseTo(50, 6);
  });

  it('scaleFromTypedLength rejects bad input', () => {
    expect(scaleFromTypedLength(0, 2)).toBeNull();
    expect(scaleFromTypedLength(100, 0)).toBeNull();
  });
});

describe('corner angles + meetfout correctie', () => {
  it('cornerAngleDeg right angle = 90', () => {
    expect(
      cornerAngleDeg({ x: 0, y: 0 }, { x: 0, y: 10 }, { x: 10, y: 10 }),
    ).toBeCloseTo(90, 5);
  });

  it('interiorExterior gives binnen + buiten for square corner', () => {
    const ie = interiorExterior({ x: 0, y: 0 }, { x: 0, y: 10 }, { x: 10, y: 10 }, 1);
    expect(ie.interiorDeg + ie.exteriorDeg).toBeCloseTo(360, 5);
    expect(ie.wallWedgeDeg).toBeCloseTo(90, 4);
  });

  it('isCanonicalAngle recognizes 45/90/135 and flags 87', () => {
    expect(isCanonicalAngle(90)).toBe(true);
    expect(isCanonicalAngle(45)).toBe(true);
    expect(isCanonicalAngle(135)).toBe(true);
    expect(isCanonicalAngle(87)).toBe(false);
  });

  it('nearestCanonicalAngle maps 87 → 90 and 120 → 135', () => {
    expect(nearestCanonicalAngle(87)).toBe(90);
    expect(nearestCanonicalAngle(50)).toBe(45);
    expect(nearestCanonicalAngle(120)).toBe(135);
  });

  it('moveNextForCornerAngle sets interior ~90°', () => {
    const skewed: Point[] = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 110, y: 80 },
    ];
    const fixed = moveNextForCornerAngle(skewed, 1, 90, false);
    expect(fixed).not.toBeNull();
    // wall wedge for convex 90 interior should be ~90
    expect(cornerAngleDeg(fixed![0], fixed![1], fixed![2])).toBeCloseTo(90, 3);
  });

  it('snapCornerToCanonical on closed start', () => {
    const verts: Point[] = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 5, y: 100 },
    ];
    const snapped = snapCornerToCanonical(verts, 0, true);
    expect(snapped).not.toBeNull();
    const after = cornerAngleAt(snapped!, 0, true);
    expect(after).not.toBeNull();
    expect(isCanonicalAngle(after!)).toBe(true);
  });

  it('listNonCanonicalCorners finds skewed close', () => {
    const verts: Point[] = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 8, y: 95 },
    ];
    const odd = listNonCanonicalCorners(verts, true);
    expect(odd.length).toBeGreaterThan(0);
  });

  it('absorbErrorAtCorner reduces odd corners elsewhere', () => {
    const verts: Point[] = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 8, y: 95 },
    ];
    const before = listNonCanonicalCorners(verts, true).length;
    const fixed = absorbErrorAtCorner(verts, 3);
    const oddAtOthers = listNonCanonicalCorners(fixed, true).filter((i) => i !== 3);
    // Prefer fewer odd corners outside absorb index
    expect(oddAtOthers.length).toBeLessThanOrEqual(before);
  });
});
