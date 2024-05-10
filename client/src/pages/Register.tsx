import React from 'react'; 
import { useEffect, useState } from 'react';
import "./css/Register.css"

const Register = ({ pop, close }) => {
  const [SNickname, setSNickname] = useState("");
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
      <div class="regisPopUp">
        <h3>Register</h3>
        <input type="text" value={SNickname} placeholder="Enter SPARCS nickname"/>
        <input type="text" value={SPassword} placeholder="Enter Password"/>
        <button onClick={(e) => sendRegister()}>Confirm</button>
        <button onClick={close}>Close</button>
        <h3>{SResultMessage}</h3>
      </div>
    )
  }

};

export default Register;