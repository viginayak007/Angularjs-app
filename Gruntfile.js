module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\r\n\r'
            },
            dist: {
                src: ['js/*.js', 'js/**/*.js', 'js/**/**/*.js'],
                dest: 'dist/main.js'
            }
        },
        uglify: {
            options: {
                compress: true,
                mangle: false,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            target: {
                src: 'dist/main.js',
                dest: 'main.min.js'
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: true,
                roundingPrecision: -1
            },
            minify: {
                files: [{
                    'style.min.css': ['style/*.css', 'style/**/*.css']

                }]
            }
        },
         browserSync: {
             dev: {
                 bsFiles: {
                     src: [
                         'js/*.js',
                         'js/**/*.js',
                         'main.min.js',
                         'style.min.css',
                         'view/*.html',
                         'view/**/*.html',
                         'style /*.css', 
                         'style/**/*.css',
                         'Index.html',
                     ]
                 },
                 options: {
                     server: {
                         watchTask: true,
                         baseDir: "./",
                     }
                 }
             }
         },
        watch: {
            scripts: {
                files: ['js/*.js', 
                'js/**/*.js', 
            ],
                tasks: ['concat', 'uglify']
            },
            cssmin: {
                files: ['style/*.css', 'style/**/*.css'],
                tasks: ['cssmin:minify'],
                options: {
                    debounceDelay: 250,
                    spawn: false
                }
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'cssmin', 'uglify', 'watch']);
    // Default task(s).
    grunt.registerTask('server', ['browserSync', 'watch']);

};
