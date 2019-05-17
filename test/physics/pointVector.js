'use strict';

const assert = require('assert');
const ph = require('../../physics/all');

describe('Vector', function () {
  describe('public creator', function () {

    it('should create a vector based on points', function () {
      const testMap = [
        {a: new ph.point.Point(0, 0), b: new ph.point.Point(10, 0), expected: new ph.vector.Vector(10, 0), name: "only X"},
        {a: new ph.point.Point(0, 0), b: new ph.point.Point(0, 10), expected: new ph.vector.Vector(0, 10), name: "only Y"},

        {a: new ph.point.Point(0, 0), b: new ph.point.Point(3, 4), expected: new ph.vector.Vector(3, 4), name: "towards northwest"},
        {a: new ph.point.Point(0, 0), b: new ph.point.Point(-3, 4), expected: new ph.vector.Vector(-3, 4), name: "towards northeast"},
        {a: new ph.point.Point(0, 0), b: new ph.point.Point(-3, -4), expected: new ph.vector.Vector(-3, -4), name: "towards southeast"},
        {a: new ph.point.Point(0, 0), b: new ph.point.Point(3, -4), expected: new ph.vector.Vector(3, -4), name: "towards southwest"},
      ];

      testMap.forEach(function (testCase) {
        assert.ok(ph.vector.NewVector(testCase.a, testCase.b).isValid(), `Case ${testCase.name} is not valid!`);
        assert.strictEqual(testCase.expected.toString(), ph.vector.NewVector(testCase.a, testCase.b).toString(), `Case ${testCase.name} failed`);
        assert.notStrictEqual(testCase.expected.toString(), ph.vector.NewVector(testCase.b, testCase.a).toString(), `Case ${testCase.name} failed reverse`);

        //the same value should be found moving all X coords or Y coords
        testCase.a.x += 10.23;
        testCase.b.x += 10.23;
        assert.strictEqual(testCase.expected.toString(), ph.vector.NewVector(testCase.a, testCase.b).toString(), `Case ${testCase.name} failed (moving X)`);

        testCase.a.y += 10.23;
        testCase.b.y += 10.23;
        assert.strictEqual(testCase.expected.toString(), ph.vector.NewVector(testCase.a, testCase.b).toString(), `Case ${testCase.name} failed (moving y)`)

      });
    });

    describe('methods', function () {
      it('should identify invalid attributes', function () {
        const testMap = [
          {coord: null , name: "null attribute"},
          {coord: undefined , name: "undefined attribute"},
          {coord: NaN , name: "NaN attribute"},
          {coord: "string" , name: "string attribute"},
          {coord: "" , name: "empty string attribute"},
          {coord: 0/0 , name: "infinity 0/0 attribute"},
          {coord: 1/0 , name: "infinity 1/0 attribute"},
          {coord: -1/0 , name: "infinity -1/0 attribute"},
        ];

        const validCoord = 10;
        testMap.forEach(function (testCase) {
          assert.ok(!new ph.vector.Vector(testCase.coord, validCoord).isValid(), `Case ${testCase.name} failed X`);
          assert.ok(!new ph.vector.Vector(validCoord, testCase.coord).isValid(), `Case ${testCase.name} failed y`);
          assert.ok(!new ph.vector.Vector(testCase.coord, testCase.coord).isValid(), `Case ${testCase.name} failed both`);
        });
      });

      it('should identify invalid vector', function () {
        assert.ok(!new ph.vector.Vector(0, 0).isValid());
      });

      it('should invert', function () {
          const testMap = [
            {original: new ph.vector.Vector(1, 0), inverted: new ph.vector.Vector(-1, 0), name: "only one greater than zero "},
            {original: new ph.vector.Vector(-1, 5), inverted: new ph.vector.Vector(1, -5), name: "one negative"},
            {original: new ph.vector.Vector(-2, -5), inverted: new ph.vector.Vector(2, 5), name: "two negatives"},
            {original: new ph.vector.Vector(45, 45), inverted: new ph.vector.Vector(-45, -45), name: "two equals"},
            {original: new ph.vector.Vector(-45, 45), inverted: new ph.vector.Vector(45, -45), name: "inverse sign"},
          ];

          testMap.forEach(function (testCase) {
            assert.ok(testCase.original.isValid(), `Case ${testCase.name} original is not valid!`);
            assert.ok(testCase.inverted.isValid(), `Case ${testCase.name} inverted is not valid!`);

            assert.strictEqual(testCase.inverted.toString(), testCase.original.invert().toString(), `Case ${testCase.name} failed`);
            assert.notStrictEqual(testCase.inverted.toString(), testCase.original.invert().toString(), `Case ${testCase.name} failed reverse`);

          });
      });
    });
  });
});