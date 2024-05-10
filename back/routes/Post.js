const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

let POSTS = [
  { id: 1, date: '2024.05.09', goal: '알차게 행복하게 살자! :)'}
];

router.get('/get', (req, res) => {
  res.json(POSTS);
});

router.post('/add', (req, res) => {
  const { date, goal } = req.body;
  const addPost = {
    id: POSTS.length + 1,
    date: date,
    goal: goal
  };
  POSTS.push(addPost);
  return res.status(200).json({ isOk: true });
})

module.exports = router;