/**
 * Compress CSS files.
 *
 * ---------------------------------------------------------------
 *
 * Minifies css files and places them into .tmp/public/min directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-cssmin
 */
module.exports = function(grunt) {

	grunt.config.set('browserify', {
		dist: {
        options: {
               transform: [
                  ["babelify", {
                     loose: "all"
                  }]
               ]
            },
        files: {
          '.tmp/public/static/js/browserify/index.js': [ '.tmp/public/static/js/browserify/index/**/*.js'],
          '.tmp/public/static/js/browserify/dashboard.js': [ '.tmp/public/static/js/browserify/dashboard/**/*.js'],
          '.tmp/public/static/js/browserify/account.js': [ '.tmp/public/static/js/browserify/account/**/*.js'],
          '.tmp/public/static/js/browserify/extension.js': [ '.tmp/public/static/js/browserify/extension/**/*.js'],
          '.tmp/public/static/js/browserify/main.js': [ '.tmp/public/static/js/browserify/main/**/*.js']

        }
      }
	});

	grunt.loadNpmTasks('grunt-browserify');
};
