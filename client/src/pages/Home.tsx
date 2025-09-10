/* 유저 접속 첫 화면 */

import React from 'react'; 
import { useEffect, useState } from 'react'; /* 외부 API 와 교류 */
import { Link } from 'react-router-dom';
import LogIn from './LogIn.tsx';
import Register from './Register.tsx';
import AddPost from './AddPost.tsx';
import "./css/Home.css";
import mainLogo from "./img/logo.png";
import homeLogo from "./img/homelogo.png";

import { faRightToBracket, faRightFromBracket, faUserPlus, faPlus, faFaceMehBlank, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmileBeam, faFaceMeh, faFaceSurprise, faFaceSadTear, faFaceRollingEyes } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


/* 여기다가 지금까지 쓴 post 들을 띄우고 싶으니, 백에서 그들을 가져오는 axios가 필요하다. */
import axios from 'axios';

const HomePage = () => {
  const [SPostlist, setSPostlist] = useState([]);
  const [NPostCount, setNPostCount] = useState(0);
  const [SShowLogIn, setSShowLogIn] = useState(false);
  const [SShowRegister, setSShowRegister] = useState(false);
  const [SShowAddPost, setSShowAddPost] = useState(false);
  const [SLogInStatus, setSLogInStatus] = useState(false);
  const [SUsername, setSUsername] = useState("");

  useEffect(() => {
    const getPost = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setSUsername(token);
        setSLogInStatus(true);
        setSShowLogIn(false);
        const POSTS = await axios.post('http://localhost:8000/posts/get', {username: token});
        if (POSTS.length === 0) return;

        setSPostlist(POSTS.data); /* json.data */
      }
      else if (SUsername) {
        setSUsername(SUsername);
        const POSTS = await axios.post('http://localhost:8000/posts/get', {username: SUsername});
        // console.log(POSTS);
        setSPostlist(POSTS.data); /* json.data */
      }
      else return;
    };
    getPost().catch((e) => window.alert(`Error while Running API Call: ${e}`));
  }, [NPostCount, SUsername, SLogInStatus]);

  const LogOut = () => {
    setSLogInStatus(false);
    setSPostlist([]);
    // setSToken("");
    window.localStorage.removeItem('token');
    window.alert(`로그아웃 완료.`);
    setSUsername("");
    setNPostCount(0);
  }
  const showLogIn = () => {
    if (SShowRegister) return;
    else setSShowLogIn(true);
  };

  const closeLogIn = () => {
    setSShowLogIn(false);
  };

  const showRegister = () => {
    if (SShowLogIn) return;
    setSShowRegister(true);
  };

  const closeRegister = () => {
    setSShowRegister(false);
  };

  const showAddPost = () => {
    setSShowAddPost(true);
  };

  const closeAddPost = () => {
    setSShowAddPost(false);
  }



  const handleLogin = (user) => {
    setSLogInStatus(true);
    setSShowLogIn(false);
    const username = user.SNickname;
    const userId = username.replace(/^"+|"+$/g, '');
    setSUsername(userId);

    // setSToken(userId);
    window.localStorage.setItem('token', userId);

  }

  const deletePost = (id) => {
    const delete_confirm = window.confirm('한 번 삭제되면 복구할 수 없습니다. 그래도 삭제하시겠습니까?');

    if (delete_confirm) {
      const asyncFun = async () => {
        await axios.post(`http://localhost:8000/posts/:${id}/delete`, {
          id: id
        });
      }; asyncFun().catch((e) => window.alert(`Error while Running API Call: ${e}`));
      setNPostCount(NPostCount - 1);
      window.alert('삭제가 완료되었습니다.');
    }

    else {
      window.alert('삭제를 취소합니다.');
    }
  }

  

  return (
    <div id="whole page">
        {
        SLogInStatus ? 
        <div>
          <header className="header">
            <div className="title">
              <img alt="DLT" className="logo" src={mainLogo}/>
              <p className="DLT">Daily Life Tracker</p>
            </div>
            <div className="buttons">
              <p className="username">{SUsername}</p>
              <button className="add-post-button" onClick={(e) => showAddPost()}><FontAwesomeIcon icon={faPlus} /></button>
              <AddPost pop={SShowAddPost} close={closeAddPost} username={SUsername} increase={setNPostCount} postcount={NPostCount} />
              <button className="login" onClick={(e) => LogOut()}><FontAwesomeIcon icon={faRightFromBracket} /></button>
              <LogIn pop={SShowLogIn} close={closeLogIn} handleLogin={handleLogin}/>
            </div>
          </header>
          <ul className="post-list">
          {
            SPostlist.map(POST => (
              <div className = "post-one" key={POST.id}>
              <Link className="post-link" to={`/post/${SUsername}/${POST.date}`} key = {POST.id}>
                <li className="post-element" key = {POST.id}>
                  <p className="post-date">{POST.date}</p>
                  <div className="post-goal-mood">
                    <p className="post-goal">{POST.goal}</p>
                    { POST.mood === "smile" ? <p className="post-mood"><FontAwesomeIcon icon={faFaceSmileBeam} /></p> :
                      POST.mood === "sad" ? <p className="post-mood"><FontAwesomeIcon icon={faFaceSadTear} /></p> :
                      POST.mood === "surprise" ? <p className="post-mood"><FontAwesomeIcon icon={faFaceSurprise} /></p> :
                      POST.mood === "rolling" ? <p className="post-mood"><FontAwesomeIcon icon={faFaceRollingEyes} /></p> :
                      POST.mood === "meh" ? <p className="post-mood"><FontAwesomeIcon icon={faFaceMeh} /></p> :
                      <p className="post-mood"><FontAwesomeIcon icon={faFaceMehBlank} /></p> }
                  </div>
                </li>
              </Link>
              <button className = "del-button" onClick={(e) => deletePost(POST.id)}><FontAwesomeIcon icon={faTrash} /></button>
              </div>
            ))
          }
          </ul>
        </div>
        :
        <div>
            <div className="not-login-buttons">
              <div className="welcome">오늘 하루를 기록하려면 로그인 하세요.</div>
              <button className="login" onClick={(e) => showLogIn()}><FontAwesomeIcon icon={faRightToBracket} /></button>
              <LogIn pop={SShowLogIn} close={closeLogIn} handleLogin={handleLogin}/>
              <button className="register" onClick={(e) => showRegister()}><FontAwesomeIcon icon={faUserPlus} /></button>
              <Register pop={SShowRegister} close={closeRegister}/>
            </div>
            <div id="body">
              
              <div><img alt="DLT" className="big-logo" src={homeLogo}/></div>

            </div>
        </div>
        } 
    </div>
  )
}

export default HomePage;
