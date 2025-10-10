/**
 * Response-Time middleware for Hoa.
 *
 * Adds an `X-Response-Time` (configurable) header with the elapsed time measured via `performance.now()`.
 *
 * @param {Object} [options]
 * @param {number} [options.digits=0] number of digits to keep when formatting milliseconds (ms). Default: 0.
 * @param {string} [options.header='X-Response-Time'] header name to set. Default: 'X-Response-Time'.
 * @param {boolean} [options.suffix=true] whether to append the 'ms' suffix to the header value. Default: true.
 * @returns {(ctx: import('hoa').HoaContext, next: () => Promise<void>) => Promise<void>} Hoa middleware function.
 */

export function responseTime (options = {}) {
  const { digits = 0, suffix = true, header = 'X-Response-Time' } = options

  return async function hoaResponseTime (ctx, next) {
    const start = performance.now()

    await next()

    const deltaMs = performance.now() - start
    const delta = Number.isFinite(digits) ? deltaMs.toFixed(digits) : String(deltaMs)
    ctx.res.set(header, suffix ? `${delta}ms` : delta)
  }
}

export default responseTime
