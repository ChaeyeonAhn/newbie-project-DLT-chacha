import React from 'react'; 
import { useEffect, useState } from 'react';
import "./css/LogIn.css"

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
      <div class="loginPopUp">
        <h3>Log In</h3>
        <input type="text" value={SNickname} placeholder="Enter SPARCS nickname"/>
        <input type="text" value={SPassword} placeholder="Enter Password"/>
        <button onClick={(e) => sendLogIn()}>Confirm</button>
        <button onClick={close}>Close</button>
        <h3>{SResultMessage}</h3>
      </div>
    )
  }

};

export default LogIn;