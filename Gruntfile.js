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
          'src/constants.js',
          'src/utils.js',
          'src/loader.js',
          'src/gl-bound.js',
          'src/texture.js',
          'src/vertex-attribute.js',
          'src/attribute-buffer.js',
          'src/mesh.js',
          'src/mesh/file.js',
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
