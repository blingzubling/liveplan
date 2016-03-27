module.exports = function(grunt) {
    // Do grunt-related things in here

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: [
                    'app/view?/*.js',
                    '!app/view?/*_test.js'
                ],
                // the location of the resulting JS file
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                sourceMap: true,
                sourceMapName: 'dist/<%= pkg.name %>.min.js.map'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        // wrap my modules with define 
        wrap: {
            basic: {
                src: ['app/components/math/niceParser.js'],
                dest: 'app/components/math/niceParser.js',
                options: {
                    wrapper: ['(function() {\n  var ', '\n})();']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-wrap');

    grunt.registerTask('verbinde', ['concat:dist']);
    grunt.registerTask('verrausche', ['uglify:dist']);
    grunt.registerTask('deploy', ['verbinde', 'verrausche']);

    grunt.registerTask('niceParser', ['wrap']);
};