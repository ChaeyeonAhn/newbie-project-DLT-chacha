/* 
    사용자 Diet Record 와 관련된 작업 처리
*/
const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* 회원의 나이, 성별 값 디비에서 가져오기 */

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

/* 회원의 그 날의 키, 몸무게, 토탈 섭취 권장 칼로리 입력 */

router.post('/:username/:date/save', async (req, res) => {
  const { username, date } = req.params;
  const { height, weight, totalCalorie } = req.body;
  const height_int = parseInt(height);
  const weight_int = parseInt(weight);
  const username_fixed = username.replace(/^:+|:+$/g, ''); /* 자꾸 : 가 포함되는 오류 수정 */
  const dateCode = username_fixed.concat(date);
  const dateCode_fixed = dateCode.replace(/:/g, ''); /* 자꾸 : 가 포함되는 오류 수정 */
  console.log(dateCode_fixed);
  
  try {
    const saveInfo = await prisma.diet.update({
      data: {
        height: height_int,
        weight: weight_int,
        totalCalorie: totalCalorie
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

router.get('/:username/:date/record', async (req, res) => {
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

/* 회원 식단 기록 업데이트 */

router.post('/:username/:date/update', async (req, res) => {
  const { username, date } = req.params;
  const {
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
    content7
  } = req.body;
  const username_fixed = username.replace(/^:+|:+$/g, ''); /* 자꾸 : 가 포함되는 오류 수정 */
  const dateCode = username_fixed.concat(date);
  const dateCode_fixed = dateCode.replace(/:/g, ''); /* 자꾸 : 가 포함되는 오류 수정 */

  try {
    await prisma.diet.update({
      where: {
        dateCode: dateCode_fixed
      },
      data: {
        calorie1: calorie1,
        content1: content1,
        calorie2: calorie2,
        content2: content2,
        calorie3: calorie3,
        content3: content3,
        calorie4: calorie4,
        content4: content4,
        calorie5: calorie5,
        content5: content5,
        calorie6: calorie6,
        content6: content6,
        calorie7: calorie7,
        content7: content7
      }
    });
    res.status(200).json({isOK: true});
  } catch (e) {
    res.status(400).json({message: `error: ${e}`});
  }
});




module.exports = router;