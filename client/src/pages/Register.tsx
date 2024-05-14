/*
  회원가입 팝업
*/

import React from 'react'; 
import { useState } from 'react';
import "./css/Register.css"
import axios from 'axios';

import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Register = ({ pop, close }) => {
  const [SNickname, setSNickname] = useState(""); /* onChange 반드시 써 줘야, input 에 뭐 입력하는지 실시간으로 보임! */
  const [SPassword, setSPassword] = useState("");
  const [SGender, setSGender] = useState("");
  const [SBirthDate, setSBirthDate] = useState("");


  const sendRegister = () => {
    const asyncFun = async () => {
      const { data } = await axios.post("http://localhost:8000/register/new", {
        nickname: SNickname,
        password: SPassword,
        gender: SGender,
        birth: SBirthDate
      });
      setSNickname("");
      setSPassword("");
      setSGender("");
      setSBirthDate("");
      window.alert(`Signed Up! ${JSON.stringify(data.message)}`);
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
          <input className="password" type="text" value={SGender} onChange={e => setSGender(e.target.value)} placeholder="Enter Gender (m or f)"/>
          <input className="password" type="date" value={SBirthDate} onChange={e => setSBirthDate(e.target.value)} placeholder="Enter Birth Date"/>
        </div>
        <div id="regisButton">
          <button id="confirm" onClick={(e) => sendRegister()}><FontAwesomeIcon icon={faCheck} /></button>
          <button id ="close" onClick={close}><FontAwesomeIcon icon={faXmark} /></button>
        </div>
      </div>
    )
  }

};

export default Register;