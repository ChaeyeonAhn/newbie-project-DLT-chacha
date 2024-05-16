/* 
    사용자 Diet Record 와 관련된 작업 처리
*/
const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.get('/:username/member-info', async (req, res) => {
  const { username, date } = req.params;
  const username_fixed = username.replace(/^:+|:+$/g, '');
  try {
    const getInfo = await prisma.member.findMany({
      where: {
        nickname: username_fixed
      },
      select: {
        nickname: true,
        gender: true,
        birth: true
      }
    });
    res.json(getInfo);

  }catch(e){
    res.status(400).json({message: `error: ${e}`});
  }
});

module.exports = router;