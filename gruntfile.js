'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        reporter : require('jshint-stylish'),
        node     : true,
        expr     : true,
        boss      : true,
      	curly     : true,
      	eqeqeq    : true,
      	eqnull    : true,
      	immed     : true,
      	noarg     : true,
      	onevar    : true,
      	quotmark  : 'single',
      	smarttabs : true,
      	trailing  : true,
      	undef     : true,
      	unused    : false,
      	indent    : 2,
      	bitwise   : false,
      	camelcase : false,
      	freeze    : true,
      	newcap    : true,
      	esnext    : false,
      	sub       : true,
      	strict    : true,
      	laxbreak  : true,
      	laxcomma  : true,
      	predef : ['User', 'Attempt', 'sails', 'Auth', 'waterlock', 'it', 'describe'],
        globals: {
          waterlock: true
        },
      },
      all: [
        'gruntfile.js',
        'index.js',
        'lib/**/*.js',
        'test/**/*.js'
      ]
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('travis', ['jshint']);
};
