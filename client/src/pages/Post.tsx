import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 
import mainLogo from "./img/logo.png";
import './css/Post.css';

import { faArrowLeft, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const PostPage = () => {
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
  

    const getSchedule = async () => {
      const { data } = await axios.get(`http://localhost:8000/posts/:${username}/:${date}/get-schedule`);
      // console.log(data.length==0);
      if (data.length == 0) {
        window.alert('New Post! Record your Day.');
        return
      }
      else {
      /* null 값 처리 */
      setSAMTime1(data[0].amTime1 ? data[0].amTime1 : "");
      setSAMContent1(data[0].amContent1 ? data[0].amContent1 : "");
      setSAMTime2(data[0].amTime2 ? data[0].amTime2 : "");
      setSAMContent2(data[0].amContent2 ? data[0].amContent2 : "");
      setSAMTime3(data[0].amTime3 ? data[0].amTime3 : "");
      setSAMContent3(data[0].amContent3? data[0].amContent3 : "");
      setSPMTime1(data[0].pmTime1 ? data[0].pmTime1 : "");
      setSPMContent1(data[0].pmContent1 ? data[0].pmContent1 : "");
      setSPMTime2(data[0].pmTime2 ? data[0].pmTime2 : "");
      setSPMContent2(data[0].pmContent2 ? data[0].pmContent2 : "");
      setSPMTime3(data[0].pmTime3 ? data[0].pmTime3 : "");
      setSPMContent3(data[0].pmContent3 ? data[0].pmContent3 : "");
      setSPMTime4(data[0].pmTime4 ? data[0].pmTime4 : "");
      setSPMContent4(data[0].pmContent4 ? data[0].pmContent4 : "");
      setSPMTime5(data[0].pmTime5 ? data[0].pmTime5 : "");
      setSPMContent5(data[0].pmContent5 ? data[0].pmContent5 : "");
      }
    }
    getSchedule().catch((e) => window.alert(`Error while Running API Call: ${e}`));
  }, [SChange, date, username]);

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
      <header className="header">
        <div className="title">
          <button className="add-post-button" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /></button>
          <img className="logo" src={mainLogo} alt="logo"/>
          <p className="DLT">{date}</p>
        </div>
        <div className="buttons">
          <p className="username">{username}</p>
        </div>
      </header>

      <div className="schedule">
        <div className="schedule-header">
          <div className="schedule-title">Schedule</div>
          <button className="modify-button" onClick={(e) => sendPost()}><FontAwesomeIcon icon={faPen} /></button>
        </div>
        <br />
        <br />
        <div className="total-table">
          <table className="schedule-table">
            <tbody>
            <tr>
              <td><input className="schedule-time" type="text" placeholder="00:00" value={SAMTime1} onChange={(e) => setSAMTime1(e.target.value)} /></td>
              <td><input className="schedule-content" type="text" placeholder="Content" value={SAMContent1} onChange={(e) => setSAMContent1(e.target.value)} /></td>
            </tr>
            <tr>
              <td><input className="schedule-time" type="text" placeholder="00:00" value={SAMTime2} onChange={(e) => setSAMTime2(e.target.value)} /></td>
              <td><input className="schedule-content" type="text" placeholder="Content" value={SAMContent2} onChange={(e) => setSAMContent2(e.target.value)} /></td>
            </tr>
            <tr>
              <td><input className="schedule-time" type="text" placeholder="00:00" value={SAMTime3} onChange={(e) => setSAMTime3(e.target.value)} /></td>
              <td><input className="schedule-content" type="text" placeholder="Content" value={SAMContent3} onChange={(e) => setSAMContent3(e.target.value)} /></td>
            </tr>
            </tbody>
          </table>
          <table className="schedule-table">
            <tbody>
            <tr>
              <td><input className="schedule-time" type="text" placeholder="00:00" value={SPMTime1} onChange={(e) => setSPMTime1(e.target.value)} /></td>
              <td><input className="schedule-content" type="text" placeholder="Content" value={SPMContent1} onChange={(e) => setSPMContent1(e.target.value)} /></td>
            </tr>
            <tr>
              <td><input className="schedule-time" type="text" placeholder="00:00" value={SPMTime2} onChange={(e) => setSPMTime2(e.target.value)} /></td>
              <td><input className="schedule-content" type="text" placeholder="Content" value={SPMContent2} onChange={(e) => setSPMContent2(e.target.value)} /></td>
            </tr>
            <tr>
              <td><input className="schedule-time" type="text" placeholder="00:00" value={SPMTime3} onChange={(e) => setSPMTime3(e.target.value)} /></td>
              <td><input className="schedule-content" type="text" placeholder="Content" value={SPMContent3} onChange={(e) => setSPMContent3(e.target.value)} /></td>
            </tr>
            <tr>
              <td><input className="schedule-time" type="text" placeholder="00:00" value={SPMTime4} onChange={(e) => setSPMTime4(e.target.value)} /></td>
              <td><input className="schedule-content" type="text" placeholder="Content" value={SPMContent4} onChange={(e) => setSPMContent4(e.target.value)} /></td>
            </tr>
            <tr>
              <td><input className="schedule-time" type="text" placeholder="00:00" value={SPMTime5} onChange={(e) => setSPMTime5(e.target.value)} /></td>
              <td><input className="schedule-content" type="text" placeholder="Content" value={SPMContent5} onChange={(e) => setSPMContent5(e.target.value)} /></td>
            </tr>
            </tbody>
          </table>
          
        </div>
      </div>

      <div>
        키 <input type="number" value={SHeight} onChange={(e) => e.target.value}/>
        체중 <input type="number" value={SWeight} onChange={(e) => e.target.value}/>
        권장 소비 칼로리 <p>{STotalCalorie}</p>
        
      </div>
      <footer>
      </footer>
    </div>
  )
}

export default PostPage;