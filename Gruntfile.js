module.exports = function(grunt) {
    grunt.initConfig({
        // パッケージファイルを読み込む
        pkg: grunt.file.readJSON('package.json'),

        // grunt-contrib-connect の設定
        connect: {
            qunit: { // QUnit 用の設定
                options: {
                    port: 9090, base: '.'
                }
            }
        },

        // grunt-contrib-watch の設定
        watch: {
            qunit: { // QUnit 用の設定
                files: ['test/**/*.js', 'js/**/*.js'], // test ディレクトリ、および、js ディレクトリにある全 JavaScript を監視対象とする
                tasks: ['qunit']
            }
        },

        // grunt-contrib-qunit の設定
        qunit: {
            all: ['test/**/*.html'] // test ディレクトリにある HTML を実行対象とする
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    // `grunt test` で実行するタスクを定義する
    grunt.registerTask('test', ['connect:qunit', 'watch:qunit', 'qunit']);
};