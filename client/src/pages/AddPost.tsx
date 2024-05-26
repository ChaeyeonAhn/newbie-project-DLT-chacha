/*
  포스트 생성 팝업
*/

import React from 'react'; 
import { useState } from 'react';
import "./css/AddPost.css"
import axios from 'axios';

import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddPost = ({ pop, close, username, increase, postcount, show }) => {
  const [SGoal, setSGoal] = useState("");
  const [NTextCount, setNTextCount] = useState(0);

  const sendNewPost = () => {
    const asyncFun = async () => {
      await axios.post('https://api.chacha.newbie.sparcsandbox.com/posts/add', {
        date: new Date().toLocaleDateString('ko-KR'),
        goal: SGoal,
        username: username,
        textsize: NTextCount
      }); 
      increase(postcount + 1);
      setSGoal("");
    }
    asyncFun().catch((e) => window.alert(`${JSON.stringify(e.response.data.message).replace(/^"+|"+$/g, '')}`));
    close();

  };


  if (!pop) {
    return null;
  }

  else {
    return (
      <div className="AddPostPopUp">
        <div id="post-titlebox">
          <p id="post-title">새로운 포스트를 추가하세요.</p>
        </div>
        <div id="post-input">
          <input className="goal" type="text" value={SGoal} onChange={e => {setSGoal(e.target.value); setNTextCount(e.target.value.length)}} placeholder="오늘의 목표를 설정하세요."/>
          <div id="goal-size">{NTextCount}/30 자</div>

        </div>
        <div id="post-button">
          <button id="confirm" onClick={(e) => sendNewPost()}><FontAwesomeIcon icon={faCheck} /></button>
          <button id ="close" onClick={close}><FontAwesomeIcon icon={faXmark} /></button>
        </div>
      </div>
    )
  }

};

export default AddPost;