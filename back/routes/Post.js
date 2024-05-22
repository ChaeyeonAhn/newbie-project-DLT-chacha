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
  console.log(user);

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
    date: e.date,
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
  const dateCode = username.concat(date);
  console.log(dateCode);
  try{
    const addPost = await prisma.post.create({
    data: {
      nickname: username,
      date: date,
      goal: goal,
      mood: "",
      dateCode: dateCode
    }
  });

    await prisma.schedule.create({
      data: {
        date: date,
        amTime1: null, 
        amContent1: null,
        amTime2: null,
        amContent2: null,
        amTime3: null,
        amContent3: null,
        pmTime1: null,
        pmContent1: null,
        pmTime2: null,
        pmContent2: null,
        pmTime3: null,
        pmContent3: null,
        pmTime4: null,
        pmContent4: null,
        pmTime5: null,
        pmContent5: null,
        nickname: username,
        dateCode: dateCode
      }
    });

    await prisma.diet.create({
      data: {
        date: date,
        calorie1: null,
        content1: null,
        calorie2: null,
        content2: null,
        calorie3: null,
        content3: null,
        calorie4: null,
        content4: null,
        calorie5: null,
        content5: null,
        calorie6: null,
        content6: null,
        calorie7: null,
        content7: null,
        dateCode: dateCode
      }
    });

    await prisma.consume.create({
      data: {
        date: date,
        budget: null,
        spend1: null,
        content1: null,
        spend2: null,
        content2: null,
        spend3: null,
        content3: null,
        spend4: null,
        content4: null,
        spend5: null,
        content5: null,
        dateCode: dateCode
      }
    });

    await prisma.diary.create({
      data: {
        date: date,
        content: null,
        dateCode: dateCode
      }
    });
  return res.status(200).json({ isOk: true });
 } catch(e){
  res.status(400).json({message: `Already posted ${e}`});
  }
});

router.post('/:id/delete', async (req, res) => {
  const { id } =  req.params;
  console.log(id);

  const id_fixed = parseInt(id.replace(/^:+|:+$/g, ''));
  console.log(id_fixed);

  try {
    await prisma.post.delete({
      where: {
        id: id_fixed
      }
    });
    return res.status(200).json({ isOk: true });
  }  catch (e) {
    res.status(400).json({message: `error: ${e}`});
  }
});

/* post 에 해당하는 기분 표시 */

router.get('/:username/:date/getMood', async (req, res) => {
  const { username, date } = req.params;

  const username_fixed = username.replace(/^:+|:+$/g, '');
  const date_fixed = date.replace(/^:+|:+$/g, '');
  const dateCode = username_fixed.concat(date_fixed);

  const mood = await prisma.post.findMany({
    where: {
      dateCode: dateCode
    },
    select: {
      mood: true
    }
  });
  console.log(mood);
  res.json(mood);
});

router.post('/:username/:date/updateMood', async (req, res) => {
  const { username, date } = req.params;
  const { mood } = req.body;
  const username_fixed = username.replace(/^:+|:+$/g, '');
  const date_fixed = date.replace(/^:+|:+$/g, '');
  const dateCode = username_fixed.concat(date_fixed);

  try {
    const update_mood = await prisma.post.updateMany({
    where: {
      dateCode: dateCode
    },
    data: {
      mood: mood
    }
  });
  console.log(mood);
  res.status(200).json({message: 'success'});
  } catch (e) {
    res.status(400).json({message: `error: ${e}`});
  }
});

module.exports = router;