const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


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

  console.log(found_nn);

  if (!found_nn) {
    const newMem = await prisma.member.create({
      data: {
        nickname: nickname,
        password: password,
        gender: gender,
        birth: birth
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