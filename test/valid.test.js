
suite('valid', function() {

  suite('init', function() {
    test('function exists', function() {
      assert.ok(typeof valid === 'function');
    });

    test('check function exists', function() {
      var test = new valid($('form'));
      assert.ok(typeof test.check === 'function');
    });

    test('validate function exists', function() {
      assert.ok(typeof valid.validate === 'function');
    });

    test('required function exists', function() {
      assert.ok(typeof valid.required === 'function');
    });

    test('email function exists', function() {
      assert.ok(typeof valid.email === 'function');
    });

    test('password function exists', function() {
      assert.ok(typeof valid.password === 'function');
    });

    test('passwordConfirm function exists', function() {
      assert.ok(typeof valid.passwordConfirm === 'function');
    });
  });

  suite('custom validator', function() {
    test('custom validator is function', function() {
      var test = new valid($('form'), {
        phone: function(input) {

        }
      });

      assert.ok(typeof valid.phone === 'function');
    });
  });

  suite('validations', function() {
    suite('validate', function() {
      test('should validate input with regex', function() {
        var result = valid.validate($('#validate input'), /Test/);
        assert.ok(result.valid);
      });
      test('should fail input with regex', function() {
        var result = valid.validate($('#validate input'), /Fail/);
        assert.ok(!result.valid);
      });
      test('should validate input with function', function() {
        var result = valid.validate($('#validate input'), function(input) {
          return input === 'Test';
        });
        assert.ok(result.valid);
      });
      test('should fail input with function', function() {
        var result = valid.validate($('#validate input'), function(input) {
          return input === 'Fail';
        });
        assert.ok(!result.valid);
      });
      test('should validate input with string', function() {
        var result = valid.validate($('#validate input'), 'Test');
        assert.ok(result.valid);
      });
      test('should fail input with string', function() {
        var result = valid.validate($('#validate input'), 'Fail');
        assert.ok(!result.valid);
      });
      test('should validate string with string', function() {
        var result = valid.validate('Test', 'Test');
        assert.ok(result.valid);
      });
    });

    suite('required', function() {
      test('should pass with text', function() {
        var result = valid.required($('#required .filled'));
        assert.ok(result.valid);
      });
      test('should fail with empty text', function() {
        var result = valid.required($('#required .empty'));
        assert.ok(!result.valid);
      });
    });

    suite('email', function() {
      test('should pass valid email', function() {
        var result = valid.email('someone@somewhere.com');
        assert.ok(result.valid);
      });
      test('should fail with invalid email', function() {
        var result = valid.email('invalid email');
        assert.ok(!result.valid);
      });
    });

    suite('password', function() {
      test('password should pass default method', function() {
        var result = valid.password('wqR2d4cnCveB');
        assert.ok(result.valid);
      });
      test('password should fail default method', function() {
        var result = valid.password('pass');
        assert.ok(!result.valid);
      });
      test('password should pass custom method', function() {
        var result = valid.password('wqR2d4cnCveB', function(text) {
          return text !== 'test';
        });
        assert.ok(result.valid);
      });
    });

    suite('passwordConfirm', function() {
      test('matching passwords should pass', function() {
        var result = valid.passwordConfirm('wqR2d4cnCveB', 'wqR2d4cnCveB');
        assert.ok(result.valid);
      });
      test('non-matching passwords should fail', function() {
        var result = valid.passwordConfirm('wqR2d4cnCveB', 'doesntwork');
        assert.ok(!result.valid);
      });
    });
  });

});
