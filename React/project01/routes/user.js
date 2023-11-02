const express = require('express')
const router = express.Router()
const conn = require('../database') // BD연결



// 로그인
router.post('/login', (req, res) => {
    console.log('로그인 시도', req.body.form);
    let { user_id, user_password } = req.body.form;
    let sql = "select user_id, user_nick from user where USER_ID = ? and USER_PASSWORD = ?";
    conn.query(sql, [user_id, user_password], (err, rows) => {
        if (err) { // 에러가 발생한 경우
            console.error('로그인 실패', err);
            res.status(500).send('로그인 실패');
        }
        else {
            if (rows.length > 0) { // 정상적인 출력이 나온경우
                console.log('로그인 성공', user_id);
                res.status(200).send(rows); // 출력을 보냄
            }
            else {
                console.log('일치하는 데이터가 없습니다. 로그인 실패', user_id);
                res.status(200).send('로그인 실패')
            }
        }
    })
})

// 회원가입 중복 체크
// 받은 요청에 해당 값이 있는지로 아이디, 닉, 이메일 구분
router.post('/check', (req, res) => {
    if (req.body.user_id) { // id가 있는가
        console.log('회원가입 아이디 중복 체크', req.body);
        let { user_id } = req.body;
        let sql = "select user_id from user where user_id = ?";
        conn.query(sql, [user_id], (err, rows) => {
            if (err) {
                console.error('회원가입 아이디 중복 체크 에러', err);
                res.status(500).send('아이디 중복 체크 에러');
            }
            else {
                if (rows.length > 0) {
                    console.log('아이디 있음', user_id);
                    res.status(200).send('아이디 있음');
                }
                else {
                    console.log('아이디 없음', user_id);
                    res.status(200).send('아이디 없음');
                }
            }
        })
    }
    else if (req.body.user_nick) { // nick이 있는가
        console.log('회원가입 닉네임 중복 체크', req.body);
        let { user_nick } = req.body;
        let sql = "select user_nick from user where user_nick = ?";
        conn.query(sql, [user_nick], (err, rows) => {
            if (err) {
                console.error('회원가입 닉네임 중복 체크 에러', err);
                res.status(500).send('닉네임 중복 체크 에러');
            }
            else {
                if (rows.length > 0) {
                    console.log('닉네임 있음', user_nick);
                    res.status(200).send('닉네임 있음');
                }
                else {
                    console.log('닉네임 없음', user_nick);
                    res.status(200).send('닉네임 없음');
                }
            }
        })
    }
    else if (req.body.user_email) { // email이 있는가
        console.log('회원가입 이메일 중복 체크', req.body);
        let { user_email } = req.body;
        let sql = "select user_email from user where user_email =?";
        conn.query(sql, [user_email], (err, rows) => {
            if (err) {
                console.error('회원가입 이메일 중복 체크 에러', err);
                res.status(500).send('닉네임 중복 체크 에러');
            }
            else {
                if (rows.length > 0) {
                    console.log('이메일 있음', user_email);
                    res.status(200).send('이메일 있음');
                }
                else {
                    console.log('이메일 없음', user_email);
                    res.status(200).send('이메일 없음');
                }
            }
        })
    }
})

// 회원가입
router.post('/join', (req, res) => {
    console.log('회원 가입 시도', req.body.form);
    const { user_id, user_password, user_nick, user_name, user_email, user_phone, user_address } = req.body.form;

    let sql = "INSERT INTO user (user_id, user_password, user_nick, user_name, user_email, user_phone, user_address) VALUES (?,?,?,?,?,?,?)";
    conn.query(sql, [user_id, user_password, user_nick, user_name, user_email, user_phone, user_address], (err, rows) => {
        if (err) {
            console.error('회원가입 실패', err);
            res.status(500).send('회원가입 실패');
        }
        else {
            if (rows.affectedRows > 0) {
                console.log('회원가입 성공', user_id);
                res.status(200).send('회원가입 성공')
            }
            else {
                console.log('회원 가입 데이터 삽입 실패', rows);
                res.status(500).send('회원가입 실패')
            }
        }
    })
});


module.exports = router