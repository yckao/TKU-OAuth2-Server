const OAuth = require('oauth2-server')
const oauth = require('../../lib/oauth')

module.exports = (scope) => {
  return async (ctx, next) => {
    const request = new OAuth.Request(ctx.request)
    const response = new OAuth.Response(ctx.response)
    try {
      ctx.oauth = await oauth.authenticate(request, response, {scope})
      await next()
    } catch (e) {
      if (response) {
        ctx.response.headers = response.headers
      }
      ctx.response.body = { error: e.name, error_description: e.message }
      ctx.response.status = e.code
    }
  }
}
