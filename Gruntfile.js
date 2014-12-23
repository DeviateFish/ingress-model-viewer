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
          'src/drawable/drawable.js',
          'src/drawable/model.js',
          'src/drawable/textured.js',
          'src/drawable/bicolored.js',
          'src/drawable/xm.js',
          'src/drawable/glowramp.js',
          'src/drawable/link.js',
          'src/drawable/shield-effect.js',
          'src/loader/base.js',
          'src/loader/geometry.js',
          'src/loader/shader.js',
          'src/loader/texture.js',
          'src/asset-manager.js',
          'src/entity/entity.js',
          'src/entity/leveled-xm-item.js',
          'src/entity/capsule-item.js',
          'src/entity/heatsink-item.js',
          'src/entity/extrashield-item.js',
          'src/entity/forceamp-item.js',
          'src/entity/linkamp-item.js',
          'src/entity/multihack-item.js',
          'src/entity/resonator-item.js',
          'src/entity/shield-item.js',
          'src/entity/turret-item.js',
          'src/entity/ultrastrike-item.js',
          'src/entity/xmp-item.js',
          'src/entity/portal-link-system.js',
          'src/entity/resonator-link-system.js',
          'src/entity/shield-effect.js',
          'src/entity/portal.js',
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
