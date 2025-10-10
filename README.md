## @hoajs/response-time

Response-Time middleware for Hoa.

## Installation

```bash
$ npm i @hoajs/response-time --save
```

## Quick Start

```js
import { Hoa } from 'hoa'
import { responseTime } from '@hoajs/response-time'

const app = new Hoa()
app.use(responseTime())

app.use(async (ctx) => {
  ctx.res.body = 'Hello, Hoa!'
})

export default app
```

## Documentation

The documentation is available on [hoa-js.com](https://hoa-js.com/middleware/response-time.html)

## Test (100% coverage)

```sh
$ npm test
```

## License

MIT
