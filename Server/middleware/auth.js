import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

const AUTH_ERROR = { message:'인증 에러!'};

export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!(authHeader && authHeader.startsWith('Bearer '))){
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHeader.split(' ')[1]; // 헤더에서 토큰값만 떼옴, verfication 하면 사용자
    jwt.verify(
        token,
        config.jwt.secretKey, // 이전에는 .env에 있던 t0nP%yfzjeG6IkpVDlZJs@Rgq5u#^dka 라는 값이였음
        async (error, decoded) => {
            if(error){
                return res.status(402).json(AUTH_ERROR);
            }
            const user = await userRepository.findById(decoded.id);
            if(!user){
                return res.status(403).json(AUTH_ERROR);
            }
            req.userId = user.id;
            next(); 
        }
    )
// next()? :: middleware에서 token을 비교한 다음 아이디를 찾는다.
// next가 되면 isAuth의 값이 me쪽으로 넘어온다. me쪽으로 넘어오니까 userrepository의 findbyid를 사용하여 토근하고
// 아이디를 돌려줘, 로그인이 되어있느지 확인하는 용도라고 한다.

} // authorization이라는 키가 Bearer 가 아니거나 없으면 통과못한다