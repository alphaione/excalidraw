import "../utils/test-utils";
import {
  curve,
  curveClosestPoint,
  curveIntersectLine,
  curvePointDistance,
} from "./curve";
import { line } from "./line";
import { pointFrom } from "./point";

describe("Math curve", () => {
  describe("line intersection", () => {
    it("point is found when control points are the same", () => {
      const c = curve(
        pointFrom(100, 0),
        pointFrom(100, 100),
        pointFrom(100, 100),
        pointFrom(0, 100),
      );
      const l = line(pointFrom(0, 0), pointFrom(200, 200));

      expect(curveIntersectLine(c, l)).toCloselyEqualPoints([[87.5, 87.5]]);
    });

    it("point is found when control points aren't the same", () => {
      const c = curve(
        pointFrom(100, 0),
        pointFrom(100, 60),
        pointFrom(60, 100),
        pointFrom(0, 100),
      );
      const l = line(pointFrom(0, 0), pointFrom(200, 200));

      expect(curveIntersectLine(c, l)).toCloselyEqualPoints([[72.5, 72.5]]);
    });

    it("points are found when curve is sliced at 3 points", () => {
      const c = curve(
        pointFrom(-50, -50),
        pointFrom(10, -50),
        pointFrom(10, 50),
        pointFrom(50, 50),
      );
      const l = line(pointFrom(0, 112.5), pointFrom(90, 0));

      expect(curveIntersectLine(c, l)).toCloselyEqualPoints([
        [49.99999999999996, 49.99999999999997],
        [70.47732960327718, 24.403337995903534],
        [10.970762294018797, 98.78654713247653],
      ]);
    });

    it("regression 1", () => {
      const c = curve(
        // pointFrom(41.028864759926016, 12.226249068355052),
        // pointFrom(41.028864759926016, 33.55958240168839),
        // pointFrom(30.362198093259348, 44.22624906835505),
        // pointFrom(9.028864759926016, 44.22624906835505),
        pointFrom(41.02886475, 12.22624906),
        pointFrom(41.02886475, 33.5595824),
        pointFrom(30.362198093, 44.226249),
        pointFrom(9.02886475, 44.226249),
      );
      const l = line(
        pointFrom(-82.30963544324186, -41.19949363038283),

        pointFrom(188.2149592542487, 134.75505940984908),
      );

      expect(curveIntersectLine(c, l)).toCloselyEqualPoints([[8.5, 87.5]]);
    });
  });

  describe("point closest to other", () => {
    it("point can be found", () => {
      const c = curve(
        pointFrom(-50, -50),
        pointFrom(10, -50),
        pointFrom(10, 50),
        pointFrom(50, 50),
      );
      const p = pointFrom(0, 0);

      expect([curveClosestPoint(c, p)]).toCloselyEqualPoints([
        [5.965462100367372, -3.04104878946646],
      ]);
    });
  });

  describe("point shortest distance", () => {
    it("can be determined", () => {
      const c = curve(
        pointFrom(-50, -50),
        pointFrom(10, -50),
        pointFrom(10, 50),
        pointFrom(50, 50),
      );
      const p = pointFrom(0, 0);

      expect(curvePointDistance(c, p)).toBeCloseTo(6.695873043213627);
    });
  });
});
