/* 
    사용자 Diet Record 와 관련된 작업 처리
*/
const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* 회원의 나이, 성별 값 디비에서 가져오기 -> 그래야 권장 소비 칼로리 계산 가능 */

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

/* 회원의 그 날의 건강 정보와 식단 업데이트 */

router.post('/:username/:date/update', async (req, res) => {
  const { username, date } = req.params;

  const {
    height,
    weight,
    totalCalorie,
    calorie1,
    content1,
    calorie2,
    content2,
    calorie3,
    content3,
    calorie4,
    content4,
    calorie5,
    content5,
    calorie6,
    content6,
    calorie7,
    content7,
    usedCalorie,
    leftCalorie
  } = req.body;

  if ((content1.length > 20) || (content2.length > 20) 
    || (content3.length > 20) || (content4.length > 20) 
    || (content5.length > 20) || (content6.length > 20) 
    || (content7.length > 20)) 
    {
      return res.status(400).json({message: `글자 수가 20자를 초과합니다.`});
    }

  const username_fixed = username.replace(/^:+|:+$/g, ''); /* 자꾸 : 가 포함되는 오류 수정 */
  const dateCode = username_fixed.concat(date);
  const dateCode_fixed = dateCode.replace(/:/g, ''); /* 자꾸 : 가 포함되는 오류 수정 */
  const height_int = parseInt(height);
  const weight_int = parseInt(weight);
  const totalCalorie_int = parseInt(totalCalorie);
  const calorie1_int = parseInt(calorie1);
  const calorie2_int = parseInt(calorie2);
  const calorie3_int = parseInt(calorie3);
  const calorie4_int = parseInt(calorie4);
  const calorie5_int = parseInt(calorie5);
  const calorie6_int = parseInt(calorie6);
  const calorie7_int = parseInt(calorie7);
  const usedCalorie_int = parseInt(usedCalorie);
  const leftCalorie_int = parseInt(leftCalorie);


  
  try {
    const saveInfo = await prisma.diet.update({
      data: {
        height: height_int,
        weight: weight_int,
        totalCalorie: totalCalorie_int,
        usedCalorie: usedCalorie_int,
        leftCalorie: leftCalorie_int,
        calorie1: calorie1_int,
        content1: content1,
        calorie2: calorie2_int,
        content2: content2,
        calorie3: calorie3_int,
        content3: content3,
        calorie4: calorie4_int,
        content4: content4,
        calorie5: calorie5_int,
        content5: content5,
        calorie6: calorie6_int,
        content6: content6,
        calorie7: calorie7_int,
        content7: content7,
      },
      where: {
        dateCode: dateCode_fixed
      }
    });
    res.status(200).json({message: 'Saved!'});
  }
  catch (e) {
    res.status(400).json({message: `error: ${e}`});
  }

});

/* 회원의 식단 기록 불러오기 */

router.get('/:username/:date/get', async (req, res) => {
  const { username, date } = req.params;
  const username_fixed = username.replace(/^:+|:+$/g, ''); /* 자꾸 : 가 포함되는 오류 수정 */
  const dateCode = username_fixed.concat(date);
  const dateCode_fixed = dateCode.replace(/:/g, ''); /* 자꾸 : 가 포함되는 오류 수정 */

  try {
    const record = await prisma.diet.findMany({
      where: {
        dateCode: dateCode_fixed
      }
    });
    res.json(record);
  } catch (e) {
    res.status(400).json({message: `error: ${e}`});
  }
});

module.exports = router;