define([
	'goo/math/Matrix2x2',
	'test/CustomMatchers'
], function (
	Matrix2x2,
	CustomMatchers
) {
	'use strict';

	describe('Matrix2x2', function () {
		beforeEach(function () {
			jasmine.addMatchers(CustomMatchers);
		});

		describe('constructor', function () {
			it('creates an identity matrix when given no parameters', function () {
				expect(new Matrix2x2()).toBeCloseToMatrix(Matrix2x2.IDENTITY);
			});

			it('creates a matrix when given 4 parameters', function () {
				var matrix = new Matrix2x2(11, 22, 33, 44);
				var expected = new Matrix2x2();

				for (var i = 0; i < 4; i++) {
					expected.data[i] = (i + 1) * 11;
				}

				expect(matrix).toBeCloseToMatrix(expected);
			});

			it('creates a matrix when given an array', function () {
				var matrix = new Matrix2x2([11, 22, 33, 44]);
				var expected = new Matrix2x2();

				for (var i = 0; i < 4; i++) {
					expected.data[i] = (i + 1) * 11;
				}

				expect(matrix).toBeCloseToMatrix(expected);
			});

			it('creates a matrix when given a matrix', function () {
				var original = new Matrix2x2();
				for (var i = 0; i < 4; i++) {
					original.data[i] = (i + 1) * 11;
				}

				var matrix = new Matrix2x2(original);

				var expected = new Matrix2x2();

				for (var i = 0; i < 4; i++) {
					expected.data[i] = (i + 1) * 11;
				}

				expect(matrix).toBeCloseToMatrix(expected);
			});
		});

		describe('mulPre', function () {
			it('can multiply this matrix with another matrix', function () {
				var a = new Matrix2x2(1, 2, 3, 4);
				var b = new Matrix2x2(2, 3, 5, 7);

				a.mulPre(b);

				expect(a).toBeCloseToMatrix(new Matrix2x2(12, 17, 24, 37));
			});
		});

		describe('mul2', function () {
			it('can multiply 2 matrices and store the result in this matrix', function () {
				var a = new Matrix2x2(1, 2, 3, 4);
				var b = new Matrix2x2(2, 3, 5, 7);
				var result = new Matrix2x2();

				result.mul2(a, b);

				expect(result).toBeCloseToMatrix(new Matrix2x2(11, 16, 24, 38));
			});
		});

		it('can be transposed', function () {
			var a = new Matrix2x2(1, 2, 3, 4);

			a.transpose();

			expect(a).toBeCloseToMatrix(new Matrix2x2(1, 3, 2, 4));
		});

		it('can be inverted', function () {
			var a = new Matrix2x2(1, 2, 3, 4);

			a.invert();

			expect(a).toBeCloseToMatrix(new Matrix2x2(-2, 1, 1.5, -0.5));
		});

		it('can determine orthogonality', function () {
			var a = new Matrix2x2(1, 2, 3, 4);
			var b = new Matrix2x2(0, 1, -1, 0);

			expect(a.isOrthogonal()).toEqual(false);
			expect(b.isOrthogonal()).toEqual(true);
		});

		it('can determine normality', function () {
			var a = new Matrix2x2(1, 2, 3, 4);
			var b = new Matrix2x2(0, 1, -1, 0);

			expect(a.isNormal()).toEqual(false);
			expect(b.isNormal()).toEqual(true);
		});

		it('can determine orthonormality', function () {
			var a = new Matrix2x2(1, 2, 3, 4);
			var b = new Matrix2x2(0, 1, -1, 0);

			expect(a.isOrthonormal()).toEqual(false);
			expect(b.isOrthonormal()).toEqual(true);
		});

		it('can compute determinants', function () {
			var a = new Matrix2x2(1, 2, 3, 4);

			expect(a.determinant()).toEqual(-2);
		});

		it('can be set to identity', function () {
			var a = new Matrix2x2();
			var b = new Matrix2x2(1, 2, 3, 4);

			b.setIdentity();

			expect(a).toEqual(Matrix2x2.IDENTITY);
			expect(b).toEqual(Matrix2x2.IDENTITY);
		});

		describe('add', function () {
			it('can add 2 matrices', function () {
				var a = new Matrix2x2(1, 2, 3, 4);
				var b = new Matrix2x2(2, 3, 5, 7);

				a.add(b);

				expect(a).toBeCloseToMatrix(new Matrix2x2(1 + 2, 2 + 3, 3 + 5, 4 + 7));
			});
		});

		describe('sub', function () {
			it('can subtract one matrix from another', function () {
				var a = new Matrix2x2(1, 2, 3, 4);
				var b = new Matrix2x2(2, 3, 5, 7);

				b.sub(a);

				expect(b).toBeCloseToMatrix(new Matrix2x2(2 - 1, 3 - 2, 5 - 3, 7 - 4));
			});
		});

		describe('copy', function () {
		    it('can copy from another matrix', function () {
    			var original = new Matrix2x2(11, 22, 33, 44);
    			var copy = new Matrix2x2(55, 66, 77, 88);
    			copy.copy(original);
    			expect(copy).toBeCloseToMatrix(new Matrix2x2(11, 22, 33, 44));
    		});
		});

		describe('clone', function () {
		    it('clones a matrix', function () {
    			var original = new Matrix2x2(11, 22, 33, 44);
    			var clone = original.clone();
    
    			expect(clone).toBeCloseToMatrix(original);
				expect(clone).not.toBe(original);
			});
		});
	});
});
