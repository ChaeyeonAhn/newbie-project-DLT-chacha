/* 
    Post Diary
*/
const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* diary 가져오기 */

router.get('/:username/:date/get', async (req, res) => {
  const { username, date }= req.params;
  const username_fixed = username.replace(/^:+|:+$/g, '');
  const date_fixed = date.replace(/^:+|:+$/g, '');
  const dateCode = username_fixed.concat(date_fixed);

  const diary = await prisma.diary.findMany({
    where: {
      dateCode: dateCode
    },
    select: {
      content: true,
      textsize: true
    }
  });
  res.json(diary);
});

/* diary 수정하기 */

router.post('/:username/:date/update', async (req, res) => {
  const { username, date }= req.params;
  const { content, textsize } = req.body;
  const username_fixed = username.replace(/^:+|:+$/g, '');
  const date_fixed = date.replace(/^:+|:+$/g, '');
  const dateCode = username_fixed.concat(date_fixed);
  const textsize_int = parseInt(textsize);

  try {
    await prisma.diary.updateMany({
      where: {
        dateCode: dateCode
      },
      data: {
        content: content,
        textsize: textsize_int
      }
    });
    res.status(200).json({message: 'Saved!'});
  }
  catch (e) {
    res.status(400).json({message: `error: ${e}`});
  }
});

module.exports = router;