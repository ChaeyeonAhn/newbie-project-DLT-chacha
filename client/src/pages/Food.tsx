import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

import './css/Post.css';

import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Food = () => {
  const { username, date } = useParams();

  const [SHeight, setSHeight] = useState(0);
  const [SWeight, setSWeight] = useState(0);
  const [STotalCalorie, setSTotalCalorie] = useState(0);
  const [SGender, setSGender] = useState("");
  const [SBirth, setSBirth] = useState("");
  const [SAge, setSAge] = useState(0); /* 나이 추가 계산 해야 함! */
  
  useEffect(() => {
    const getInfo = async () => {
      const { data }= await axios.get(`http://localhost:8000/food/:${username}/member-info`);
      console.log(data[0]);

      setSGender(data[0].gender);
      setSBirth(data[0].birth); /* 나이는 우리가 직접 계산해서 입력해주기. 그래야 사용자가 나이를 늘 업데이트 하지 않아도 됨 */

    }
    getInfo().catch((e) => window.alert(`Error while Running API Call: ${e}`));
  });

  const SaveHW = () => {
    const today = new Date();

    const age = (today.getFullYear() - SBirth.slice(0,4));
    
    setSAge(age);
    console.log(age);

    if (SGender === 'f') {
      setSTotalCalorie( 10 * SWeight + 6.25 * SHeight + 5 * SAge - 161 );
    }
    else {
      setSTotalCalorie( 10 * SWeight + 6.25 * SHeight + 5 * SAge + 5 );
    }

    const asyncFun = async () => {
      /* 나이는 굳이 db 에 저장 안 해도 될 듯 */
      console.log(SHeight, SWeight, STotalCalorie); /* STotalCalorie 바로 반영 안 됨 */

      if (SGender === 'f') {
        const totCal = 10 * SWeight + 6.25 * SHeight + 5 * SAge - 161;
        await axios.post(`http://localhost:8000/food/:${username}/:${date}/save`, {
          height: SHeight,
          weight: SWeight,
          totalCalorie: totCal
        });
        window.alert(`Saved!`);
        setSChange(!SChange);
      }

      else {
        const totCal = 10 * SWeight + 6.25 * SHeight + 5 * SAge + 5;
        await axios.post(`http://localhost:8000/food/:${username}/:${date}/save`, {
          height: SHeight,
          weight: SWeight,
          totalCalorie: totCal
        });
        window.alert(`Saved!`);
        setSChange(!SChange);
      }

    }
    asyncFun().catch((e) => window.alert(`ERROR: ${e}`));
  };



  return (
    <div>
      <div>
        키 <input type="number" value={SHeight} onChange={(e) => setSHeight(e.target.value)}/>
        체중 <input type="number" value={SWeight} onChange={(e) => setSWeight(e.target.value)}/>
        <button onClick={() => SaveHW()}>Confirm</button>
        권장 소비 칼로리 <p>{STotalCalorie}</p>
      </div>
    </div>
  )
}

export default Food;