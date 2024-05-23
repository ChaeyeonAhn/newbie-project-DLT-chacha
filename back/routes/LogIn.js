/* 
    사용자 로그인 작업 처리 (아이디, 패스워드 일치 여부 체크)
*/

const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.post('/check', async (req, res) => {
  const { nickname, password } = req.body;

  const found_pw = await prisma.member.findUnique({
    where: {
      nickname: nickname
    },
    select: {
      password: true,
      nickname: true
    }
  });

  console.log(found_pw);

  if (!found_pw) return res.status(400).json({ message: "없는 아이디입니다." });
  else {
    const found_password = found_pw.password;
    if (password === found_password) {
      return res.json({ message: `${nickname}!` });
    }
    
    else {
      res.status(400).json({ message: "로그인 실패" });
    }
    
  }

})

module.exports = router;