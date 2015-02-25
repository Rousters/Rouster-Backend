'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      dev: {
          src: ['lib/**/*.js', 'test/**/*.js', 'server.js', 'routes/**/*.js', 'models/**/*.js']
      }
    },
    jscs: {
      src: ['lib/**/*.js', 'test/**/*.js', 'server.js', 'routes/**/*.js', 'models/**/*.js'],
      options: {
        config: '.jscsrc'
      }
    },
    simplemocha: {
      all: {
        src: ['test/**/*.js']
      }
    },
    watch: {
      scripts: {
        files: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js', 'server.js', 'routes/**/*.js', 'models/**/*.js'],
        tasks: ['jshint']
      }
    }
  });

  grunt.registerTask('test', ['jshint', 'jscs', 'simplemocha']);
  grunt.registerTask('default', ['test']);
};
