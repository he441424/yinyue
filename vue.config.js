module.exports = {
    lintOnSave: false,//关闭eslint
    // 反向代理
     devServer: {
      proxy: {
          // 以ajax开头的进行
          "/personalized": {
              target: 'https://autumnfish.cn',
              changeOrigin: true
             },
             "//playlist": {
                target: 'https://autumnfish.cn',
                changeOrigin: true
             },
             "/search": {
                target: 'https://autumnfish.cn',
                changeOrigin: true
            },
         },
         
    },
    
    
    
}
