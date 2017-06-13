var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var diskdb = require('diskdb');
var pug = require('pug');
//webpack
var webpack = require('webpack');
var webpackConfig = require('./build/webpack.dev.conf')
//require routes
var posts = require('./api-controllers/posts-controller');

var app = express();
var blogDb = diskdb.connect('./localdb', ['posts']);

//load index route for prod
if (app.get('env') === 'production') {
    console.log('Prod route '+__dirname + '/dist/index.html');
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/dist/index.html');
    })
}

//webpack stuff
if (app.get('env') === 'development') {
    var compiler = webpack(webpackConfig);
    var devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        quiet: true
    });
    var hotMiddleware = require('webpack-hot-middleware')(compiler, {
        log: () => { }
    });
    // force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            hotMiddleware.publish({ action: 'reload' });
            cb();
        });
    });

    // serve webpack bundle output
    app.use(devMiddleware)
    // enable hot-reload and state-preserving
    // compilation error display
    app.use(hotMiddleware)
}

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));


app.use(express.static(path.join(__dirname, 'public')));
//load api routes
app.use('/posts', posts(blogDb));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
