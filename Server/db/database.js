// import MongoDb from 'mongodb';
import { config } from '../config.js';
import Mongoose from 'mongoose';
let db;
export async function connectDB(){
    // return MongoDb.MongoClient.connect(config.db.host)
    // .then((client) => {db = client.db()
    // });
    return Mongoose.connect(config.db.host);
}

export function userVirtualId(Schema){
    Schema.virtual('id').get(function() {
        return this._id.toString();
    }); // _id라는 것을 문자열로 등록해서 쓸 것
    Schema.set('toJSON', { virtuals: true });
    Schema.set('toObject', { virtuals: true });
}
export function getUsers(){
    return db.collection('users');
}

export function getTweets(){
    return db.collection('tweets');
}