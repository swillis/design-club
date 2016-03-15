module.exports = function(grunt) {

  "use strict";

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.initConfig({

    clean: ["./_build/"],

    assemble: {
       
      options: {
        collections: [{
          name: 'post',
          sortby: 'posted',
          sortorder: 'descending'
        }],
        helpers: './src/js/helpers/helpers.js',
        layout: 'page.hbs',
        layoutdir: './src/templates/layouts/',
        partials: './src/templates/partials/**/*.hbs'
      },

      posts: {
        files: [{
          cwd: './src/content/',
          src: ['posts/*.hbs', '!_pages/**/*.hbs'],
          dest: './_build/',
          expand: true,
        }, {
          cwd: './src/content/_pages/',
          src: '**/*.hbs',
          dest: './_build/',
          expand: true,
        }]
      }

    },

    copy: {

      main: {

        options: {
          noProcess: ['**/*.{png,gif,jpg,ico,psd,woff}']
        },

        files: [{
          cwd: './src/img',
          src: '**/*',
          dest: './_build/img',
          expand: true,
        }, {
          cwd: './src/fonts',
          src: '**/*',
          dest: './_build/fonts',
          expand: true,
        }, {
          cwd: './src',
          src: 'CNAME',
          dest: './_build',
          expand: true,
        }]

      }

    },

    sass: {

      dev: {

        options: {
          style: "compressed",
          sourcemap : "none"
        },

        files : {
          "_build/css/app.min.css": "./src/scss/main.scss"
        }

      }

    },

    uglify: {

      dev: {

        options: {
          compress: true,
          mangle: true,
          preserveComments: false,
        },

        files: {
          "_build/js/app.min.js" : ["./src/js/libs/jquery-1.11.2.min.js",
                                   "./src/js/libs/waypoints.js",
                                   "./src/js/app/app.js"]
        }
        
      }

    },

    connect: {

      server: {
        options: {
          open: true,
          base: './_build/'
        }
      }

    },

    watch: {

      js: {
        files: ["src/js/**/*.js"],
        tasks: ["uglify:dev"],
        options: {
    		  livereload: true,
    		}
      },

      scss: {
        files: ["src/scss/**/*.scss"],
        tasks: ["sass:dev"],
        options: {
  			  livereload: true,
    		}
      }

    },

    'gh-pages': {
    
      options: {
        base: '_build'
      },
      src: '**/*'
  
    }

  });

  grunt.registerTask("make", [
    "clean",
    "assemble",
    "copy", 
    "sass:dev", 
    "uglify:dev", 
    "connect:server", 
    "watch"
  ]);

  grunt.registerTask("deploy", [
    "gh-pages"
  ]);

};