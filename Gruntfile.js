module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            options: {
                mangle: true,
                compress: true,
                beautify: false,
                report: 'gzip, min',
                banner: '/*\n Snap Calendar <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            dist: {
                files: {
                    'src/static/application/js/app.min.js': [
                        'src/static/components/calendar/underscore.js',
                        'src/static/components/calendar/moment.js',
                        'src/static/components/calendar/clndr.js',
                        'src/static/application/js/app.js']
                }
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0,
                banner: '/*\n Snap Calendar <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            combine: {
                files: {
                    'src/static/application/css/app.min.css': 'src/static/application/css/app.css'
                }
            },
            minify: {
                expand: true,
                cwd: 'src/static/application/css',
                src: ['*.css', '!*.min.css'],
                dest: 'src/static/application/css',
                ext: '.min.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['uglify', 'cssmin']);

};