import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import './css/Goal.css';

import { faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Goal = () => {
  const { username, date } = useParams();

  const [SChange, setSChange] = useState(true);
  const [SGoal, setSGoal] = useState("");
  const [SModify, setSModify] = useState(false);
  const [NTextCount, setNTextCount] = useState(0);

  useEffect(() => {

    const getGoal = async () => {
      const { data } = await axios.get(`http://localhost:8000/goal/:${username}/:${date}/get`);

      if (data.length === 0) {
        window.alert('New Post! Record your Day.');
        return
      }
      else {
        setSGoal( data[0].goal ? data[0].goal : "");
        setNTextCount( data[0].textsize ? data[0].textsize : 0);
      }
    }
    getGoal().catch((e) => window.alert(`Error while Running API Call: ${e}`));
  }, [SChange]);

  const sendGoal = () => {
    const asyncFun = async () => {
      const { data } = await axios.post(`http://localhost:8000/goal/:${username}/:${date}/update`, {
        goal: SGoal,
        textsize: NTextCount
      });
      console.log(data);
      window.alert(`수정 완료!`);
      setSChange(!SChange);
    }
    asyncFun().catch((e) => window.alert(`ERROR: ${e}`));
    setSModify(false);
  };



  return (
    <div>
      <div id="goal">
        <div className="goal-header">
          <div className="goal-title">오늘의 목표</div>
          {SModify ? <input id="goal-content" autofocus type = "text" value = {SGoal} onChange={(e) => {setSGoal(e.target.value); setNTextCount(e.target.value.length)}} /> : <p className="get-goal">{SGoal}</p>}
          <span>{NTextCount}</span>
          <span>/30 자</span>
          {SModify ? <button className="modify-button" onClick={(e) => sendGoal()}><FontAwesomeIcon icon={faCheck} /></button> :  <button className="modify-button" onClick={() => setSModify(true)}><FontAwesomeIcon icon={faPen} /></button>}
        </div>
      </div>
    </div>
  )
}

export default Goal;