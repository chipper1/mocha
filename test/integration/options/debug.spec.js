'use strict';

var helpers = require('../helpers');
var invokeMocha = helpers.invokeMocha;
var DEFAULT_FIXTURE = helpers.DEFAULT_FIXTURE;

describe('--debug', function() {
  describe('Node.js v8+', function() {
    before(function() {
      if (process.version.substring(0, 2) === 'v6') {
        this.skip();
      }
    });

    it('should invoke --inspect', function(done) {
      invokeMocha(
        ['--debug', DEFAULT_FIXTURE],
        function(err, res) {
          if (err) {
            return done(err);
          }
          expect(res, 'to have passed').and(
            'to contain output',
            /Debugger listening/i
          );
          done();
        },
        {stdio: 'pipe'}
      );
    });
  });

  describe('Node.js v6', function() {
    before(function() {
      if (process.version.substring(0, 2) !== 'v6') {
        this.skip();
      }
    });

    it('should start native debugger', function(done) {
      var proc = invokeMocha(
        ['--debug', DEFAULT_FIXTURE],
        function(err, res) {
          if (err) {
            return done(err);
          }
          expect(res, 'to have passed').and(
            'to contain output',
            /Debugger listening/i
          );
          done();
        },
        {stdio: 'pipe'}
      );

      // native debugger must be manually killed
      setTimeout(function() {
        proc.kill('SIGINT');
      }, 500);
    });
  });
});
