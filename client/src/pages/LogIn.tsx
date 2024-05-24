/*
  로그인 팝업
*/

import React from 'react'; 
import { useState } from 'react';
import "./css/LogIn.css"
import axios from 'axios';

import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LogIn = ({ pop, close, handleLogin }) => {
  const [SNickname, setSNickname] = useState("");
  const [SPassword, setSPassword] = useState("");
  // const [SGender, setSGender] = useState("");

  const sendLogIn = () => {
    const asyncFun = async () => {
      const { data } = await axios.post("https://api.chacha.newbie.sparcsandbox.com/login/check", {
        nickname: SNickname,
        password: SPassword
      });
      console.log(data);
      setSNickname("");
      setSPassword("");
      // setSGender("");
      window.alert(`로그인 성공! 환영합니다, ${JSON.stringify(data.message).replace(/^"+|"+$/g, '')}`);
      handleLogin({SNickname});
      close();

    }
    asyncFun().catch((e) => 
    window.alert(`${JSON.stringify(e.response.data.message).replace(/^"+|"+$/g, '')}`)
    // console.log(e)
    );
  }


  if (!pop) {
    return null;
  }

  else {
    return (
      <div className="loginPopUp">
        <div id="login-titlebox">
          <p id="login-title">Sign In</p>
        </div>
        <div id="login-input">
          <div className="labels">ID</div>
          <input className="nickname" type="text" value={SNickname} onChange={e => setSNickname(e.target.value)} placeholder="Enter SPARCS nickname"/>
          <div className="labels">PW</div>
          <input className="password" type="text" value={SPassword} onChange={e => setSPassword(e.target.value)} placeholder="Enter Password"/>
        </div>
        <div id="login-button">
          <button id="confirm" onClick={(e) => sendLogIn()}><FontAwesomeIcon icon={faCheck} /></button>
          <button id ="close" onClick={close}><FontAwesomeIcon icon={faXmark} /></button>
        </div>
      </div>
    )
  }

};

export default LogIn;