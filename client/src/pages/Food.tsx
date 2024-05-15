import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 
import mainLogo from "./img/logo.png";
import './css/Post.css';

import { faArrowLeft, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Food = () => {
  const { username, date } = useParams();
  const navigate = useNavigate();
  const [SChange, setSChange] = useState(true);
  const [SAMTime1, setSAMTime1] = useState("");
  const [SAMContent1, setSAMContent1] = useState("");
  const [SAMTime2, setSAMTime2] = useState("");
  const [SAMContent2, setSAMContent2] = useState("");
  const [SAMTime3, setSAMTime3] = useState("");
  const [SAMContent3, setSAMContent3] = useState("");
  const [SPMTime1, setSPMTime1] = useState("");
  const [SPMContent1, setSPMContent1] = useState("");
  const [SPMTime2, setSPMTime2] = useState("");
  const [SPMContent2, setSPMContent2] = useState("");
  const [SPMTime3, setSPMTime3] = useState("");
  const [SPMContent3, setSPMContent3] = useState("");
  const [SPMTime4, setSPMTime4] = useState("");
  const [SPMContent4, setSPMContent4] = useState("");
  const [SPMTime5, setSPMTime5] = useState("");
  const [SPMContent5, setSPMContent5] = useState("");

  const [SHeight, setSHeight] = useState(0);
  const [SWeight, setSWeight] = useState(0);
  const [STotalCalorie, setSTotalCalorie] = useState(0);
  const [SGender, setSGender] = useState("");
  const [SBirth, setSBirth] = useState("");
  const [SAge, setSAge] = useState(0); /* 나이 추가 계산 해야 함! */
  
  

  useEffect(() => {
    const getInfo = async () => {
      const { data }= await axios.get(`http://localhost:8000/posts/:${username}/:${date}/info`);
      console.log(data[0]);
      setSGender(data[0].gender);
      setSBirth(data[0].birth); /* 나이는 우리가 직접 계산해서 입력해주기. 그래야 사용자가 나이를 늘 업데이트 하지 않아도 됨 */
      if (data[0].gender == 'f') {
        setSTotalCalorie( 10 * SWeight + 6.25 * SHeight + 5 * SAge - 161 );
      }
      else {
        setSTotalCalorie( 10 * SWeight + 6.25 * SHeight + 5 * SAge + 5 );
      }
    }
    getInfo().catch((e) => window.alert(`Error while Running API Call: ${e}`));
  });

    

  const sendPost = () => {
    const asyncFun = async () => {
      const { data } = await axios.post(`http://localhost:8000/posts/:${username}/:${date}/update-schedule`, {
        username: username,
        date: date,
        amTime1: SAMTime1,
        amContent1: SAMContent1,
        amTime2: SAMTime2,
        amContent2: SAMContent2,
        amTime3: SAMTime3,
        amContent3: SAMContent3,
        pmTime1: SPMTime1,
        pmContent1: SPMContent1,
        pmTime2: SPMTime2,
        pmContent2: SPMContent2,
        pmTime3: SPMTime3,
        pmContent3: SPMContent3,
        pmTime4: SPMTime4,
        pmContent4: SPMContent4,
        pmTime5: SPMTime5,
        pmContent5: SPMContent5
      });
      console.log(data);
      window.alert(`Successfully Modified!`);
      setSChange(!SChange);
    }
    asyncFun().catch((e) => window.alert(`ERROR: ${e}`));
  };



  return (
    <div>
      <div>
        키 <input type="number" value={SHeight} onChange={(e) => e.target.value}/>
        체중 <input type="number" value={SWeight} onChange={(e) => e.target.value}/>
        권장 소비 칼로리 <p>{STotalCalorie}</p>
      </div>
    </div>
  )
}

export default Food;