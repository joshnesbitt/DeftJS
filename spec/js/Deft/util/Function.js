// Generated by CoffeeScript 1.3.1
/*
Copyright (c) 2012 [DeftJS Framework Contributors](http://deftjs.org)
Open source under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).
*/

/*
Jasmine test suite for Deft.util.Function
*/

describe('Deft.util.Function', function() {
  describe('spread()', function() {
    it('should create a new wrapper function that spreads the passed Array over the target function arguments', function() {
      var targetFunction, wrapperFunction;
      targetFunction = jasmine.createSpy('target function').andCallFake(function(a, b, c) {
        return "" + a + "," + b + "," + c;
      });
      wrapperFunction = Deft.util.Function.spread(targetFunction);
      expect(Ext.isFunction(wrapperFunction)).toBe(true);
      expect(wrapperFunction(['a', 'b', 'c'])).toBe('a,b,c');
      return expect(targetFunction).toHaveBeenCalledWith('a', 'b', 'c');
    });
    return it('should create a new wrapper that fails when passed a non-Array', function() {
      var targetFunction, wrapperFunction;
      targetFunction = jasmine.createSpy('target function');
      wrapperFunction = Deft.util.Function.spread(targetFunction);
      expect(Ext.isFunction(wrapperFunction)).toBe(true);
      expect(function() {
        return wrapperFunction('value');
      }).toThrow(new Error('Error spreading passed Array over target function arguments: passed a non-Array.'));
      return expect(targetFunction).not.toHaveBeenCalled();
    });
  });
  return describe('memoize()', function() {
    var expectedScope, hashFunction, memoFunction, sum, targetFunction;
    it('should return a new function that wraps the specified function (omitting the optional scope and hash function parameters) and caches the results for previously processed inputs', function() {
      var fibonacci, memoFunction, targetFunction;
      fibonacci = function(n) {
        if (n < 2) {
          return n;
        } else {
          return fibonacci(n - 1) + fibonacci(n - 2);
        }
      };
      targetFunction = jasmine.createSpy('target function').andCallFake(function() {
        expect(this).toBe(window);
        return fibonacci.apply(this, arguments);
      });
      memoFunction = Deft.util.Function.memoize(targetFunction);
      expect(memoFunction(12)).toBe(fibonacci(12));
      expect(targetFunction).toHaveBeenCalled();
      expect(memoFunction(12)).toBe(fibonacci(12));
      return expect(targetFunction.callCount).toBe(1);
    });
    it('should return a new function that wraps the specified function (to be executed in the scope specified via the scope parameter) and caches the results for previously processed inputs', function() {
      var expectedScope, fibonacci, memoFunction, targetFunction;
      fibonacci = function(n) {
        if (n < 2) {
          return n;
        } else {
          return fibonacci(n - 1) + fibonacci(n - 2);
        }
      };
      expectedScope = {};
      targetFunction = jasmine.createSpy('target function').andCallFake(function() {
        expect(this).toBe(expectedScope);
        return fibonacci.apply(this, arguments);
      });
      memoFunction = Deft.util.Function.memoize(targetFunction, expectedScope);
      expect(memoFunction(12)).toBe(fibonacci(12));
      expect(targetFunction).toHaveBeenCalled();
      expect(memoFunction(12)).toBe(fibonacci(12));
      return expect(targetFunction.callCount).toBe(1);
    });
    return it('should support memoizing functions that take multiple parameters using a hash function (specified via an optional parameter) to produce a unique caching key for those parameters', sum = function() {
      return Ext.Array.toArray(arguments).reduce(function(total, value) {
        return total + value;
      }, 0);
    }, expectedScope = {}, targetFunction = jasmine.createSpy('target function').andCallFake(function() {
      expect(this).toBe(expectedScope);
      return sum.apply(this, arguments);
    }), hashFunction = jasmine.createSpy('hash function').andCallFake(function(a, b, c) {
      expect(this).toBe(expectedScope);
      return Ext.Array.toArray(arguments).join('|');
    }), memoFunction = Deft.util.Function.memoize(targetFunction, expectedScope, hashFunction), expect(memoFunction(1, 2, 3)).toBe(sum(1, 2, 3)), expect(targetFunction).toHaveBeenCalled(), expect(memoFunction(1, 2, 3)).toBe(sum(1, 2, 3)), expect(targetFunction.callCount).toBe(1));
  });
});
