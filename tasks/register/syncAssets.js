module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'jst:dev',
		'less:dev',
		'sync:dev',
		'react:dynamic_mappings',
		'strip_code:compile',
		'browserify:dist',
		'jade:compile',
	    'jade:viewsCompile'
	]);
};
