import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 
import './css/Post.css';

import { faRightToBracket, faRightFromBracket, faUserPlus, faPlus, faFaceMehBlank, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
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

  

  useEffect(() => {
    const getSchedule = async () => {
      const schedule = await axios.get(`http://localhost:8000/posts/:${username}/:${date}`);
      console.log(schedule);
    }
  }, [SChange])

  const sendPost = () => {
    const asyncFun = async () => {
      const { data } = await axios.post(`http://localhost:8000/posts/:${username}/:${date}`, {
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
      window.alert(`Successfully Modified!`);
      setSChange(!SChange);
    }
  };

  return (
    <div>
      <header className="header">
        <div className="title">
          <button className="add-post-button" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /></button>
          <p className="DLT"></p>
        </div>
        <div className="buttons">
          <p className="username">{username}</p>
          <button className="add-post-button"><FontAwesomeIcon icon={faPlus} /></button>
          <button className="register"><FontAwesomeIcon icon={faUserPlus} /></button>
        </div>
      </header>

      <div className="schedule">
        <div>
          <p className="title">Schedule</p>
        </div>
        <br />
        <br />
        <div className="total-table">
          <table className="schedule-table">
            <tbody>
            <tr>
              <td className="schedule-time"><input type="text" placeholder="00:00" value={SAMTime1} onChange={(e) => setSAMTime1(e.target.value)} /></td>
              <td><input type="text" placeholder="Content" value={SAMContent1} onChange={(e) => setSAMContent1(e.target.value)} /></td>
            </tr>
            <tr>
              <td className="schedule-time"><input type="text" placeholder="00:00" value={SAMTime2} onChange={(e) => setSAMTime2(e.target.value)} /></td>
              <td><input type="text" placeholder="Content" value={SAMContent2} onChange={(e) => setSAMContent2(e.target.value)} /></td>
            </tr>
            <tr>
              <td className="schedule-time"><input type="text" placeholder="00:00" value={SAMTime3} onChange={(e) => setSAMTime3(e.target.value)} /></td>
              <td><input type="text" placeholder="Content" value={SAMContent3} onChange={(e) => setSAMContent3(e.target.value)} /></td>
            </tr>
            </tbody>
          </table>
          <table className="schedule-table">
            <tbody>
            <tr>
              <td className="schedule-time"><input type="text" placeholder="00:00" value={SPMTime1} onChange={(e) => setSPMTime1(e.target.value)} /></td>
              <td><input type="text" placeholder="Content" value={SPMContent1} onChange={(e) => setSPMContent1(e.target.value)} /></td>
            </tr>
            <tr>
              <td className="schedule-time"><input type="text" placeholder="00:00" value={SPMTime2} onChange={(e) => setSPMTime2(e.target.value)} /></td>
              <td><input type="text" placeholder="Content" value={SPMContent2} onChange={(e) => setSPMContent2(e.target.value)} /></td>
            </tr>
            <tr>
              <td className="schedule-time"><input type="text" placeholder="00:00" value={SPMTime3} onChange={(e) => setSPMTime3(e.target.value)} /></td>
              <td><input type="text" placeholder="Content" value={SPMContent3} onChange={(e) => setSPMContent3(e.target.value)} /></td>
            </tr>
            <tr>
              <td className="schedule-time"><input type="text" placeholder="00:00" value={SPMTime4} onChange={(e) => setSPMTime4(e.target.value)} /></td>
              <td><input type="text" placeholder="Content" value={SPMContent4} onChange={(e) => setSPMContent4(e.target.value)} /></td>
            </tr>
            <tr>
              <td className="schedule-time"><input type="text" placeholder="00:00" value={SPMTime5} onChange={(e) => setSPMTime5(e.target.value)} /></td>
              <td><input type="text" placeholder="Content" value={SPMContent5} onChange={(e) => setSPMContent5(e.target.value)} /></td>
            </tr>
            </tbody>
          </table>
          <button onClick={(e) => sendPost()}>Done</button>
        </div>
      </div>
    </div>
  )
}

export default PostPage;