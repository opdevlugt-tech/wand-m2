import { describe, expect, it } from 'vitest';
import {
  buildBom,
  distPointToPolyline,
  formatBomQty,
  polylineLengthM,
} from '../src/install/bom';
import type { InstallRun, PlacedInstall } from '../src/config/installations';

describe('polylineLengthM', () => {
  it('3-4-5 at 50 px/m = 0.1 m', () => {
    expect(polylineLengthM([{ x: 0, y: 0 }, { x: 3, y: 4 }], 50)).toBeCloseTo(0.1, 6);
  });
  it('empty / single = 0', () => {
    expect(polylineLengthM([], 50)).toBe(0);
    expect(polylineLengthM([{ x: 0, y: 0 }], 50)).toBe(0);
  });
});

describe('distPointToPolyline', () => {
  it('on segment = 0', () => {
    expect(
      distPointToPolyline({ x: 5, y: 0 }, [
        { x: 0, y: 0 },
        { x: 10, y: 0 },
      ]),
    ).toBeCloseTo(0, 6);
  });
  it('offset from segment', () => {
    expect(
      distPointToPolyline({ x: 5, y: 3 }, [
        { x: 0, y: 0 },
        { x: 10, y: 0 },
      ]),
    ).toBeCloseTo(3, 6);
  });
});

describe('buildBom', () => {
  const installs: PlacedInstall[] = [
    { id: 'I1', defId: 'el-socket-pe', x: 0, y: 0, loopId: null, note: '' },
    { id: 'I2', defId: 'el-socket-pe', x: 1, y: 0, loopId: null, note: '' },
    { id: 'I3', defId: 'el-floor-pass', x: 2, y: 0, loopId: null, note: '' },
  ];
  const runs: InstallRun[] = [
    {
      id: 'R1',
      defId: 'el-cable-empty',
      points: [
        { x: 0, y: 0 },
        { x: 50, y: 0 }, // 1 m at 50 px/m
      ],
    },
    {
      id: 'R2',
      defId: 'el-cable-empty',
      points: [
        { x: 0, y: 0 },
        { x: 25, y: 0 }, // 0.5 m
      ],
    },
  ];

  it('counts stuks + meters', () => {
    const bom = buildBom(installs, runs, 50);
    const wcd = bom.find((b) => b.defId === 'el-socket-pe');
    const ll = bom.find((b) => b.defId === 'el-cable-empty');
    const dv = bom.find((b) => b.defId === 'el-floor-pass');
    expect(wcd?.qty).toBe(2);
    expect(wcd?.unit).toBe('st');
    expect(ll?.qty).toBeCloseTo(1.5, 6);
    expect(ll?.unit).toBe('m');
    expect(dv?.qty).toBe(1);
  });

  it('formatBomQty NL', () => {
    expect(formatBomQty({ defId: 'x', label: '', code: '', qty: 2, unit: 'st' })).toBe('2 st');
    expect(formatBomQty({ defId: 'x', label: '', code: '', qty: 1.5, unit: 'm' })).toBe('1,5 m');
  });
});
