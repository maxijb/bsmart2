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

	grunt.config.set('react', {
		dynamic_mappings: {
            options: {
            	harmony: true,
            	es6module: true,
            	'non-strict-es6module': true
            },
	        files: [
	          {
	            expand: true,
	            cwd: 'assets/components',
	            src: ['**/*.jsx'],
	            dest: '.tmp/public/static/components',
	            ext: '.js',
	          }
	        ]
	      }
	});

	  grunt.loadNpmTasks('grunt-react');
};


