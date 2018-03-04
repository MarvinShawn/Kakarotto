import koa from "koa";
import koaRouter from "koa-router";
import koaBody from "koa-bodyparser";
import { graphqlKoa, graphiqlKoa } from "apollo-server-koa";
import configs from './configs';
import { schema } from "./schemas"

const app = new koa();
const router = new koaRouter();
//post请求
app.use(koaBody())

//设置路由
router.get('/graphql', graphqlKoa({ schema: schema }));
router.post('/graphql', graphqlKoa({ schema: schema }))
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

//使用路由
app.use(router.routes());
app.listen(configs.port, () => {
  console.log('app listening on port ' + configs.port);
})



