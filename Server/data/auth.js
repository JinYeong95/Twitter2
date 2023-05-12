import { getUsers } from "../db/database.js";
import MongoDb  from "mongodb"; 
const ObjectID = MongoDb.ObjectId;

/* 
    { ... }
    { ObjectID: asdasdaskldm, userid: 'apple', name: '김사과' }
    { userid: 'apple', name: '김사과' }

*/ 
// 몽고디비에는 다른 아이디와 구별해주기 위해 objectid라는 것이 들어간다

export async function findByUsername(username){
    return getUsers().find({username})
    .next()
    .then(mapOptionalUser);
}

export async function createUser(user){
    return getUsers().insertOne(user)
    .then((result) => {
        console.log(result);
        // result.ops[0]._id.toString()
    });
} // 오브젝트 받아다가 오브젝트 집어넣으면 끝

export async function findById(id){
    return getUsers()
    .find({_id: new ObjectID(id)})
    .next()
    .then(mapOptionalUser)
}

function mapOptionalUser(user){
    return user ? { ...user, id: user._id.toString() } : user;
}
