/* 
    회원 가입 작업 처리 
*/

const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* 새로운 멤버 회원 가입 */

router.post('/new', async (req, res) => {
  const { nickname, password, gender, birth } = req.body;

  const found_nn = await prisma.member.findUnique({
    where: {
      nickname: nickname
    },
    select: {
      nickname: true
    }
  });

  // console.log(found_nn);

  if (!found_nn) {
    const newMem = await prisma.member.create({
      data: {
        nickname: nickname,
        password: password,
        gender: gender,
        birth: birth
      }
    });
    // console.log(newMem);
    res.status(200).json({ message: `Welcome, ${nickname}!` });
  }
  else {
    return res.status(400).json({ message: "존재하는 아이디입니다." });
  }

})

module.exports = router;