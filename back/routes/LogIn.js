const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.post('/check', async (req, res) => {
  const { nickname, password } = req.body;

  const found_pw = await prisma.member.findOne({
    where: {
      nickname: nickname
    },
    select: {
      password: true
    }
  });

  if (!found_pw) return res.status(400).json({ message: "No Such Member" });
  else {
    const found_password = found_pw.map((e) => (e.password));
    if (password === found_password) res.status(200).json({ message: `Welcome, ${nickname}!` });
    else return res.status(400).json({ message: "Incorrect Password" });
  }

})

module.exports = router;