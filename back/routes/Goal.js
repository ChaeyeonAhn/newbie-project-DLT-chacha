/* 
    Post Goal
*/
const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* goal 가져오기 */

router.get('/:username/:date/get', async (req, res) => {
  const { username, date }= req.params;
  const username_fixed = username.replace(/^:+|:+$/g, '');
  const date_fixed = date.replace(/^:+|:+$/g, '');
  const dateCode = username_fixed.concat(date_fixed);

  const goal = await prisma.post.findMany({
    where: {
      dateCode: dateCode
    },
    select: {
      goal: true,
      textsize: true
    }
  });
  res.json(goal);
});

router.post('/:username/:date/update', async (req, res) => {
  const { username, date }= req.params;
  const { goal, textsize } = req.body;
  const username_fixed = username.replace(/^:+|:+$/g, '');
  const date_fixed = date.replace(/^:+|:+$/g, '');
  const dateCode = username_fixed.concat(date_fixed);
  const textsize_int = parseInt(textsize);

  try {
    await prisma.post.update({
      where: {
        dateCode: dateCode
      },
      data: {
        goal: goal,
        textsize: textsize
      }
    });
    res.status(200).json({message: 'Saved!'});
  }
  catch (e) {
    res.status(400).json({message: `error: ${e}`});
  }
});





module.exports = router;