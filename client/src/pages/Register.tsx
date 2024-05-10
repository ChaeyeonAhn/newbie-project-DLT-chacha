import React from 'react'; 
import { useState } from 'react';
import "./css/Register.css"
import axios from 'axios';

import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Register = ({ pop, close }) => {
  const [SNickname, setSNickname] = useState(""); /* onChange 반드시 써 줘야, input 에 뭐 입력하는지 실시간으로 보임! */
  const [SPassword, setSPassword] = useState("");
  const [SResultMessage, setSResultMessage] = useState("");

  const sendRegister = () => {
    const asyncFun = async () => {
      const { message } = await axios.post("http://localhost:8000/register/new", {
        nickname: SNickname,
        password: SPassword
      });
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
      <div className="regisPopUp">
        <div id="titlebox">
          <p id="title">Sign Up</p>
        </div>
        <div id="input">
          <input className="nickname" type="text" label="ID" value={SNickname} onChange={e => setSNickname(e.target.value)} placeholder="Enter SPARCS nickname"/>
          <input className="password" type="text" label="PW" value={SPassword} onChange={e => setSPassword(e.target.value)} placeholder="Enter Password"/>
        </div>
        <div id="regisButton">
          <button id="confirm" onClick={(e) => sendRegister()}><FontAwesomeIcon icon={faCheck} /></button>
          <button id ="close" onClick={close}><FontAwesomeIcon icon={faXmark} /></button>
        </div>
        <h3>{SResultMessage}</h3>
      </div>
    )
  }

};

export default Register;