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

      it('should add', function () {
        const testMap = [
          {a: new ph.vector.Vector(0, 0), b: new ph.vector.Vector(10, 0), expected: new ph.vector.Vector(10, 0), name: "only X"},
          {a: new ph.vector.Vector(0, 0), b: new ph.vector.Vector(0, 10), expected: new ph.vector.Vector(0, 10), name: "only Y"},

          {a: new ph.vector.Vector(0, 0), b: new ph.vector.Vector(3, 4), expected: new ph.vector.Vector(3, 4), name: "towards northwest"},
          {a: new ph.vector.Vector(0, 0), b: new ph.vector.Vector(-3, 4), expected: new ph.vector.Vector(-3, 4), name: "towards northeast"},
          {a: new ph.vector.Vector(0, 0), b: new ph.vector.Vector(-3, -4), expected: new ph.vector.Vector(-3, -4), name: "towards southeast"},
          {a: new ph.vector.Vector(0, 0), b: new ph.vector.Vector(3, -4), expected: new ph.vector.Vector(3, -4), name: "towards southwest"},
        ];

        testMap.forEach(function (testCase) {
          let pointA =  testCase.a.copy();
          let pointB = testCase.b.copy();

          assert.ok(ph.vector.NewVector(testCase.a, testCase.b.isValid()), `Case ${testCase.name} is not valid!`);

          assert.strictEqual(testCase.expected.toString(), pointA.add(testCase.b).toString(), `Case '${testCase.name}' failed`);
          assert.strictEqual(testCase.expected.toString(), pointB.add(testCase.a).toString(), `Case '${testCase.name}' failed reverse`);

          //the same value should be found moving all X coords or Y coords
          pointA =  testCase.a.copy();
          let expectedCopy = testCase.expected.copy();
          pointA.x += 10.5;
          // testCase.b.x += 10.5;
          expectedCopy.x += 10.5;


          assert.strictEqual(expectedCopy.toString(), pointA.add(testCase.b).toString(), `Case '${testCase.name}' failed (moving X)`);

          pointA =  testCase.a.copy();
          pointA.y += 10.5;
          // testCase.b.y += 10.5;
          testCase.expected.y += 10.5;
          assert.strictEqual(testCase.expected.toString(), pointA.add(testCase.b).toString(), `Case '${testCase.name}' failed (moving y)`)

        });
      });

      it('should retrieve perpendicular', function () {

        const testMap = [
          {original: new ph.vector.Vector(10, 0), expected_right: new ph.vector.Vector(0, -10), expected_left: new ph.vector.Vector(0, 10), name: "with zero"},

          {original: new ph.vector.Vector(-5, -5), expected_right: new ph.vector.Vector(-5, 5), expected_left: new ph.vector.Vector(5, -5), name: "negative values"},
          {original: new ph.vector.Vector(2, -5), expected_right: new ph.vector.Vector(-5, -2), expected_left: new ph.vector.Vector(5, 2), name: "one negative value"},

          {original: ph.vector.NORTH, expected_right: ph.vector.EAST, expected_left: ph.vector.WEST, name: "north"},
          {original: ph.vector.SOUTH, expected_right: ph.vector.WEST, expected_left: ph.vector.EAST, name: "south"},
          {original: ph.vector.EAST, expected_right: ph.vector.SOUTH, expected_left: ph.vector.NORTH, name: "east"},
          {original: ph.vector.WEST, expected_right: ph.vector.NORTH, expected_left: ph.vector.SOUTH, name: "west"},

        ];

        testMap.forEach(function (testCase) {
          assert.ok(testCase.original.isValid(), `Case ${testCase.name} is not valid!`);
          assert.strictEqual(testCase.expected_right.toString(),testCase.original.perpendicular().toString(), `Case '${testCase.name}' failed to right`);
          assert.strictEqual(testCase.expected_left.toString(),testCase.original.perpendicular(false).toString(), `Case '${testCase.name}' failed to left`);

        });
      });

      it('should retrieve angle', function () {

        const testMap = [
          {original: ph.vector.NORTH, expected_cos: 0, expected_sin: 1, name: "north"},
          {original: ph.vector.SOUTH, expected_cos: 0, expected_sin: -1, name: "south"},
          {original: ph.vector.EAST, expected_cos: 1, expected_sin: 0, name: "east"},
          {original: ph.vector.WEST, expected_cos: -1, expected_sin: 0, name: "west"},

          {original: new ph.vector.Vector(1, 1), expected_cos: 0.71, expected_sin: 0.71, name: "north"},
          {original: new ph.vector.Vector(-1, 1), expected_cos: -0.71, expected_sin: 0.71, name: "south"},
          {original: new ph.vector.Vector(-1, -1), expected_cos: -0.71, expected_sin: -0.71, name: "east"},
          {original: new ph.vector.Vector(1, -1), expected_cos: 0.71, expected_sin: -0.71, name: "west"},


        ];
        testMap.forEach(function (testCase) {
          assert.ok(testCase.original.isValid(), `Case ${testCase.name} is not valid!`);
          assert.strictEqual(testCase.expected_sin.toFixed(2),testCase.original.sin().toFixed(2), `Case '${testCase.name}' failed to sine`);
          assert.strictEqual(testCase.expected_cos.toFixed(2),testCase.original.cos().toFixed(2), `Case '${testCase.name}' failed to cosine`);

        });
      });

    });
  });
});