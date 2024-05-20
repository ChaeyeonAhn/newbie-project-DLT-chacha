import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

import './css/Consume.css';

import { faPen, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Consume = () => {
  const { username, date } = useParams();

  const [SChange, setSChange] = useState(true);
  const [SBudget, setSBudget] = useState(0);

  const [SSpend1, setSSpend1] = useState(0);
  const [SContent1, setSContent1] = useState("");
  const [SSpend2, setSSpend2] = useState(0);
  const [SContent2, setSContent2] = useState("");
  const [SSpend3, setSSpend3] = useState(0);
  const [SContent3, setSContent3] = useState("");
  const [SSpend4, setSSpend4] = useState(0);
  const [SContent4, setSContent4] = useState("");
  const [SSpend5, setSSpend5] = useState(0);
  const [SContent5, setSContent5] = useState("");
 

  const [SUsed, setSUsed] = useState(0);
  const [SLeft, setSLeft] = useState(0);


  
  useEffect(() => {
    const getRecord = async () => {
      const saved = await axios.get(`http://localhost:8000/consume/:${username}/:${date}/get`);
      console.log(saved.data[0]);

      setSBudget(saved.data[0].budget ? saved.data[0].budget : 0);
      setSSpend1(saved.data[0].spend1 ? saved.data[0].spend1 : 0);
      setSContent1(saved.data[0].content1 ? saved.data[0].content1 : "");
      setSSpend2(saved.data[0].spend2 ? saved.data[0].spend2 : 0);
      setSContent2(saved.data[0].content2 ? saved.data[0].content2 : "");
      setSSpend3(saved.data[0].spend3 ? saved.data[0].spend3 : 0);
      setSContent3(saved.data[0].content3 ? saved.data[0].content3 : "");
      setSSpend4(saved.data[0].spend4 ? saved.data[0].spend4 : 0);
      setSContent4(saved.data[0].content4 ? saved.data[0].content4 : "");
      setSSpend5(saved.data[0].spend5 ? saved.data[0].spend5 : 0);
      setSContent5(saved.data[0].content5 ? saved.data[0].content5 : "");
      
      
      setSUsed(saved.data[0].used ? saved.data[0].used : 0);
      setSLeft(saved.data[0].left ? saved.data[0].left : 0);
    }
    getRecord().catch((e) => window.alert(`Error while Running API Call: ${e}`));
  }, [SChange]);


  const Save = () => {
    const asyncFun = async () => {
      const budget = SBudget;
      const left = SBudget - (parseInt(SSpend1) + parseInt(SSpend2) + parseInt(SSpend3) + parseInt(SSpend4) + parseInt(SSpend5));
      const used = (parseInt(SSpend1) + parseInt(SSpend2) + parseInt(SSpend3) + parseInt(SSpend4) + parseInt(SSpend5));
      // console.log(typeof(used));
      setSLeft(left);
      setSUsed(used);
      setSBudget(budget);
      await axios.post(`http://localhost:8000/consume/:${username}/:${date}/update`, {
        budget: budget,
        used: used,
        left: left, 
        spend1: SSpend1,
        content1: SContent1,
        spend2: SSpend2,
        content2: SContent2,
        spend3: SSpend3,
        content3: SContent3,
        spend4: SSpend4,
        content4: SContent4,
        spend5: SSpend5,
        content5: SContent5
      });
      window.alert(`Saved!`);
      setSChange(!SChange);
    }
    asyncFun().catch((e) => window.alert(`ERROR: ${e}`));
  };


  return (
    <div className = "consume">
      <div className="consume-header">
        <div className="consume-title">소비 기록장</div>
        <button className = "save-button" onClick={() => Save()}><FontAwesomeIcon icon={faFloppyDisk} /></button>
      </div>
      <div className="budget">
        <input id="budget" type="number" value={SBudget} onChange={(e) => setSBudget(e.target.value)}/>
        <p>원 (₩)</p>
      </div>
      <div className = "consume-info">
        <p> 예산 {SBudget} 원 중 {SUsed} 원 썼고, {SLeft} 원 남았어요</p>
      </div>
      
      <table className="consume-table">
        <tbody>
        <tr>
          <td><p className="column-content">어디에 썼나요?</p></td>
          <td><p className="column-money">₩</p></td>
        </tr> 
        <tr>
          <td><input className="cons-content" type="text" placeholder="Content" value={SContent1} onChange={(e) => setSContent1(e.target.value)} /></td>
          <td><input className="money" type="number" placeholder="원" value={SSpend1} onChange={(e) => setSSpend1(e.target.value)} /></td>
        </tr>
        <tr>
          <td><input className="cons-content" type="text" placeholder="Content" value={SContent2} onChange={(e) => setSContent2(e.target.value)} /></td>
          <td><input className="money" type="number" placeholder="원" value={SSpend2} onChange={(e) => setSSpend2(e.target.value)} /></td>
        </tr>
        <tr>
          <td><input className="cons-content" type="text" placeholder="Content" value={SContent3} onChange={(e) => setSContent3(e.target.value)} /></td>
          <td><input className="money" type="number" placeholder="원" value={SSpend3} onChange={(e) => setSSpend3(e.target.value)} /></td>
        </tr>
        <tr>
          <td><input className="cons-content" type="text" placeholder="Content" value={SContent4} onChange={(e) => setSContent4(e.target.value)} /></td>
          <td><input className="money" type="number" placeholder="원" value={SSpend4} onChange={(e) => setSSpend4(e.target.value)} /></td>
        </tr>
        <tr>
          <td><input className="cons-content" type="text" placeholder="Content" value={SContent5} onChange={(e) => setSContent5(e.target.value)} /></td>
          <td><input className="money" type="number" placeholder="원" value={SSpend5} onChange={(e) => setSSpend5(e.target.value)} /></td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Consume;