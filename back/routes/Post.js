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
  try{
    const addPost = await prisma.post.create({
    data: {
      nickname: username,
      date: date,
      goal: goal,
      mood: null,
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

/* 포스트 상세 페이지에서 데이터 처리 */

router.post('/:username/:date/update-schedule', async (req, res) => {
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

  const dateCode = username.concat(date);

  console.log(req.body);

    const findExist = await prisma.schedule.findMany({
      where: {
        dateCode: dateCode
      },
      select: {
        id: true
      }
    });
    console.log(findExist);

    if (findExist.length != 0) {
      await prisma.schedule.update({
        where: {
          date: date,
          id: findExist[0].id
        },
        data: {
          date: date,
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
          pmContent5: pmContent5,
          nickname: username
        }
      });
    }

    else {
      await prisma.schedule.create({
        data: {
          date: date,
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
          pmContent5: pmContent5,
          nickname: username,
          dateCode: dateCode
        }
      });
    }
    
// } catch(e){
//   res.status(400).json({message: `error: ${e}`});
//   }
  return res.status(200).json({ isOk: true });
  
});

router.get('/:username/:date/get-schedule', async (req, res) => {
  const { username, date } = req.params;
  const dateCode = username.concat(date);
  const dateCode_fixed = dateCode.replace(/:/g, ''); /* 자꾸 : 가 포함되는 오류 수정 */
  // console.log(date0);
  // const dateObject = new Date(date);
  console.log(dateCode_fixed);
  try {
    const getExist = await prisma.schedule.findMany({
      where: {
        dateCode: dateCode_fixed
      }
    });
    console.log("get schedule?", getExist);

    if (!getExist) {
      res.status(200).json({message: "New Post!"});
      return
    }
  
    const getPost = await prisma.schedule.findMany({
      where: {
        dateCode: dateCode_fixed
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
    if (!getPost) return;
    console.log("Get schedules", getPost);
    res.json(getPost);
}catch(e){
  res.status(400).json({message: `error: ${e}`});
  }
  
  
});

router.get('/:username/:date/info', async (req, res) => {
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