const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtrac = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports={

    mode: 'production',
    
    output:{
        clean:true,
        filename:'main.[contenthash].js'

    },

    module:{
        rules:[
            {
                test: /\.html$/,
                loader:'html-loader',
                options:{
                    sources:false
                }

        },
        {
            test: /\.css$/,   //esta liena de codigo esta diciendo que se aplicara todos los archivos css
            exclude: /style.css$/,//aqui le decimos que escluya ya que abajo ya esta evaluando el archivo
            use: ['style-loader','css-loader']

        },
        {
            test: /style.css$/,//evaluacion para el archivo especifico style.css
            use:[MiniCssExtrac.loader,'css-loader']//css loader para que lo pueda cargar

        },
        {
            test:/\.(png|jpe?g|gif)$/,
            loader:'file-loader'
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              }
            }
         }
        ]
    },

    optimization:{
            minimize:true,
            minimizer:[
                new CssMinimizer(),
                new Terser(),
            ]

    },

    plugins:[
        //basicamente le dice create el index.html y crea una relacion con el build que te esta generando.(esta si lo dejamos ssin configurar)
        new HtmlWebpack({
            title:'Mi webpack app',
            template:'./src/index.html'//le etsamos diciendo basate de este archivo

        }),
        new MiniCssExtrac({
            filename:'[name].[fullhash].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns:[
                {from:'src/assets/',to:'assets/'}
            ]

           
        })
    ]



}