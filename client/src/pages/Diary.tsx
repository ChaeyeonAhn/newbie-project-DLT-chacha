import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import './css/Diary.css';

import { faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Diary = () => {
  const { username, date } = useParams();

  const [SChange, setSChange] = useState(true);
  const [SContent, setSContent] = useState("");
  const [SModify, setSModify] = useState(false);
  const [NTextCount, setNTextCount] = useState(0);

  useEffect(() => {
    const getDiary= async () => {
      const { data } = await axios.get(`http://localhost:8000/diary/:${username}/:${date}/get`);
        
      setSContent( data[0].content ? data[0].content : "" );
      setNTextCount( data[0].textsize ? data[0].textsize : "" );
      
    }
    getDiary().catch((e) => window.alert(`Error while Running API Call: ${e}`));
  }, [SChange]);

  const sendDiary = () => {
    const asyncFun = async () => {
      const { data } = await axios.post(`http://localhost:8000/diary/:${username}/:${date}/update`, {
        content: SContent,
        textsize: NTextCount
      });
      console.log(data);
      window.alert(`Successfully Modified!`);
      setSChange(!SChange);
    }
    asyncFun().catch((e) => window.alert(`ERROR: ${e}`));
    setSModify(false);
  };



  return (
    <div>
      <div id="diary">
        <div className="diary-header">
          <div className="diary-title">하루 기록장</div>
          <span>{NTextCount}</span>
          <span>/200 자</span>
          {SModify ? <button className="modify-button" onClick={(e) => sendDiary()}><FontAwesomeIcon icon={faCheck} /></button> :  <button className="modify-button" onClick={() => setSModify(true)}><FontAwesomeIcon icon={faPen} /></button>}
        </div>
        <div className="diary-body">
          {SModify ? <textarea className = "diary-content" value = {SContent} onChange={(e) => {setSContent(e.target.value); setNTextCount(e.target.value.length)}} /> : <p className = "diary-content">{SContent}</p>}
        </div>
      </div>
    </div>
  )
}

export default Diary;