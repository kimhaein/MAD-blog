## Project Stack

### Client

- React +) Context-api,react-hook
- Next (https://nextjs.org/) : Router, SSR, CodeSplit
- TypeScript
- antd (https://ant.design/) : design
- react-markdown (https://github.com/rexxars/react-markdown#readme) : markdown editor

## ref

### Next

1. https://velopert.com/3293
2. https://blog.kesuskim.com/2017/07/develop-website-using-next-js/

### TypeScript

1. https://poiemaweb.com/typescript-introduction
2. https://github.com/velopert/typescript-react-sample

### open API

1. https://unsplash.com/developers : images


## memo

// "start": "npm run server-start && npm run client-start",
// "server-start": "cd server && npm start"
// "client-start": "cd client && npm start"

{
    "scripts": {
        "client-install"  : "cd client && npm install",
        "server-install"  : "cd server && npm install",
        "install-all-deps": "concurrently \"npm run server-install\" \"npm run client-install\""
    }
}