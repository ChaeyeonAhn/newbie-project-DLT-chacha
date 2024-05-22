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

  useEffect(() => {
    const getMood = async () => {
      const { data } = await axios.get(`http://localhost:8000/posts/:${username}/:${date}/getMood`);
      console.log(data);
      const mood = data[0].mood;
      switch (mood) {
        case "smile": {
          setSSmile(true);
          break;
        }
        case "sad": {
          setSSad(true);
          break;
        }
        case "surprise": {
          setSSurprise(true);
          break;
        }
        case "rolling": {
          setSRolling(true);
          break;
        }
        case "meh": {
          setSMeh(true);
          break;
        }
      }
    } 
    getMood().catch((e) => window.alert(`Error while Running API Call: ${e}`));
  }, [SSmile, SMeh, SSurprise, SSad, SRolling, date, username]);

  const handleSmile = () => {
    const asyncFun = async () => {
      if (SSmile) {
        setSSmile(false);
        await axios.post(`http://localhost:8000/posts/:${username}/:${date}/updateMood`, {
          mood: ""
        });
        window.alert('Mood saved');
        return;
      };
      if (SMeh || SSurprise || SSad || SRolling) {
        setSMeh(false);
        setSSurprise(false);
        setSSad(false);
        setSRolling(false);
        setSSmile(true);
        await axios.post(`http://localhost:8000/posts/:${username}/:${date}/updateMood`, {
          mood: "smile"
        });
        window.alert('Mood saved');
        return;
      };
    };
    asyncFun().catch((e) => window.alert(`Error while Running API Call: ${e}`));
    
  };

  const handleMeh = async () => {
    if (SMeh) {
      setSMeh(false);
      await axios.post(`http://localhost:8000/posts/:${username}/:${date}/updateMood`, {
        mood: ""
      });
      window.alert('Mood saved');
      return;
    };
    if (SSmile || SSurprise || SSad || SRolling) {
      setSSmile(false);
      setSSurprise(false);
      setSSad(false);
      setSRolling(false);
      setSMeh(true);
      await axios.post(`http://localhost:8000/posts/:${username}/:${date}/updateMood`, {
        mood: "meh"
      });
      window.alert('Mood saved');
      return;
    };
  };

  const handleSurprise = async () => {
    if (SSurprise) {
      setSMeh(false);
      await axios.post(`http://localhost:8000/posts/:${username}/:${date}/updateMood`, {
        mood: ""
      });
      window.alert('Mood saved');
      return;
    };
    if (SSmile || SMeh || SSad || SRolling) {
      setSSmile(false);
      setSMeh(false);
      setSSad(false);
      setSRolling(false);
      setSSurprise(true);
      await axios.post(`http://localhost:8000/posts/:${username}/:${date}/updateMood`, {
        mood: "surprise"
      });
      window.alert('Mood saved');
      return;
    };
  };

  const handleSad = async () => {
    if (SSad) {
      setSSad(false);
      await axios.post(`http://localhost:8000/posts/:${username}/:${date}/updateMood`, {
        mood: ""
      });
      window.alert('Mood saved');
      return;
    };
    if (SSmile || SMeh || SSurprise || SRolling) {
      setSSmile(false);
      setSMeh(false);
      setSSurprise(false);
      setSRolling(false);
      setSSad(true);
      await axios.post(`http://localhost:8000/posts/:${username}/:${date}/updateMood`, {
        mood: "sad"
      });
      window.alert('Mood saved');
      return;
    };
  };

  const handleRolling = async () => {
    if (SRolling) {
      setSRolling(false);
      await axios.post(`http://localhost:8000/posts/:${username}/:${date}/updateMood`, {
        mood: ""
      });
      window.alert('Mood saved');
      return;
    };
    if (SSmile || SMeh || SSurprise || SSad) {
      setSSmile(false);
      setSMeh(false);
      setSSurprise(false);
      setSSad(false);
      setSRolling(true);
      await axios.post(`http://localhost:8000/posts/:${username}/:${date}/updateMood`, {
        mood: "rolling"
      });
      window.alert('Mood saved');
      return;
    };
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
          { SSmile ? <button id="smile-set" onClick={() => handleSmile()}><FontAwesomeIcon icon={faFaceSmileBeam} /></button> : <button id="smile" onClick={() => handleSmile()}><FontAwesomeIcon icon={faFaceSmileBeam} /></button> }
          { SMeh ? <button id="meh-set" onClick={() => handleMeh()}><FontAwesomeIcon icon={faFaceMeh} /></button> : <button id="meh" onClick={() => handleMeh()}><FontAwesomeIcon icon={faFaceMeh} /></button> }
          { SSurprise ? <button id="surprise-set" onClick={() => handleSurprise()}><FontAwesomeIcon icon={faFaceSurprise} /></button> : <button id="surprise" onClick={() => handleSurprise()}><FontAwesomeIcon icon={faFaceSurprise} /></button> }
          { SSad ? <button id="sad-set" onClick={() => handleSad()}><FontAwesomeIcon icon={faFaceSadTear} /></button> : <button id="sad" onClick={() => handleSad()}><FontAwesomeIcon icon={faFaceSadTear} /></button> }
          { SRolling ? <button id="rolling-set" onClick={() => handleRolling()}><FontAwesomeIcon icon={faFaceRollingEyes} /></button> : <button id="rolling" onClick={() => handleRolling()}><FontAwesomeIcon icon={faFaceRollingEyes} /></button> }
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