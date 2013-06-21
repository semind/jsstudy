module.exports = function(grunt)
{
  var pkg = grunt.file.readJSON('package.json');
  grunt.initConfig(
  {
    // css
    cssmin:
    {
      compress:
      {
        files:
        {
          'css/app.min.css':['build/css/app.css']
        }
      }
    },
    compass:
    {
      dev:
      {
        options:
        {
          config: "compass_config.rb",
          environment: "development",
          force: true
        }
      },
      prod:
      {
        options:
        {
          config: "compass_config.rb",
          environment: "production",
          force: true
        }
      }
    },

    // js
    coffee:
    {
      compile:
      {
        files:
        {
          //'build/js/app.js': ['src/coffee/*.coffee'],
          'build/js/app.js': ['src/coffee/app.coffee'],
          'build/js/node.js': ['src/coffee/node.coffee']
        }
      }
    },
    uglify:
    {
      my_target:
      {
        files:
        {
          'js/index.min.js': 'build/js/index.js'
        }
      }
    },
    jshint:
    {
      files: ['build/js/index.js']
    },

    // auto
    watch:
    {
      files:['src/coffee/*.coffee', 'src/sass/*.sass'],
      tasks:['compass:prod', 'coffee', 'jshint' ]
    }
  });

  var t;
  for(t in pkg.devDependencies)
  {
    if(t.substring(0, 6) == 'grunt-')
    {
      grunt.loadNpmTasks(t);
    }
  }

  grunt.registerTask('default', [ 'compass:prod', 'coffee', 'jshint' ]);
  grunt.registerTask('release', [ 'compass:prod', 'cssmin', 'coffee', 'jshint', 'uglify' ]);
};

