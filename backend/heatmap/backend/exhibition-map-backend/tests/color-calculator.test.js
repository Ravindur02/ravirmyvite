const { getHeatmapColor } = require('../routes/heatmap');

describe('Heatmap Color Calculation', () => {
  test('should return green for low capacity (<50%)', () => {
    expect(getHeatmapColor(25, 100)).toBe('#22c55e'); // 25%
    expect(getHeatmapColor(49, 100)).toBe('#22c55e'); // 49%
  });

  test('should return yellow for medium capacity (50-80%)', () => {
    expect(getHeatmapColor(50, 100)).toBe('#ffbf00ff'); // 50%
    expect(getHeatmapColor(79, 100)).toBe('#ffbf00ff'); // 79%
  });

  test('should return orange for high capacity (80-90%)', () => {
    expect(getHeatmapColor(80, 100)).toBe('#f97816ff'); // 80%
    expect(getHeatmapColor(89, 100)).toBe('#f97816ff'); // 89%
  });

  test('should return red for critical capacity (>90%)', () => {
    expect(getHeatmapColor(90, 100)).toBe('#ff0000ff'); // 90%
    expect(getHeatmapColor(95, 100)).toBe('#ff0000ff'); // 95%
    expect(getHeatmapColor(100, 100)).toBe('#ff0000ff'); // 100%
  });

  test('should return gray for invalid capacity', () => {
    expect(getHeatmapColor(10, 0)).toBe('#cccccc'); // zero capacity
    expect(getHeatmapColor(10, -5)).toBe('#cccccc'); // negative capacity
  });
});