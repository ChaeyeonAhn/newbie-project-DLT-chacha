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
      id: true,
      date: true,
      goal: true,
      mood: true
    }
  });
  const final_post = posts.map((e) => ({
    id: e.id,
    date: e.date.toLocaleDateString('ko-KR'),
    goal: e.goal,
    mood: e.mood
  }));
  console.log(final_post);
  res.json(final_post);

});

/* 홈에서 로그인 후 포스트 추가 */

router.post('/add', async (req, res) => {
  const { date, goal, username } = req.body;
  if (username == "") return res.status(400).json({ message: "No Such Member" });
  
  try{
    const addPost = await prisma.post.create({
    data: {
      nickname: username,
      date: date,
      goal: goal,
      mood: null
    }
  });
  return res.status(200).json({ isOk: true });
 } catch(e){
  res.status(400).json({message: "Already posted"});
  }
});

/* 포스트 상세 페이지에서 데이터 처리 */

router.post('/:username/:date', async (req, res) => {
  const { 
    username,
    date,
    amTime1, 
    amContent1,
    amTime2,
    amContent2,
    amTime3,
    amContent3,
    pmTime1,
    pmContent1,
    pmTime2,
    pmContent2,
    pmTime3,
    pmContent3,
    pmTime4,
    pmContent4,
    pmTime5,
    pmContent5
  } = req.body;

  console.log(new Date(date));

  const addPost = await prisma.schedule.create({
    data: {
      date: new Date(date),
      amTime1: amTime1, 
      amContent1: amContent1,
      amTime2: amTime2,
      amContent2: amContent2,
      amTime3: amTime3,
      amContent3: amContent3,
      pmTime1: pmTime1,
      pmContent1: pmContent1,
      pmTime2: pmTime2,
      pmContent2: pmContent2,
      pmTime3: pmTime3,
      pmContent3: pmContent3,
      pmTime4: pmTime4,
      pmContent4: pmContent4,
      pmTime5: pmTime5,
      pmContent5: pmContent5
    }
  });
  return res.status(200).json({ isOk: true });
  
});

router.get('/:username/:date', async (req, res) => {

  const getPost = await prisma.schedule.findMany({
    where: {
      date: date
    },
    select: {
      amTime1: true, 
      amContent1: true,
      amTime2: true,
      amContent2: true,
      amTime3: true,
      amContent3: true,
      pmTime1: true,
      pmContent1: true,
      pmTime2: true,
      pmContent2: true,
      pmTime3: true,
      pmContent3: true,
      pmTime4: true,
      pmContent4: true,
      pmTime5: true,
      pmContent5: true
    }
  });
  res.json(getPost);
  
});

module.exports = router;