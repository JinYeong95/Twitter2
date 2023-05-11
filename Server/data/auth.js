// let users = [
//     {
//         id: '1',
//         username: 'melon',
//         password: '$2b$10$4Kh.GWN1MvJdWgWRNznDy.TPaQqdXITkBaMe9.xvgcFIhHLvi/5IC',
//         name:'이메론',
//         email:'melon@melon.com',
//         url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS87Gr4eFO7Pt2pE8oym4dxXnxGZYL2Pl_N5A&usqp=CAU'
//     }
// ];
// import { db } from '../db/database.js';
import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
    'user',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        name : {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        url: DataTypes.TEXT,
        regdate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
        // regdate : 날짜타입, 현재시간을 자동으로 등록
    },
    { timestamps: false }
)


export async function findByUsername(username){
    // return users.find((user) => user.username === username);
    return User.findOne({where: { username }}); // 조건이 username인 것만 찾아달라
}

export async function createUser(user){
    return User.create(user).then((data) => data.dataValues.id); // 해당 데이터를 받아 datavalues의 id를 받게 되면 
    
    // const {username, password, name, email, url} = user;
    // return db.execute('insert into users (username, password, name, email, url) values (?, ?, ?, ?, ?)', [username, password, name, email, url]).then((result) => result[0].insertId);

    // const created = { ...user, id: Date.now().toString() };
    // users.push(created);
    // return created.id;
}

export async function findById(id){
    // return db.execute('select id from users where id =?', [id]).then((result) => result[0][0]);

    return User.findByPk(id); // primary key를 찾아달라(primary key가 id면 가능하다)
}