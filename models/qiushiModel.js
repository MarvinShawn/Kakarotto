import mongoose, { Schema } from "mongoose"
import configs from '../configs';
const qiushiItemSchema = new Schema({
    tag: String,
    comments: Number,
    likes: Number,
    contentText: String,
    nickname: String,
    avatar: String,
    age: Number,
    gender: Boolean,
    contentImg: String,
    ratio: Number,
    type: Number
});

// 连接mongoDB
const db = mongoose.createConnection('mongodb://' + configs.mongodb.ip + '/' + configs.mongodb.dbname);
if (db) {
    console.log("connected successfully");
} else {
    console.log("connected failed");
}

export const QiushiItemModel = db.model('QiushiItem', qiushiItemSchema)
