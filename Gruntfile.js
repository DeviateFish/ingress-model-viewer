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
    demo: 'demo',
    manifest: 'manifest'
  };

  grunt.initConfig({
    paths: config,

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        sourceMap: true
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
        }
      }
    },

    jshint: {
      files: ['src/**/*.js'],
      options: {
        globals: {
          console: true
        },
        jshintrc: '.jshintrc'
      }
    },

    browserify: {
      dist: {
        options: {
          transform: [
            ["babelify", {
              sourceMaps: true
            }]
          ],
          browserifyOptions: {
            standalone: 'IMV',
            debug: true
          }
        },
        files: {
          // if the source file has an extension of es6 then
          // we change the name of the source file accordingly.
          // The result file's extension is always .js
          "./dist/<%= pkg.name %>.js": ["./src/<%= pkg.name %>.js"]
        }
      }
    },

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
          './<%= paths.manifest %>/*.json',
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
    }
  });

  grunt.registerTask('serve', [
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'jshint',
    'browserify',
    'uglify'
  ]);

  grunt.registerTask('default', [
    'build',
    'serve'
  ]);
};

/*
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
  'src/mesh/link.js',
  'src/mesh/portal-link.js',
  'src/mesh/resonator-link.js',
  'src/mesh/spherical-portal-link.js',
  'src/program.js',
  'src/program/opaque.js',
  'src/program/glowramp.js',
  'src/drawable.js',
  'src/drawable/mesh.js',
  'src/drawable/model.js',
  'src/drawable/textured.js',
  'src/drawable/textured-sphere.js',
  'src/drawable/bicolored.js',
  'src/drawable/glowramp.js',
  'src/drawable/xm.js',
  'src/drawable/shield-effect.js',
  'src/drawable/inventory.js',
  'src/drawable/resource.js',
  'src/drawable/world.js',
  'src/drawable/dynamic.js',
  'src/drawable/dynamic-model.js',
  'src/drawable/dynamic-textured.js',
  'src/drawable/link.js',
  'src/drawable/portal-link.js',
  'src/drawable/resonator-link.js',
  'src/drawable/spherical-portal-link.js',
  'src/drawable/atmosphere.js',
  'src/entity.js',
  'src/entity/inventory.js',
  'src/entity/portal.js',
  'src/asset-manager.js',
  'src/renderer.js',
  'src/renderer/object.js',
  'src/renderer/portal.js',
  'src/orbit-controls.js',
  'src/engine.js',
  'src/_outro.js'
],
*/
