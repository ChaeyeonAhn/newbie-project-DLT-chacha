import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

import './css/Food.css';

import { faPen } from "@fortawesome/free-solid-svg-icons";
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
    /* 멤버 정보를 가져온다 */
    const getInfo = async () => {
      const { data }= await axios.get(`http://localhost:8000/food/:${username}/member-info`);
      console.log(data[0]);
      setSGender(data[0].gender);
      setSBirth(data[0].birth); /* 나이는 우리가 직접 계산해서 입력해주기. 그래야 사용자가 나이를 늘 업데이트 하지 않아도 됨 */
    }
    getInfo().catch((e) => window.alert(`Error while Running API Call: ${e}`));


    const getRecord = async () => {
      const saved = await axios.get(`http://localhost:8000/food/:${username}/:${date}/get`);
      console.log(saved.data[0]);

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
  }, [SChange, date, username]);


  const Save = () => {
    
    /* 나이를 계산한다 */
    const today = new Date();
    const age = (today.getFullYear() - SBirth.slice(0,4));
    setSAge(age);
    console.log(age);
    console.log(typeof(age));

    const asyncFun = async () => {
      /* 나이는 굳이 db 에 저장 안 해도 될 듯 */
      /* 나머지 정보는 db 에 저장 */

      if (SGender === 'f') {
        /* 미플린 세인트지올 공식 */
        const totCal = 10 * parseInt(SWeight) + 6.25 * parseInt(SHeight) + 5 * age - 161;
        const left = totCal - (parseInt(SCalorie1) + parseInt(SCalorie2) + parseInt(SCalorie3) + parseInt(SCalorie4) + parseInt(SCalorie5) + parseInt(SCalorie6) + parseInt(SCalorie7));
        const used = (parseInt(SCalorie1) + parseInt(SCalorie2) + parseInt(SCalorie3) + parseInt(SCalorie4) + parseInt(SCalorie5) + parseInt(SCalorie6) + parseInt(SCalorie7));
        // console.log(typeof(used));
        setSLeftCal(left);
        setSUsedCal(used);
        setSTotalCalorie(totCal);
        await axios.post(`http://localhost:8000/food/:${username}/:${date}/update`, {
          height: SHeight,
          weight: SWeight,
          totalCalorie: totCal,
          usedCalorie: used,
          leftCalorie: left, 
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
        window.alert(`Saved!`);
        setSChange(!SChange);
      }

      else {
        /* 미플린 세인트지올 공식 */
        const totCal = 10 * parseInt(SWeight) + 6.25 * parseInt(SHeight) + 5 * age + 5;
        const left = totCal - (parseInt(SCalorie1) + parseInt(SCalorie2) + parseInt(SCalorie3) + parseInt(SCalorie4) + parseInt(SCalorie5) + parseInt(SCalorie6) + parseInt(SCalorie7));
        const used = (parseInt(SCalorie1) + parseInt(SCalorie2) + parseInt(SCalorie3) + parseInt(SCalorie4) + parseInt(SCalorie5) + parseInt(SCalorie6) + parseInt(SCalorie7));
        setSLeftCal(left);
        setSUsedCal(used);
        setSTotalCalorie(totCal);

        await axios.post(`http://localhost:8000/food/:${username}/:${date}/update`, {
          height: SHeight,
          weight: SWeight,
          totalCalorie: totCal,
          usedCalorie: used,
          leftCalorie: left,
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
        window.alert(`Saved!`);
        setSChange(!SChange);
      }
    }
    asyncFun().catch((e) => window.alert(`ERROR: ${e}`));
  };


  return (
    <div className = "food">
      <div className="food-header">
        <div className="food-title">식단 기록장</div>
        <button className = "modify-button" onClick={() => Save()}><FontAwesomeIcon icon={faPen} /></button>
      </div>
      <div className = "HWC-table">
        <p id="alert">건강 정보를 작성하고 저장하세요.</p>
        <div className="height"><input label="키" className="height-input" type="number" value={SHeight} onChange={(e) => setSHeight(e.target.value)}/> cm</div>
        <div className="weight"><input className="weight-input" type="number" value={SWeight} onChange={(e) => setSWeight(e.target.value)}/> kg</div>
      </div>
      <div className = "food-info">
        <p> 권장 소비 칼로리 {STotalCalorie} kcal 중 {SUsedCal} kcal 먹었고, {SLeftCal} kcal 남았어요</p>
      </div>
      
      <table className="food-table">
        <tbody>
        <tr>
          <td><p className="food-content-top">식단</p></td>
          <td><p className="food-cal-top">kcal</p></td>
        </tr> 
        <tr>
          <td><input className="food-content" type="text" placeholder="Content" value={SContent1} onChange={(e) => setSContent1(e.target.value)} /></td>
          <td><input className="food-cal" type="number" placeholder="kcal" value={SCalorie1} onChange={(e) => setSCalorie1(e.target.value)} /></td>
        </tr>
        <tr>
          <td><input className="food-content" type="text" placeholder="Content" value={SContent2} onChange={(e) => setSContent2(e.target.value)} /></td>
          <td><input className="food-cal" type="number" placeholder="kcal" value={SCalorie2} onChange={(e) => setSCalorie2(e.target.value)} /></td>
        </tr>
        <tr>
          <td><input className="food-content" type="text" placeholder="Content" value={SContent3} onChange={(e) => setSContent3(e.target.value)} /></td>
          <td><input className="food-cal" type="number" placeholder="kcal" value={SCalorie3} onChange={(e) => setSCalorie3(e.target.value)} /></td>
        </tr>
        <tr>
          <td><input className="food-content" type="text" placeholder="Content" value={SContent4} onChange={(e) => setSContent4(e.target.value)} /></td>
          <td><input className="food-cal" type="number" placeholder="kcal" value={SCalorie4} onChange={(e) => setSCalorie4(e.target.value)} /></td>
        </tr>
        <tr>
          <td><input className="food-content" type="text" placeholder="Content" value={SContent5} onChange={(e) => setSContent5(e.target.value)} /></td>
          <td><input className="food-cal" type="number" placeholder="kcal" value={SCalorie5} onChange={(e) => setSCalorie5(e.target.value)} /></td>
        </tr>
        <tr>
          <td><input className="food-content" type="text" placeholder="Content" value={SContent6} onChange={(e) => setSContent6(e.target.value)} /></td>
          <td><input className="food-cal" type="number" placeholder="kcal" value={SCalorie6} onChange={(e) => setSCalorie6(e.target.value)} /></td>
        </tr>
        <tr>
          <td><input className="food-content" type="text" placeholder="Content" value={SContent7} onChange={(e) => setSContent7(e.target.value)} /></td>
          <td><input className="food-cal" type="number" placeholder="kcal" value={SCalorie7} onChange={(e) => setSCalorie7(e.target.value)} /></td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Food;