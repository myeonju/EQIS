/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

//dotenv 사용을 위한 설정
dotenv.config();

module.exports = (env) => {
    const mode = env.mode || 'development';

    return {
        // 개발모드, development or production
        mode: mode,

        // entry를 기준으로 연관된 모든 파일들을 번들링
        entry: './src/index',

        //번들링 될 파일 확장자 등록
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },

        //로더 등록
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: ['ts-loader'],
                    exclude: ['/node_modules/'],
                },

                {
                    test: /\.(png|jpg|gif|svg)$/, //확장자가 png, jpg, gif, svg인것에 대해서만 등록
                    use: 'file-loader',
                },
                {
                    test: /\.css$/, //확장자가 css인것에 대해서만 loader 등록
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },

        // 최적화 설정
        optimization: {
            minimizer:
                mode === 'production'
                    ? [
                          new TerserPlugin({
                              terserOptions: {
                                  compress: {
                                      drop_console: true, // production에서 console 출력 제거
                                  },
                              },
                          }),
                      ]
                    : [], // 빈 배열을 넣어주지 않을 경우 에러 발생,
        },

        // 빌드 설정
        output: {
            path: path.resolve(__dirname, 'build'), // 빌드되는 파일들이 만들어지는 위치, __dirname: 현재 디렉토리
            filename: '[name].bundle.js', // 번들파일 이름
            publicPath: '/',
        },

        // webpack 서버 설정
        devServer: {
            static: path.join(__dirname, 'build'), // 이 경로에 있는 파일이 변경될 때 번들을 다시 컴파일
            port: 80,
            historyApiFallback: true, // 새로고침 시 페이지 유지
            //proxy 설정하기
            proxy: {
                '/**/*.do': {
                    target: 'http://localhost:8000',
                    changeOrigin: true,
                    // pathRewrite: { '^/api': '' }, // /api/qwe/~에 대한 요청을 target/qwe/~ 요청으로 수정해서 요청하기
                },
            },
        },

        plugins: [
            new HtmlWebpackPlugin({
                //index.html에 output에서 만들어진 bundle.js를 적용하여, build에 새로운 html 파일 생성
                template: `./public/index.html`,
            }),

            //dotenv 사용을 위한 설정
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(process.env),
            }),
        ],
    };
};
