
module.exports = {
    excludeModule: /module/,

    /** 样式 css, less, sass */
    cssRegex: /\.css$/,
    cssModuleRegex: /\.module\.css$/,
    cssShouldUseSourceMap: false,

    sassRegex: /\.(scss|sass)$/,
    sassModuleRegex: /\.module\.(scss|sass)$/,
    sassShouldUseSourceMap: false,

    lessRegex: /\.less$/,
    lessModuleRegex: /\.module\.less$/,
    lessShouldUseSourceMap: false,


    postcssShouldUseSourceMap: false,
};
