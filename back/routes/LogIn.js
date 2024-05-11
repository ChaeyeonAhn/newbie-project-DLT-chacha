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

  if (!found_pw) return res.status(400).json({ message: "No Such Member" });
  else {
    const found_password = found_pw.password;
    if (password === found_password) {
      return res.status(200).json({ message: `Welcome, ${nickname}!` });
    }
    
    else {
      res.status(400).json({ message: "Incorrect Password" });
      return { message: "Incorrect Password" };
    }
    
  }

})

module.exports = router;