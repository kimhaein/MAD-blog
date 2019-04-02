const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = "Koa";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT || 4000, () => {
  console.log("MAD server is listening to port 4000");
});
