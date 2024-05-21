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

  const sendNewPost = () => {
    const asyncFun = async () => {
      await axios.post('http://localhost:8000/posts/add', {
        date: new Date().toLocaleDateString('ko-KR'),
        goal: SGoal,
        username: username
      }); 
      increase(postcount + 1);
      setSGoal("");
    }
    asyncFun().catch((e) => window.alert(`ERROR: ${e}`));
    window.alert('포스트 추가 완료');
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
          <input className="goal" type="text" value={SGoal} onChange={e => setSGoal(e.target.value)} placeholder="오늘의 목표를 설정하세요."/>

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