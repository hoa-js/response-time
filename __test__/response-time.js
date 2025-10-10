import { Hoa } from 'hoa'
import { responseTime } from '../src/response-time.js'

describe('Response-Time middleware for Hoa', () => {
  it('default options: digits=0, suffix=true, header=X-Response-Time', async () => {
    const app = new Hoa()
    app.use(responseTime())
    app.use(async (ctx, next) => {
      if (ctx.req.pathname === '/abc') { ctx.res.body = { success: true }; return }
      await next()
    })

    const res = await app.fetch(new Request('http://localhost/abc'))
    expect(res.status).toBe(200)
    const hdr = res.headers.get('X-Response-Time')
    expect(hdr).not.toBeNull()
    expect(hdr).toMatch(/^\d+ms$/)
  })

  it('digits: 3 should output fractional milliseconds', async () => {
    const app = new Hoa()
    app.use(responseTime({ digits: 3 }))

    const res = await app.fetch(new Request('http://localhost/notfound'))
    expect(res.status).toBe(404)
    const hdr = res.headers.get('X-Response-Time')
    expect(hdr).not.toBeNull()
    expect(hdr).toMatch(/^\d+\.\d{3}ms$/)
  })

  it('digits: "3" should use raw String(deltaMs)', async () => {
    const app = new Hoa()

    app.use(responseTime({ digits: '3' }))
    app.use((ctx) => { ctx.body = 'ok' })

    const res = await app.fetch(new Request('http://localhost/'))
    const hdr = res.headers.get('X-Response-Time')
    expect(hdr).toMatch(/^\d+(?:\.\d+)?ms$/)
  })

  it('suffix: false should not append "ms"', async () => {
    const app = new Hoa()
    app.use(responseTime({ digits: 3, suffix: false }))

    const res = await app.fetch(new Request('http://localhost/notfound2'))
    expect(res.status).toBe(404)
    const hdr = res.headers.get('X-Response-Time')
    expect(hdr).not.toBeNull()
    expect(hdr).toMatch(/^\d+\.\d{3}$/)
  })

  it('custom header name', async () => {
    const app = new Hoa()
    app.use(responseTime({ header: 'Response-Time' }))

    const res = await app.fetch(new Request('http://localhost/notfound3'))
    expect(res.status).toBe(404)
    const hdr = res.headers.get('Response-Time')
    expect(hdr).not.toBeNull()
    expect(hdr).toMatch(/^\d+ms$/)
  })
})
