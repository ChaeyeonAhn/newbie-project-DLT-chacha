import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

import './css/Food.css';

import { faPen, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Food = () => {
  const { username, date } = useParams();

  const [SChange, setSChange] = useState(true);
  const [SHeight, setSHeight] = useState(0);
  const [SWeight, setSWeight] = useState(0);
  const [STotalCalorie, setSTotalCalorie] = useState(0);
  const [SGender, setSGender] = useState("");
  const [SBirth, setSBirth] = useState("");
  const [SAge, setSAge] = useState(0); /* 나이 추가 계산 해야 함! */

  const [SCalorie1, setSCalorie1] = useState(0);
  const [SContent1, setSContent1] = useState("");
  const [SCalorie2, setSCalorie2] = useState(0);
  const [SContent2, setSContent2] = useState("");
  const [SCalorie3, setSCalorie3] = useState(0);
  const [SContent3, setSContent3] = useState("");
  const [SCalorie4, setSCalorie4] = useState(0);
  const [SContent4, setSContent4] = useState("");
  const [SCalorie5, setSCalorie5] = useState(0);
  const [SContent5, setSContent5] = useState("");
  const [SCalorie6, setSCalorie6] = useState(0);
  const [SContent6, setSContent6] = useState("");
  const [SCalorie7, setSCalorie7] = useState(0);
  const [SContent7, setSContent7] = useState("");

  const [SUsedCal, setSUsedCal] = useState(0);
  const [SLeftCal, setSLeftCal] = useState(0);


  
  useEffect(() => {
    const getRecord = async () => {
      const  saved  = await axios.get(`http://localhost:8000/food/:${username}/:${date}/record`);
      // console.log(saved.data[0]);

      setSHeight(saved.data[0].height ? saved.data[0].height : 0);
      setSWeight(saved.data[0].weight ? saved.data[0].weight : 0);
      setSTotalCalorie(saved.data[0].totalCalorie ? saved.data[0].totalCalorie : 0);
      setSCalorie1(saved.data[0].calorie1 ? saved.data[0].calorie1 : 0);
      setSContent1(saved.data[0].content1 ? saved.data[0].content1 : "");
      setSCalorie2(saved.data[0].calorie2 ? saved.data[0].calorie2 : 0);
      setSContent2(saved.data[0].content2 ? saved.data[0].content2 : "");
      setSCalorie3(saved.data[0].calorie3 ? saved.data[0].calorie3 : 0);
      setSContent3(saved.data[0].content3 ? saved.data[0].content3 : "");
      setSCalorie4(saved.data[0].calorie4 ? saved.data[0].calorie4 : 0);
      setSContent4(saved.data[0].content4 ? saved.data[0].content4 : "");
      setSCalorie5(saved.data[0].calorie5 ? saved.data[0].calorie5 : 0);
      setSContent5(saved.data[0].content5 ? saved.data[0].content5 : "");
      setSCalorie6(saved.data[0].calorie6 ? saved.data[0].calorie6 : 0);
      setSContent6(saved.data[0].content6 ? saved.data[0].content6 : "");
      setSCalorie7(saved.data[0].calorie7 ? saved.data[0].calorie7 : 0);
      setSContent7(saved.data[0].content7 ? saved.data[0].content7 : "");
      setSUsedCal(saved.data[0].usedCalorie ? saved.data[0].usedCalorie : 0);
      setSLeftCal(saved.data[0].leftCalorie ? saved.data[0].leftCalorie : 0);
    }
    getRecord().catch((e) => window.alert(`Error while Running API Call: ${e}`));
  }, [SChange]);


  const SaveHW = () => {
    /* 멤버 정보를 가져온다 */
    const getInfo = async () => {
      const { data }= await axios.get(`http://localhost:8000/food/:${username}/member-info`);
      console.log(data[0]);
      setSGender(data[0].gender);
      setSBirth(data[0].birth); /* 나이는 우리가 직접 계산해서 입력해주기. 그래야 사용자가 나이를 늘 업데이트 하지 않아도 됨 */
    }
    getInfo().catch((e) => window.alert(`Error while Running API Call: ${e}`));
    
    /* 나이를 계산한다 */
    const today = new Date();
    const age = (today.getFullYear() - SBirth.slice(0,4));
    setSAge(age);
    // console.log(age);

    /* 권소칼 계산 */
    if (SGender === 'f') {
      setSTotalCalorie( 10 * SWeight + 6.25 * SHeight + 5 * age - 161 );
    }
    else {
      setSTotalCalorie( 10 * SWeight + 6.25 * SHeight + 5 * age + 5 );
    }

    const asyncFun = async () => {
      /* 나이는 굳이 db 에 저장 안 해도 될 듯 */
      /* 나머지 정보는 db 에 저장 */
      console.log(SHeight, SWeight, STotalCalorie); /* STotalCalorie 바로 반영 안 됨 */

      if (SGender === 'f') {
        /* 미플린 세인트지올 공식 */
        const totCal = 10 * SWeight + 6.25 * SHeight + 5 * SAge - 161;
        const left = totCal - (SCalorie1 + SCalorie2 + SCalorie3 + SCalorie4 + SCalorie5 + SCalorie6 + SCalorie7);
        const used = (SCalorie1 + SCalorie2 + SCalorie3 + SCalorie4 + SCalorie5 + SCalorie6 + SCalorie7);
        setSLeftCal(left);
        setSUsedCal(used);
        await axios.post(`http://localhost:8000/food/:${username}/:${date}/save`, {
          height: SHeight,
          weight: SWeight,
          totalCalorie: totCal,
          usedCalorie: used,
          leftCalorie: left
        });
        window.alert(`Saved!`);
        setSChange(!SChange);
      }

      else {
        /* 미플린 세인트지올 공식 */
        const totCal = 10 * SWeight + 6.25 * SHeight + 5 * SAge + 5;
        const left = totCal - (SCalorie1 + SCalorie2 + SCalorie3 + SCalorie4 + SCalorie5 + SCalorie6 + SCalorie7);
        const used = (SCalorie1 + SCalorie2 + SCalorie3 + SCalorie4 + SCalorie5 + SCalorie6 + SCalorie7);
        setSLeftCal(left);
        setSUsedCal(used);
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

  const sendFood = () => {

    const asyncFun = async () => {
      const { data } = await axios.post(`http://localhost:8000/food/:${username}/:${date}/update`, {
        calorie1: SCalorie1,
        content1: SContent1,
        calorie2: SCalorie2,
        content2: SContent2,
        calorie3: SCalorie3,
        content3: SContent3,
        calorie4: SCalorie4,
        content4: SContent4,
        calorie5: SCalorie5,
        content5: SContent5,
        calorie6: SCalorie6,
        content6: SContent6,
        calorie7: SCalorie7,
        content7: SContent7
      });
      console.log(data);
      window.alert(`Successfully Modified!`);
      setSChange(!SChange);
    }
    asyncFun().catch((e) => window.alert(`ERROR: ${e}`));
  };



  return (
    <div className = "food">
      <div className="food-header">
        <div className="food-title">Health Info</div>
      </div>
      <div className = "HWC-table">
        <p>키를 입력하세요.</p>
        <input type="number" value={SHeight} onChange={(e) => setSHeight(e.target.value)}/> cm
        <p>체중을 입력하세요.</p>
        <input type="number" value={SWeight} onChange={(e) => setSWeight(e.target.value)}/> kg
        <button className = "HWbutton" onClick={() => SaveHW()}><FontAwesomeIcon icon={faFloppyDisk} /></button>
        <p>권장 소비 칼로리는 {STotalCalorie} kcal</p>
      </div>
      <div className="food-header">
        <div className="food-title">Food Diary</div>
        <button className="modify-button" onClick={(e) => sendFood()}><FontAwesomeIcon icon={faPen} /></button>
      </div>
      
      <table className="schedule-table">
        <tbody>
        <tr>
          <td><input className="schedule-time" type="number" placeholder="kcal" value={SCalorie1} onChange={(e) => setSCalorie1(e.target.value)} /></td>
          <td><input className="schedule-content" type="text" placeholder="뭐를 먹었는지 적어봐요" value={SContent1} onChange={(e) => setSContent1(e.target.value)} /></td>
        </tr>
        <tr>
          <td><input className="schedule-time" type="number" placeholder="kcal" value={SCalorie2} onChange={(e) => setSCalorie2(e.target.value)} /></td>
          <td><input className="schedule-content" type="text" placeholder="Content" value={SContent2} onChange={(e) => setSContent2(e.target.value)} /></td>
        </tr>
        <tr>
          <td><input className="schedule-time" type="number" placeholder="kcal" value={SCalorie3} onChange={(e) => setSCalorie3(e.target.value)} /></td>
          <td><input className="schedule-content" type="text" placeholder="Content" value={SContent3} onChange={(e) => setSContent3(e.target.value)} /></td>
        </tr>
        <tr>
          <td><input className="schedule-time" type="number" placeholder="kcal" value={SCalorie4} onChange={(e) => setSCalorie4(e.target.value)} /></td>
          <td><input className="schedule-content" type="text" placeholder="Content" value={SContent4} onChange={(e) => setSContent4(e.target.value)} /></td>
        </tr>
        <tr>
          <td><input className="schedule-time" type="number" placeholder="kcal" value={SCalorie5} onChange={(e) => setSCalorie5(e.target.value)} /></td>
          <td><input className="schedule-content" type="text" placeholder="Content" value={SContent5} onChange={(e) => setSContent5(e.target.value)} /></td>
        </tr>
        <tr>
          <td><input className="schedule-time" type="number" placeholder="kcal" value={SCalorie6} onChange={(e) => setSCalorie6(e.target.value)} /></td>
          <td><input className="schedule-content" type="text" placeholder="Content" value={SContent6} onChange={(e) => setSContent6(e.target.value)} /></td>
        </tr>
        <tr>
          <td><input className="schedule-time" type="number" placeholder="kcal" value={SCalorie7} onChange={(e) => setSCalorie7(e.target.value)} /></td>
          <td><input className="schedule-content" type="text" placeholder="Content" value={SContent7} onChange={(e) => setSContent7(e.target.value)} /></td>
        </tr>
        </tbody>
      </table>

      <div>
          소비한 칼로리는 <p>{SUsedCal}</p>
          남은 칼로리는 <p>{SLeftCal}</p>
      </div>
    </div>
  )
}

export default Food;