module.exports = {
  chainWebpack: config => {
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end();

    config.module
      .rule('raw-css')
      .test(/\.rawcss$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end();
  },
};
