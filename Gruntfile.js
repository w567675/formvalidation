module.exports = function(grunt) {
    grunt.initConfig({
        // ---
        // Variables
        // ---

        pkg: grunt.file.readJSON('package.json'),

        dirs: {
            src: 'src',
            dist: 'dist',
            test: 'test'
        },

        banner: [
            '/*!',
            ' * BootstrapValidator (<%= pkg.homepage %>)',
            ' * <%= pkg.description %>',
            ' *',
            ' * @version     v<%= pkg.version %>, built on <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %>',
            ' * @author      <%= pkg.author.url %>',
            ' * @copyright   (c) 2013 - <%= grunt.template.today("yyyy") %> Nguyen Huu Phuoc',
            ' * @license     <%= pkg.homepage %>/license/',
            ' */\n'
        ].join('\n'),

        // ---
        // Tasks
        // ---

        copy: {
            main: {
                files: [
                    { cwd: '<%= dirs.src %>/css', src: '**', dest: '<%= dirs.dist %>/css', expand: true, flatten: true, filter: 'isFile' },
                    { cwd: '<%= dirs.src %>/js/language', src: '**', dest: '<%= dirs.dist %>/js/language', expand: true, flatten: true, filter: 'isFile' }
                ]
            }
        },

        cssmin: {
            minify: { expand: true, cwd: '<%= dirs.src %>/css/', src: ['*.css'], dest: '<%= dirs.dist %>/css/', ext: '.min.css' },
            add_banner: {
                options: {
                    stripBanners: true,
                    banner: '<%= banner %>'
                },
                files: {
                    '<%= dirs.dist %>/css/bootstrapValidator.min.css': ['<%= dirs.src %>/css/bootstrapValidator.css']
                }
            }
        },

        concat: {
            bootstrap: {
                options: {
                    separator: ';',
                    stripBanners: true,
                    banner: '<%= banner %>'
                },
                src: ['<%= dirs.src %>/js/core.js', '<%= dirs.src %>/js/helper.js', '<%= dirs.src %>/js/bootstrap.js', '<%= dirs.src %>/js/validator/*.js'],
                dest: '<%= dirs.dist %>/js/bootstrapValidator.js'
            },
            foundation: {
                options: {
                    separator: ';',
                    stripBanners: true,
                    banner: '<%= banner %>'
                },
                src: ['<%= dirs.src %>/js/core.js', '<%= dirs.src %>/js/helper.js', '<%= dirs.src %>/js/foundation.js', '<%= dirs.src %>/js/validator/*.js'],
                dest: '<%= dirs.dist %>/js/foundationValidator.js'
            },
            test: {
                src: ['<%= dirs.test %>/spec/*.js', '<%= dirs.test %>/spec/validator/*.js'],
                dest: '<%= dirs.test %>/spec.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            bootstrap: {
                src: ['<%= dirs.dist %>/js/bootstrapValidator.js'],
                dest: '<%= dirs.dist %>/js/bootstrapValidator.min.js'
            },
            foundation: {
                src: ['<%= dirs.dist %>/js/foundationValidator.js'],
                dest: '<%= dirs.dist %>/js/foundationValidator.min.js'
            }
        },

        jshint: {
            all: [
                '<%= dirs.src %>/js/**/*.js'
            ],
            options: {
                browser: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                es3: true,
                expr: true,
                laxbreak: true,   // Allow line breaking before && or ||
                loopfunc: true,
                newcap: true,
                noarg: true,
                onevar: true,
                sub: true,
                undef: true,
                white: true,
                globals: {
                    jQuery: false,
                    FormValidator: false
                }
            }
        },

        watch: {
            source: {
                files: ['<%= dirs.src %>/css/**', '<%= dirs.src %>/js/**'],
                tasks: ['build'],
                options: {
                    spawn: false
                }
            },
            test: {
                files: ['<%= dirs.test %>/spec/**'],
                tasks: ['concat:test']
            }
        }
    });

    grunt.registerTask('default', 'build');
    grunt.registerTask('build',   ['copy', 'cssmin', 'concat', 'uglify']);

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
