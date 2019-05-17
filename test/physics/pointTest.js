'use strict';

const assert = require('assert');
const ph = require('../../physics/all');

describe('Point', function () {
  describe('distance', function () {

    it('should find the expected distance', function () {
      const testMap = [
        {a: new ph.point.Point(0, 0), b: new ph.point.Point(10, 0), expected: 10, name: "only X"},
        {a: new ph.point.Point(0, 0), b: new ph.point.Point(0, 10), expected: 10, name: "only Y"},
        {a: new ph.point.Point(10, 10), b: new ph.point.Point(10, 10), expected: 0, name: "same point"},
        {a: new ph.point.Point(0, 0), b: new ph.point.Point(3, 4), expected: 5, name: "towards northwest"},
        {a: new ph.point.Point(0, 0), b: new ph.point.Point(-3, 4), expected: 5, name: "towards northeast"},
        {a: new ph.point.Point(0, 0), b: new ph.point.Point(-3, -4), expected: 5, name: "towards southeast"},
        {a: new ph.point.Point(0, 0), b: new ph.point.Point(3, -4), expected: 5, name: "towards southwest"},
      ];

      testMap.forEach(function (testCase) {
        assert.strictEqual(testCase.expected, testCase.a.distanceTo(testCase.b), `Case ${testCase.name} failed`)
        //the same value should be found from B to A
        assert.strictEqual(testCase.expected, testCase.b.distanceTo(testCase.a), `Case ${testCase.name} failed (backwards)`);

        //the same value should be found moving all X coords or Y coord
        testCase.a.x += 10.23;
        testCase.b.x += 10.23;
        assert.strictEqual(testCase.expected, testCase.b.distanceTo(testCase.a), `Case ${testCase.name} failed (moving X)`);

        testCase.a.y += 10.23;
        testCase.b.y += 10.23;
        assert.strictEqual(testCase.expected, testCase.b.distanceTo(testCase.a), `Case ${testCase.name} failed (moving y)`)
      });
    });

  });
  describe('middle point', function () {

    it('should find the expected point', function () {
      const testMap = [
        {a: new ph.point.Point(0, 0), b: new ph.point.Point(10, 0), expected: new ph.point.Point(5, 0), name: "only X"},
        {a: new ph.point.Point(0, 0), b: new ph.point.Point(0, 10), expected: new ph.point.Point(0, 5), name: "only Y"},
        {a: new ph.point.Point(10, 10), b: new ph.point.Point(10, 10), expected: new ph.point.Point(10, 10), name: "same point"},
        {a: new ph.point.Point(0, 0), b: new ph.point.Point(300, 400), expected: new ph.point.Point(150, 200), name: "towards northwest"},
        {a: new ph.point.Point(0, 0), b: new ph.point.Point(-300, 400), expected: new ph.point.Point(-150, 200), name: "towards northeast"},
        {a: new ph.point.Point(0, 0), b: new ph.point.Point(-300, -400), expected: new ph.point.Point(-150, -200), name: "towards southeast"},
        {a: new ph.point.Point(0, 0), b: new ph.point.Point(300, -400), expected: new ph.point.Point(150, -200), name: "towards southwest"},
      ];

      testMap.forEach(function (testCase) {
        assert.strictEqual(testCase.expected.toString(), testCase.a.middlePointTo(testCase.b).toString(), `Case ${testCase.name} failed`)
        assert.strictEqual(testCase.expected.toString(), testCase.b.middlePointTo(testCase.a).toString(), `Case ${testCase.name} failed (backwards)`)

        //the same value should be found moving all X coords or Y coords
        testCase.a.x += 10.23;
        testCase.b.x += 10.23;
        testCase.expected.x += 10;
        assert.strictEqual(testCase.expected.toString(), testCase.b.middlePointTo(testCase.a).toString(), `Case ${testCase.name} failed (moving X)`);

        testCase.a.y += 10.23;
        testCase.b.y += 10.23;
        testCase.expected.y += 10;
        assert.strictEqual(testCase.expected.toString(), testCase.b.middlePointTo(testCase.a).toString(), `Case ${testCase.name} failed (moving y)`)

      });
    });

  });
});