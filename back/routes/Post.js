/* 
    사용자에 따른 Post List 와,
    Post List 요소와 연결되는 각 페이지를 관리
*/
const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* 사용자 이름을 받아서 상응하는 Post List 를 반환 */

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

/* 홈에서 로그인 후 포스트 추가 */

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
});

/* 포스트 상세 페이지에서 데이터 처리 */

module.exports = router;