import Mongoose from "mongoose";
import { userVirtualId } from "../db/database.js";

const userSchema = new Mongoose.Schema({
    username: { type: String, required: true},
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    url:String });

userVirtualId(userSchema);
const User = Mongoose.model('User', userSchema); // 컬렉션을 user라는 이름으로 가리키게 된다
/* 
    { ... }
    { ObjectID: asdasdaskldm, userid: 'apple', name: '김사과' }
    { userid: 'apple', name: '김사과' }

*/ 
// 몽고디비에는 다른 아이디와 구별해주기 위해 objectid라는 것이 들어간다

export async function findByUsername(username){
    return User.findOne({ username }); // 검색만 하면 끝
}

export async function createUser(user){
    return new User(user).save().then((data) => data.id);
} // 오브젝트 받아다가 오브젝트 집어넣으면 끝

export async function findById(id){
    return User.findById(id);}