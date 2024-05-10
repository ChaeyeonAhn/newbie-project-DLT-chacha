import React from 'react'; 
import { useState } from 'react';
import "./css/LogIn.css"
import axios from 'axios';

import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LogIn = ({ pop, close }) => {
  const [SNickname, setSNickname] = useState("");
  const [SPassword, setSPassword] = useState("");
  const [SResultMessage, setSResultMessage] = useState("");

  const sendLogIn = () => {
    const asyncFun = async () => {
      const { message } = await axios.post("http://localhost:8000/login/check", {
        nickname: SNickname,
        password: SPassword
      });
      console.log(message);
      setSNickname("");
      setSPassword("");
      setSResultMessage(message);
    }
    asyncFun().catch((e) => window.alert(`ERROR: ${e}`));
  }


  if (!pop) {
    return null;
  }

  else {
    return (
      <div className="loginPopUp">
        <div id="login-titlebox">
          <p id="login-title">Log In</p>
        </div>
        <div id="login-input">
          <input className="nickname" type="text" value={SNickname} onChange={e => setSNickname(e.target.value)} placeholder="Enter SPARCS nickname"/>
          <input className="password" type="text" value={SPassword} onChange={e => setSPassword(e.target.value)} placeholder="Enter Password"/>
        </div>
        <div id="login-button">
          <button id="confirm" onClick={(e) => sendLogIn()}><FontAwesomeIcon icon={faCheck} /></button>
          <button id ="close" onClick={close}><FontAwesomeIcon icon={faXmark} /></button>
        </div>
        <h3>{SResultMessage}</h3>
      </div>
    )
  }

};

export default LogIn;