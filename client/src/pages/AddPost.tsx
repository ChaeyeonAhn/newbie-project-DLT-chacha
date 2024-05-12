/*
  포스트 생성 팝업
*/

import React from 'react'; 
import { useState } from 'react';
import "./css/AddPost.css"
import axios from 'axios';

import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddPost = ({ pop, close, username, increase, postcount }) => {
  const [SGoal, setSGoal] = useState("");

  const sendNewPost = () => {
    const asyncFun = async () => {
      await axios.post('http://localhost:8000/posts/add', {
        date: new Date(),
        goal: SGoal,
        username: username
      }); 
      increase(postcount + 1);
      setSGoal("");
    }
    asyncFun().catch((e) => window.alert(`ERROR: ${e}`));
  };


  if (!pop) {
    return null;
  }

  else {
    return (
      <div className="AddPostPopUp">
        <div id="post-titlebox">
          <p id="post-title">New Track</p>
        </div>
        <div id="post-input">
          <input className="goal" type="text" value={SGoal} onChange={e => setSGoal(e.target.value)} placeholder="Today's Goal"/>

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