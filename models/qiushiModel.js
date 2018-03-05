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
    ratio: Number
});

// 连接mongoDB
const db = mongoose.createConnection('mongodb://' + configs.mongodb.ip + '/' + configs.mongodb.dbname);
if (db) {
    console.log("connected successfully");
} else {
    console.log("connected failed");
}

export const HotModel = db.model('HotItem', qiushiItemSchema)
export const ImageModel = db.model('ImageItem', qiushiItemSchema)
export const NewModel = db.model('NewItem', qiushiItemSchema)
export const TextModel = db.model('TextItem', qiushiItemSchema)