import express from 'express';
import * as tweetController from '../controller/tweet.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { isAuth } from "../middleware/auth.js";

const router = express.Router();


const validateTweet = [
    body('text')
    .trim()
    .isLength({min:4})
    .withMessage('text는 4자 이상 입력하세요!'),
    validate
];


// GET (하나씩 하나씩 REST.API를 만들어감)
// /tweets?username=:username
router.get('/', isAuth, tweetController.getTweets);


// GET
// /tweets/:id
router.get('/:id', isAuth, tweetController.getTweet);

// POST
// id: Date.now().toString()
//text, name, username :: 키하고 value하고 같으면 생략가능
// 적용 안되면 최선의 방법 : 일단 postman이나 터미널을 껐다가 다시 켜보자, 그럼 될지도?

// text가 4자 이하인 경우 에러 처리
router.post('/', isAuth, validateTweet, tweetController.createTweet);

// json key값과 같아야함


// PUT (수정) ID번호를 넘겨받고 그녀석을 수정할 수 있게
// text만 수정
router.put('/:id', isAuth, validateTweet,tweetController.updateTweet);

// Delete
router.delete('/:id', isAuth, tweetController.deleteTweet); 

export default router;