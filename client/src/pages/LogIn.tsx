import React from 'react'; 
import { useState } from 'react';
import "./css/LogIn.css"
import axios from 'axios';

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
        <h3>Log In</h3>
        <input type="text" value={SNickname} onChange={e => setSNickname(e.target.value)} placeholder="Enter SPARCS nickname"/>
        <input type="text" value={SPassword} onChange={e => setSPassword(e.target.value)} placeholder="Enter Password"/>
        <button onClick={(e) => sendLogIn()}>Confirm</button>
        <button onClick={close}>Close</button>
        <h3>{SResultMessage}</h3>
      </div>
    )
  }

};

export default LogIn;