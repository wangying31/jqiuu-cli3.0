const path = require('path')
const webpack = require('webpack')
// const glob = require('glob-all')
// const PurgecssPlugin = require('purgecss-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const PrerenderSpaPlugin = require('prerender-spa-plugin')
// const AliOssPlugin = require('webpack-oss')
const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
console.log(`>>>>>>>>>IS_PROD>>>>>>>${IS_PROD}`)
console.log(`>>>>>>>>>NODE_ENV>>>>>>>${process.env.NODE_ENV}`)
console.log(`>>>>>>>>>IS_ANALYZ>>>>>>>${process.env.IS_ANALYZ}`)
module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : '/', // 默认'/'，部署应用包时的基本 URL
  // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  // assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  configureWebpack: config => {
    const plugins = []

    if (IS_PROD) {
      // 去除多余css
      // plugins.push(
      //   new PurgecssPlugin({
      //     paths: glob.sync([resolve('./**/*.vue')]),
      //     extractors: [
      //       {
      //         extractor: class Extractor {
      //           static extract(content) {
      //             const validSection = content.replace(
      //               /<style([\s\S]*?)<\/style>+/gim,
      //               ''
      //             )
      //             return validSection.match(/[A-Za-z0-9-_:/]+/g) || []
      //           }
      //         },
      //         extensions: ['html', 'vue']
      //       }
      //     ],
      //     whitelist: ['html', 'body'],
      //     whitelistPatterns: [/el-.*/],
      //     whitelistPatternsChildren: [/^token/, /^pre/, /^code/]
      //   })
      // )
      //   plugins.push(
      //     new UglifyJsPlugin({
      //       uglifyOptions: {
      //         compress: {
      //           warnings: false,
      //           drop_console: true,
      //           drop_debugger: false,
      //           pure_funcs: ['console.log'] //移除console
      //         }
      //       },
      //       sourceMap: false,
      //       parallel: true
      //     })
      //   )
      // 利用splitChunks单独打包第三方模块
      // config.optimization = {
      //   splitChunks: {
      //     cacheGroups: {
      //       libs: {
      //         name: 'chunk-libs',
      //         test: /[\\/]node_modules[\\/]/,
      //         priority: 10, // 缓存组打包的先后优先级
      //         minChunks: 1, // （默认是1）：在分割之前，这个代码块最小应该被引用的次数（译注：保证代码块复用性，默认配置的策略是不需要多次引用也可以被分割）
      //         chunks: 'initial' // (默认是async) ：initial、async和all
      //       // },
      //       // elementUI: {
      //       //   name: 'chunk-elementUI',
      //       //   priority: 20,
      //       //   test: /[\\/]node_modules[\\/]element-ui[\\/]/,
      //       //   chunks: 'all'
      //       }
      //     }
      //   }
      // }
      // gzip
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
          // deleteOriginalAssets: true// 删除原文件
        })
      )
      // 预加载
      //   plugins.push(
      //     new PrerenderSpaPlugin({
      //       staticDir: resolve('dist'),
      //       routes: ['/'],
      //       postProcess(ctx) {
      //         ctx.route = ctx.originalRoute
      //         ctx.html = ctx.html.split(/>[\s]+</gim).join('><')
      //         if (ctx.route.endsWith('.html')) {
      //           ctx.outputPath = path.join(__dirname, 'dist', ctx.route)
      //         }
      //         return ctx
      //       },
      //       minify: {
      //         collapseBooleanAttributes: true,
      //         collapseWhitespace: true,
      //         decodeEntities: true,
      //         keepClosingSlash: true,
      //         sortAttributes: true
      //       },
      //       renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
      //         // 需要注入一个值，这样就可以检测页面当前是否是预渲染的
      //         inject: {},
      //         headless: false,
      //         // 视图组件是在API请求获取所有必要数据后呈现的，因此我们在dom中存在“data view”属性后创建页面快照
      //         renderAfterDocumentEvent: 'render-event'
      //       })
      //     })
      //   )
      // oss
      // plugins.push(
      //   new AliOssPlugin({
      //     accessKeyId: process.env.ACCESS_KEY_ID,
      //     accessKeySecret: process.env.ACCESS_KEY_SECRET,
      //     region: process.env.REGION,
      //     bucket: process.env.BUCKET,
      //     prefix: process.env.PREFIX,
      //     exclude: /.*\.html$/,
      //     format
      //   })
      // )
    }
    config.externals = {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios'
    }

    // if (has_sprite) {
    //   plugins.push(
    //     new SpritesmithPlugin({
    //       src: {
    //         cwd: path.resolve(__dirname, './src/assets/icons/'), // 图标根路径
    //         glob: '**/*.png' // 匹配任意 png 图标
    //       },
    //       target: {
    //         image: path.resolve(__dirname, './src/assets/images/sprites.png'), // 生成雪碧图目标路径与名称
    //         // 设置生成CSS背景及其定位的文件或方式
    //         css: [
    //           [
    //             path.resolve(__dirname, './src/assets/scss/sprites.scss'),
    //             {
    //               format: 'function_based_template'
    //             }
    //           ]
    //         ]
    //       },
    //       customTemplates: {
    //         function_based_template: SpritesmithTemplate
    //       },
    //       apiOptions: {
    //         cssImageRef: '../images/sprites.png' // css文件中引用雪碧图的相对位置路径配置
    //       },
    //       spritesmithOptions: {
    //         padding: 2
    //       }
    //     })
    //   )
    // }

    config.plugins = [...config.plugins, ...plugins]
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)
    config
      .plugin('ignore')
      .use(
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
      )

    const cdn = {
      css: [''],
      js: [
        '//unpkg.com/vue@2.6.10/dist/vue.min.js', // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
        '//unpkg.com/vue-router@3.0.3/dist/vue-router.min.js',
        '//unpkg.com/vuex@3.0.1/dist/vuex.min.js',
        '//unpkg.com/axios@0.19.0/dist/axios.min.js'
      ]
    }

    config.plugin('html').tap(args => {
      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = 'none'
      // html中添加cdn
      args[0].cdn = cdn
      return args
    })

    // 添加别名
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@scss', resolve('src/assets/scss'))
      .set('@components', resolve('src/components'))
      .set('@plugins', resolve('src/plugins'))
      .set('@views', resolve('src/views'))
      .set('@router', resolve('src/router'))
      .set('@store', resolve('src/store'))
      .set('@layouts', resolve('src/layouts'))
      .set('@static', resolve('src/static'))

    // 压缩图片
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: [0.65, 0.90], speed: 4 },
        gifsicle: { interlaced: false },
        webp: { quality: 75 }
      })

    // const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    // types.forEach(type =>
    //   addStylusResource(config.module.rule('stylus').oneOf(type))
    // )

    // 打包分析
    if (process.env.IS_ANALYZ) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
    if (IS_PROD) {
      // config.optimization.delete('splitChunks')
    }
    return config
  },
  css: {
    modules: false,
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      sass: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        data: `
        @import '@scss/config.scss'
        @import '@scss/variables.scss'
        @import '@scss/mixins.scss'
        @import '@scss/utils.scss'
        $src: '${process.env.VUE_APP_OSS_SRC}'
        `
      }
    }
  },
  transpileDependencies: [],
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require('os').cpus().length > 1,
  pwa: {},
  devServer: {
    // overlay: { // 让浏览器 overlay 同时显示警告和错误
    //   warnings: true,
    //   errors: true
    // },
    // open: false, // 是否打开浏览器
    // host: 'localhost',
    port: '3001' // 代理断就
    // https: false,
    // hotOnly: false, // 热更新
    // proxy: {
    //   '/api': {
    //     target:
    //       'https://www.easy-mock.com/mock/5bc75b55dc36971c160cad1b/sheets', // 目标代理接口地址
    //     secure: false,
    //     changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
    //     // ws: true, // 是否启用websockets
    //     pathRewrite: {
    //       '^/api': '/'
    //     }
    //   }
    // }
  }
}
