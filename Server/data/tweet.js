// import { db } from '../db/database.js';
// import * as userRepository from './auth.js';
import SQ, { Sequelize } from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js'; 


const DataTypes = SQ.DataTypes;

const Tweet = sequelize.define(
    'tweet', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
    }
);
Tweet.belongsTo(User);

const INCLUDE_USER = {
    attributes: [
        'id',
        'text',
        'createdAt',
        'userId',
        [Sequelize.col('user.name'), 'name'],
        [Sequelize.col('user.username'), 'username'],
        [Sequelize.col('user.url'), 'url'],
    ], // 내가 보고싶은 것만
     include: {
        model: User,
        attributes: [],
     }
}
// const SELECT_JOIN = 'select tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw left outer join users as us on tw.userId = us.id';
// const ORDER_DESC = 'order by tw.createdAt desc';

const ORDER_DESC = {
    order: [['createdAt', 'DESC']]
}

export async function getAll(){
    // return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`)
    // .then((result) => result[0]);
  return Tweet.findAll({  ...INCLUDE_USER, ...ORDER_DESC });
}

export async function getAllByUsername(username){
    return Tweet.findAll({
        ...INCLUDE_USER, 
        ...ORDER_DESC,
    include: {
        ...INCLUDE_USER.include,
        where: { username }
    }});
}

export async function getById(id){
    return Tweet.findOne({
        where: {id},
        ...INCLUDE_USER
    });
}

export async function create(text, userId){
    return Tweet.create({ text, userId}).then((data) => { console.log(data);
    return data});
    // return db.execute('insert into tweets (text, createdAt, userId) values (?, ?, ?)', [text, new Date(), userId])
    // .then((result) => console.log(result));
}

export async function update(id, text){
    // return db.execute('update tweets SET text=? where id=?', [text, id]).then(() => getById(id));
    return Tweet.findByPk(id, INCLUDE_USER).then((tweet) => {
        tweet.text = text;
        return tweet.save();
    });
}

export async function remove(id){
    return Tweet.findByPk(id).then((tweet) => {
        tweet.destroy();
    })
    // return db.execute('delete from tweets where id=?', [id]);
}