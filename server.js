import koa from "koa";
import koaRouter from "koa-router";
import koaBody from "koa-bodyparser";
import { graphqlKoa, graphiqlKoa } from "apollo-server-koa";
import mongoose from "mongoose";

// 连接mongoDB
const db = mongoose.createConnection("localhost", "qiushibaike");
if (db) {
  console.log("mongodb connected successfully");
} else {
  console.log("mongodb connected failed");
}
