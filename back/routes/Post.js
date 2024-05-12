const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/get', async (req, res) => {
  const { username }= req.body;
  const user = JSON.stringify(username);
  console.log();

  if (!username) {
    return res.status(400).json({ message: 'Please Log In.' });
    // return res.status(400).json({ message: "Please Sign In." });
  }
  const posts = await prisma.post.findMany({
    where: {
      nickname: username
    },
    select: {
      date: true,
      goal: true
    }
  });
  const final_post = posts.map((e) => ({
    date: e.date.toLocaleDateString('ko-KR'),
    goal: e.goal
  }));
  console.log(final_post);
  res.json(final_post);

});

router.post('/add', async (req, res) => {
  const { date, goal, username } = req.body;
  if (username == "") return res.status(400).json({ message: "No Such Member" });
  const addPost = await prisma.post.create({
    data: {
      nickname: username,
      date: date,
      goal: goal,
      mood: null
    }
  });

  return res.status(200).json({ isOk: true });
})

module.exports = router;