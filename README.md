a tool for msw
https://mswjs.io/

with it u can just write arrays to mock all the rest api in your app
# Start
```shell
npx mock-service-worker-tool
```
It will auto create mockServiceWorker in your /public


# Use
in your index.js
```js
import { msw } from 'mock-service-worker-tool'

msw(yourRestApiArray)

```

```js

apiArray is like:

[
  {
    method: 'get',
    url: '/user',
    func: (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          username: 'admin',
        })
      )
    },
  },
  ...
]

then call it with baseUrl http://localhost:yourlocalport
enjoy!
```
