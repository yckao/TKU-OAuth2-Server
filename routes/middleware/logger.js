const logger = require('../../lib/logger')

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    logger.error({
      req: ctx.req,
      res: ctx.res,
      err
    })
  }

  logger.info({
    req: ctx.req,
    res: ctx.res
  })
}
