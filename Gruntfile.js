'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // configurable paths
  var config = {
    app: 'src',
    dist: 'dist',
    demo: 'demo'
  };

  grunt.initConfig({
    paths: config,
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        nospawn: true,
        livereload: { liveCSS: false }
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          './<%= paths.demo %>/*.html',
          './dist/<%= pkg.name.replace(".js", "") %>.js'
        ]
      },
      js: {
        files: ['./<%= paths.src %>/**/*.js'],
        tasks: ['build']
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, './'),
            ];
          }
        }
      }
    },
    concat: {
      options: {
        separator: "\n\n",
        sourceMap: true
      },
      dist: {
        src: [
          'src/_intro.js',
          'src/polyfill.js',
          'src/constants.js',
          'src/utils.js',
          'src/loader.js',
          'src/gl-bound.js',
          'src/gl/gl-buffer.js',
          'src/gl/gl-attribute.js',
          'src/gl/gl-index.js',
          'src/texture.js',
          'src/vertex-attribute.js',
          'src/attribute-buffer.js',
          'src/mesh.js',
          'src/mesh/static.js',
          'src/mesh/file.js',
          'src/mesh/sphere.js',
          'src/mesh/portal-link.js',
          'src/mesh/spherical-portal-link.js',
          'src/program.js',
          'src/program/opaque.js',
          'src/program/glowramp.js',
          'src/drawable.js',
          'src/drawable/mesh.js',
          'src/drawable/model.js',
          'src/drawable/textured.js',
          'src/drawable/bicolored.js',
          'src/drawable/glowramp.js',
          'src/drawable/xm.js',
          'src/drawable/shield-effect.js',
          'src/drawable/inventory.js',
          'src/drawable/resource.js',
          'src/drawable/world.js',
          'src/drawable/artifact.js',
          'src/drawable/dynamic.js',
          'src/drawable/dynamic-model.js',
          'src/drawable/dynamic-textured.js',
          'src/drawable/link.js',
          'src/drawable/atmosphere.js',
          'src/entity.js',
          'src/entity/inventory.js',
          'src/entity/portal.js',
          'src/asset-manager.js',
          'src/renderer.js',
          'src/renderer/object.js',
          'src/renderer/portal.js',
          'src/engine.js',
          'src/_outro.js'
        ],
        dest: 'dist/<%= pkg.name.replace(".js", "") %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name.replace(".js", "") %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        sourceMap: true
      },
      dist: {
        files: {
          'dist/<%= pkg.name.replace(".js", "") %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['dist/ingress-model-viewer.js'],
      options: {
        globals: {
          console: true,
          module: true,
          document: true
        },
        jshintrc: '.jshintrc'
      }
    },
  });

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'concat',
    'jshint',
    'uglify'
  ]);

  grunt.registerTask('default', [
    'build',
    'serve'
  ]);
};
