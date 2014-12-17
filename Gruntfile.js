module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: "\n\n",
        sourceMap: true
      },
      dist: {
        src: [
          'src/_intro.js',
          'src/polyfill.js',
          'src/OculusRiftEffect.js',
          'src/constants.js',
          'src/utils.js',
          'src/camera-controls.js',
          'src/geometry/base.js',
          'src/geometry/ingress.js',
          'src/geometry/portal-link.js',
          'src/geometry/resonator-link.js',
          'src/geometry/field.js',
          'src/geometry/parametric.js',
          'src/shaders.js',
          'src/model.js',
          'src/loader/base.js',
          'src/loader/geometry.js',
          'src/loader/shader.js',
          'src/loader/texture.js',
          'src/asset-manager.js',
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

    qunit: {
      all: {
        options: {
          urls: [
            'http://localhost:8082/test/all.html'
          ]
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

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['concat', 'jshint', 'qunit']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('default', ['concat', 'jshint', 'qunit', 'uglify']);

};
