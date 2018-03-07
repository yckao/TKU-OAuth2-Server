const Router = require('koa-router')
const BodyParser = require('koa-bodyparser')
const OAuth = require('oauth2-server')
const oauth = require('../lib/oauth')
const authenticate = require('./middleware/authenticate')

const router = new Router()
const logger = require('./middleware/logger')

router.use(BodyParser())
router.use(logger)

router.all('/token', async (ctx) => {
  const request = new OAuth.Request(ctx.request)
  const response = new OAuth.Response(ctx.response)

  try {
    await oauth.token(request, response)

    ctx.response.body = response.body
    ctx.response.status = response.status
    ctx.response.headers = response.headers
  } catch (e) {
    if (response) {
      ctx.response.headers = response.headers
    }
    ctx.response.body = { error: e.name, error_description: e.message }
    ctx.response.status = e.code
  }
})

router.post('/authorise', async (ctx) => {
  const request = new OAuth.Request(ctx.request)
  const response = new OAuth.Response(ctx.response)

  try {
    await oauth.authorize(request, response)

    ctx.response.body = response.body
    ctx.response.status = response.status
    ctx.response.headers = response.headers
  } catch (e) {
    if (response) {
      ctx.response.headers = response.headers
    }
    ctx.response.body = { error: e.name, error_description: e.message }
    ctx.response.status = e.code
  }
})

router.get('/me', authenticate('sso'), (ctx) => {
  ctx.response.body = ctx.oauth
  ctx.response.status = 200
})

module.exports = router.routes()
