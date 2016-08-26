

'use strict';
const compress = require('koa-compress');
const logger = require('koa-logger');
const serve = require('koa-static');
const path = require('path');
const koa = require('koa');
const cors = require('koa-cors');
const rateLimit = require('koa-better-ratelimit');
const enforceHttps = require('koa-sslify');
const tooBusy = require('koa-toobusy');
const responseTime = require('koa-response-time');
const health = require('koa-ping');
const helmet = require('koa-helmet');


// const arbiter = require("./modules/arbiter.js")
// const bitcore = require('bitcore-lib');
// const Message = require('bitcore-message');
//globals
const maxInputSize = "1kb"



/**
 * Environment.
 */

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3200;

// Create the app
const app = koa();

app.use(responseTime())

if (env === 'production')
{
    app.use(enforceHttps())
}

app.use(helmet())

app.use(tooBusy({
    maxLag: 70,
    interval: 500
}))

app.use(compress());

// TODO options at https://github.com/tunnckoCore/koa-better-ratelimit
//     max: opts.ratelimit,
//     duration: opts.duration,
//     db: redis.createClient()
app.use(rateLimit({
    duration: 1000 * 60 * 3, //3 mins
    max: 500
    //blackList: ['127.0.0.1']
}))

// allow cors TODO better to host without cors?
app.use(cors());

// TODO decide whether health ping is useful or not.  Change path.  Perhaps only use in staging?
// ... we could write a script that can make use of this data for monitoring.
app.use(health())

app.use(serve(path.join(__dirname, 'web')));



// Let's fire this baby up
app.listen(port);
console.log("ArbiterWeb is now running at http://localhost:" + port);