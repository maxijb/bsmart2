/**
 * Compiles LESS files into CSS.
 *
 * ---------------------------------------------------------------
 *
 * Only the `assets/styles/importer.less` is compiled.
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-less
 */
module.exports = function(grunt) {

	grunt.config.set('less', {
		dev: {
	        files: [
	          {
	          expand: true,
	          cwd: 'assets/linker/styles/',
	          src: ['**/*.less'],
	          dest: '.tmp/public/static/linker/styles/',
	          ext: '.css'
	        }, {
	          expand: true,
	          cwd: 'assets/styles/main/',
	          src: ['main.less'],
	          dest: '.tmp/public/static/styles/main/',
	          ext: '.css'
	        }
	        ]
	      }
	});

	grunt.loadNpmTasks('grunt-contrib-less');
};
