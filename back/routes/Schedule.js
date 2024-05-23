/* 
    Post 안의 schedule part 과 관련한 작업을 수행
*/
const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


/* 포스트 상세 페이지에서 데이터 입력 후 업데이트 처리 */

router.post('/:username/:date/update', async (req, res) => {
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

  // console.log(req.body);

    const findExist = await prisma.schedule.findMany({
      where: {
        dateCode: dateCode
      },
      select: {
        id: true
      }
    });
    // console.log(findExist);

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

  return res.status(200).json({ isOk: true });
  
});

/* 디비에 있는 스케줄 데이터 불러오기 */

router.get('/:username/:date/get', async (req, res) => {
  const { username, date } = req.params;
  const dateCode = username.concat(date);
  const dateCode_fixed = dateCode.replace(/:/g, ''); /* 자꾸 : 가 포함되는 오류 수정 */

  // console.log(dateCode_fixed);
  try {
    const getExist = await prisma.schedule.findMany({
      where: {
        dateCode: dateCode_fixed
      }
    });
    // console.log("get schedule?", getExist);

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
    // console.log("Get schedules", getPost);
    res.json(getPost);
  } catch(e){
    res.status(400).json({message: `error: ${e}`});
    }

});

module.exports = router;