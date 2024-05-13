import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 
import './css/Post.css';

import { faRightToBracket, faRightFromBracket, faUserPlus, faPlus, faFaceMehBlank, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const PostPage = () => {

  const { username, id } = useParams();
  const navigate = useNavigate();
  const [SAmTime1, setSAmTime1] = useState("");
  const [SAmContent1, setSAmContent1] = useState("");
  const [SAmTime2, setSAmTime2] = useState("");
  const [SAmContent2, setSAmContent2] = useState("");
  const [SAmTime3, setSAmTime3] = useState("");
  const [SAmContent3, setSAmContent3] = useState("");
  const [SPmTime1, setSPmTime1] = useState("");
  const [SPmContent1, setSPmContent1] = useState("");
  const [SPmTime2, setSPmTime2] = useState("");
  const [SPmContent2, setSPmContent2] = useState("");
  const [SPmTime3, setSPmTime3] = useState("");
  const [SPmContent3, setSPmContent3] = useState("");
  const [SPmTime4, setSPmTime4] = useState("");
  const [SPmContent4, setSPmContent4] = useState("");


  console.log(username);

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
      <div>
        <p>오늘의 일과</p>
        <table className="schedule-table">
          <tr>
            <td><input type="text" placeholder="00:00" value={SAmTime1} onChange={(e) => setSAMTime1(e.target.value)} /></td>
            <td><input type="text" placeholder="Content" value={SAmContent1} onChange={(e) => setSAMContent1(e.target.value)} /></td>
          </tr>
          <tr>
            <td><input type="text" placeholder="00:00" value={SAmTime2} onChange={(e) => setSAMTime2(e.target.value)} /></td>
            <td><input type="text" placeholder="Content" value={SAmContent2} onChange={(e) => setSAMContent2(e.target.value)} /></td>
          </tr>
          <tr>
            <td><input type="text" placeholder="00:00" value={SAmTime3} onChange={(e) => setSAMTime3(e.target.value)} /></td>
            <td><input type="text" placeholder="Content" value={SAmContent3} onChange={(e) => setSAMContent3(e.target.value)} /></td>
          </tr>
        </table>
        <table className="schedule-table">
          <tr>
            <td><input type="text" placeholder="00:00" value={SPmTime1} onChange={(e) => setSPMTime1(e.target.value)} /></td>
            <td><input type="text" placeholder="Content" value={SPmContent1} onChange={(e) => setSPMContent1(e.target.value)} /></td>
          </tr>
          <tr>
            <td><input type="text" placeholder="00:00" value={SPmTime2} onChange={(e) => setSPMTime2(e.target.value)} /></td>
            <td><input type="text" placeholder="Content" value={SPmContent2} onChange={(e) => setSPMContent2(e.target.value)} /></td>
          </tr>
          <tr>
            <td><input type="text" placeholder="00:00" value={SPmTime3} onChange={(e) => setSPMTime3(e.target.value)} /></td>
            <td><input type="text" placeholder="Content" value={SPmContent3} onChange={(e) => setSPMContent3(e.target.value)} /></td>
          </tr>
          <tr>
            <td><input type="text" placeholder="00:00" value={SPmTime4} onChange={(e) => setSPMTime4(e.target.value)} /></td>
            <td><input type="text" placeholder="Content" value={SPmContent4} onChange={(e) => setSPMContent4(e.target.value)} /></td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default PostPage;