/*
    회원가입 -> post, /signup
    name: 빈문자 허용 안됨(notEmpty())
    email: 이메일형식체크, 모두 소문자
    url: URL체크(isURL())

    로그인 -> post, /login
    username: 공백X, 빈문자X
    password: 공백X, 최소 4자이상
*/

import express from 'express';
import * as tweetController from '../controller/tweet.js';
import {body} from 'express-validator';
import {validate} from '../middleware/validator.js';
import * as authController from '../controller/auth.js';

const router = express.Router();

const validateCredential = [
    body('username')
        .trim()
        .notEmpty()
        .isLength({min:4})
        .withMessage('아이디는 최소 4자이상 입력하세요'),
    body('password')
    .trim()
    .isLength({min:4})
    .withMessage('비밀번호는 최소 4자이상 입력하세요'),
    validate
];

const validateSignup = [
    ...validateCredential,
    body('name').notEmpty().withMessage('이름은 꼭 입력하세요'),
    body('email').isEmail().normalizeEmail().withMessage('이메일을 입력하세요'),
    body('url').isURL().withMessage('url을 입력하세요')
    .optional({nullable:true, checkFalsy:true}), // data가 null이어도 true.
    validate
]
// nullable : 데이터를 집어넣지 않아도 상관없음

router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateCredential, authController.login);

import { isAuth } from '../middleware/auth.js';

router.get('/me', isAuth, authController.me);

export default router;