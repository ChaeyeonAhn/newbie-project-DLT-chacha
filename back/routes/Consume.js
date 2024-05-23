/* 
    사용자 Consumption Record 작업 처리
*/
const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* 회원의 그 날의 소비 정보 업데이트 */

router.post('/:username/:date/update', async (req, res) => {
  const { username, date } = req.params;

  const {
    budget,
    used,
    left,
    spend1,
    content1,
    spend2,
    content2,
    spend3,
    content3,
    spend4,
    content4,
    spend5,
    content5,
  } = req.body;

  const username_fixed = username.replace(/^:+|:+$/g, ''); /* 자꾸 : 가 포함되는 오류 수정 */
  const dateCode = username_fixed.concat(date);
  const dateCode_fixed = dateCode.replace(/:/g, ''); /* 자꾸 : 가 포함되는 오류 수정 */
  
  const budget_int = parseInt(budget);
  const spend1_int = parseInt(spend1);
  const spend2_int = parseInt(spend2);
  const spend3_int = parseInt(spend3);
  const spend4_int = parseInt(spend4);
  const spend5_int = parseInt(spend5);

  const used_int = parseInt(used);
  const left_int = parseInt(left);

  try {
    await prisma.consume.updateMany({
      data: {
        budget: budget_int,
        used: used_int,
        left: left_int,
        spend1: spend1_int,
        content1: content1,
        spend2: spend2_int,
        content2: content2,
        spend3: spend3_int,
        content3: content3,
        spend4: spend4_int,
        content4: content4,
        spend5: spend5_int,
        content5: content5,
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

/* 회원의 소비 기록 불러오기 */

router.get('/:username/:date/get', async (req, res) => {
  const { username, date } = req.params;
  const username_fixed = username.replace(/^:+|:+$/g, ''); /* 자꾸 : 가 포함되는 오류 수정 */
  const dateCode = username_fixed.concat(date);
  const dateCode_fixed = dateCode.replace(/:/g, ''); /* 자꾸 : 가 포함되는 오류 수정 */

  try {
    const record = await prisma.consume.findMany({
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