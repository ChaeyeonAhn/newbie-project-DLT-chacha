import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams, useNavigate } from 'react-router-dom'; 
import mainLogo from "./img/logo.png";
import './css/Post.css';

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmileBeam, faFaceMeh, faFaceSurprise, faFaceSadTear, faFaceRollingEyes } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Goal from './Goal.tsx';
import Schedule from './Schedule.tsx';
import Food from './Food.tsx';
import Consume from './Consume.tsx';
import Diary from './Diary.tsx';

const PostPage = () => {
  const { username, date } = useParams();
  const navigate = useNavigate();

  const [SSmile, setSSmile] = useState(false);
  const [SMeh, setSMeh] = useState(false);
  const [SSurprise, setSSurprise] = useState(false);
  const [SSad, setSSad] = useState(false);
  const [SRolling, setSRolling] = useState(false);
  const [SChange, setSChange] = useState(false);

  useEffect(() => {
    const getMood = async () => {
      const { data } = await axios.get(`http://localhost:8000/posts/:${username}/:${date}/getMood`);
      console.log(data);
      const mood = data[0].mood;
      switch (mood) {
        case "smile": {
          setSSmile(true);
          setSSad(false);
          setSSurprise(false);
          setSRolling(false);
          setSMeh(false);
          break;
        }
        case "sad": {
          setSSmile(false);
          setSSad(true);
          setSSurprise(false);
          setSRolling(false);
          setSMeh(false);
          break;
        }
        case "surprise": {
          setSSmile(false);
          setSSad(false);
          setSSurprise(true);
          setSRolling(false);
          setSMeh(false);
          break;
        }
        case "rolling": {
          setSSmile(false);
          setSSad(false);
          setSSurprise(false);
          setSRolling(true);
          setSMeh(false);
          break;
        }
        case "meh": {
          setSSmile(false);
          setSSad(false);
          setSSurprise(false);
          setSRolling(false);
          setSMeh(true);
          break;
        }
      }
    } 
    getMood().catch((e) => window.alert(`Error while Running API Call: ${e}`));
  }, [SChange, date, username]);

  const handleSmile = () => {
    const asyncFun = async () => {
      if (SMeh || SSurprise || SSad || SRolling || (!SSmile)) {
        setSMeh(false);
        setSSurprise(false);
        setSSad(false);
        setSRolling(false);
        setSSmile(true);
        await axios.post(`http://localhost:8000/posts/:${username}/:${date}/updateMood`, {
          mood: "smile"
        });
        setSChange(!SChange);
        return;
      }
    }
    asyncFun().catch((e) => window.alert(`Error while Running API Call: ${e}`));
    
  }

  const handleMeh = () => {
    const asyncFun = async () => {
      if (SSmile || SSurprise || SSad || SRolling || (!SMeh)) {
        setSSmile(false);
        setSSurprise(false);
        setSSad(false);
        setSRolling(false);
        setSMeh(true);
        await axios.post(`http://localhost:8000/posts/:${username}/:${date}/updateMood`, {
          mood: "meh"
        });
        setSChange(!SChange);
        return;
      }
    }
    asyncFun().catch((e) => window.alert(`Error while Running API Call: ${e}`));
  }

  const handleSurprise = async () => {
    const asyncFun = async () => {
      if (SSmile || SMeh || SSad || SRolling || (!SSurprise)) {
        setSSmile(false);
        setSMeh(false);
        setSSad(false);
        setSRolling(false);
        setSSurprise(true);
        await axios.post(`http://localhost:8000/posts/:${username}/:${date}/updateMood`, {
          mood: "surprise"
        });
        setSChange(!SChange);
        return;
      }
    }
    asyncFun().catch((e) => window.alert(`Error while Running API Call: ${e}`));
  }

  const handleSad = async () => {
    const asyncFun = async () => {
      if (SSmile || SMeh || SSurprise || SRolling || (!SSad)) {
        setSSmile(false);
        setSMeh(false);
        setSSurprise(false);
        setSRolling(false);
        setSSad(true);
        await axios.post(`http://localhost:8000/posts/:${username}/:${date}/updateMood`, {
          mood: "sad"
        });
        setSChange(!SChange);
        return;
      }
    }
    asyncFun().catch((e) => window.alert(`Error while Running API Call: ${e}`));
  };

  const handleRolling = async () => {
    const asyncFun = async () => {
      if (SSmile || SMeh || SSurprise || SSad || (!SRolling)) {
        setSSmile(false);
        setSMeh(false);
        setSSurprise(false);
        setSSad(false);
        setSRolling(true);
        await axios.post(`http://localhost:8000/posts/:${username}/:${date}/updateMood`, {
          mood: "rolling"
        });
        setSChange(!SChange);
        return;
      }
    }
    asyncFun().catch((e) => window.alert(`Error while Running API Call: ${e}`));
  };



  return (
    <div>
      <header className="header">
        <div className="title">
          <button className="go-back" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /></button>
          <img className="logo" src={mainLogo} alt="logo"/>
          <p className="DLT">{date.replace(/^:+|:+$/g, '')}</p>
        </div>
        <div className="buttons">
          { SSmile ? <button id="smile-set" onClick={(e) => handleSmile()}><FontAwesomeIcon icon={faFaceSmileBeam} /></button> : <button id="smile" onClick={() => handleSmile()}><FontAwesomeIcon icon={faFaceSmileBeam} /></button> }
          { SMeh ? <button id="meh-set" onClick={(e) => handleMeh()}><FontAwesomeIcon icon={faFaceMeh} /></button> : <button id="meh" onClick={() => handleMeh()}><FontAwesomeIcon icon={faFaceMeh} /></button> }
          { SSurprise ? <button id="surprise-set" onClick={(e) => handleSurprise()}><FontAwesomeIcon icon={faFaceSurprise} /></button> : <button id="surprise" onClick={() => handleSurprise()}><FontAwesomeIcon icon={faFaceSurprise} /></button> }
          { SSad ? <button id="sad-set" onClick={(e) => handleSad()}><FontAwesomeIcon icon={faFaceSadTear} /></button> : <button id="sad" onClick={() => handleSad()}><FontAwesomeIcon icon={faFaceSadTear} /></button> }
          { SRolling ? <button id="rolling-set" onClick={(e) => handleRolling()}><FontAwesomeIcon icon={faFaceRollingEyes} /></button> : <button id="rolling" onClick={() => handleRolling()}><FontAwesomeIcon icon={faFaceRollingEyes} /></button> }
          <p className="username">{username}</p>
        </div>
      </header>

      <div className = "block"><Goal /><Diary /></div>
      <div className = "block"><Schedule /></div>
      <div className = "block"><Food /></div>
      <div className = "block"><Consume /></div>

      <footer>
      </footer>
    </div>
  )
}

export default PostPage;