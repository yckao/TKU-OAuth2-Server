const Koa = require('koa')
const config = require('./config')

const routes = require('./routes')

const app = new Koa()

app.use(routes)

app.listen(config.port, config.host)
