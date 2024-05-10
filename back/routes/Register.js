const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.post('/new', async (req, res) => {
  const { nickname, password } = req.body;

  const found_nn = await prisma.member.findOne({
    where: {
      nickname: nickname
    },
    select: {
      nickname: true
    }
  });

  if (!found_nn) {
    const newMem = await prisma.member.create({
      data: {
        nickname: nickname,
        password: password
      }
    });
    console.log(newMem);
    res.status(200).json({ message: `Welcome, ${nickname}!` });
  }
  else {
    return res.status(400).json({ message: "Already Registered! Please Log In" });
  }

})

module.exports = router;