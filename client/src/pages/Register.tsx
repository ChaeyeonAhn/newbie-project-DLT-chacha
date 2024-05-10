import React from 'react'; 
import { useState } from 'react';
import "./css/Register.css"
import axios from 'axios';

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
        <h3>Register</h3>
        <input type="text" value={SNickname} onChange={e => setSNickname(e.target.value)} placeholder="Enter SPARCS nickname"/>
        <input type="text" value={SPassword} onChange={e => setSPassword(e.target.value)} placeholder="Enter Password"/>
        <button onClick={(e) => sendRegister()}>Confirm</button>
        <button onClick={close}>Close</button>
        <h3>{SResultMessage}</h3>
      </div>
    )
  }

};

export default Register;