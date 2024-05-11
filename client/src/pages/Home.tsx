import React from 'react'; 
import { useEffect, useState } from 'react'; /* 외부 API 와 교류 */
import LogIn from './LogIn.tsx';
import Register from './Register.tsx';
import AddPost from './AddPost.tsx';
import "./css/Home.css";

import { faRightToBracket, faRightFromBracket, faUserPlus, faPlus } from "@fortawesome/free-solid-svg-icons";
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
      if (SUsername == "") {
        // const POSTS = [];
        // console.log(POSTS);
        // setSPostlist(POSTS.data); /* json.data */
        return;
      }
      const POSTS = await axios.post('http://localhost:8000/posts/get', {username: SUsername});
      console.log(POSTS);
      setSPostlist(POSTS.data); /* json.data */
    };
    getPost().catch((e) => window.alert(`Error while Running API Call: ${e}`));
  }, [NPostCount, SUsername, SLogInStatus]);

  const addPost = () => {
    const asyncFun = async () => {
      await axios.post('http://localhost:8000/posts/add', {
        date: new Date(),
        goal: 'New Goal',
        username: SUsername
      }); 
      setNPostCount(NPostCount + 1);
    }
    asyncFun().catch((e) => window.alert(`ERROR: ${e}`));
  };

  const LogOut = () => {
    setSLogInStatus(false);
    setSPostlist([]);
    window.alert(`Signed Out. Bye, ${SUsername}`);
    setSUsername("");
    setNPostCount(0);
  }
  const showLogIn = () => {
    setSShowLogIn(true);
  };

  const closeLogIn = () => {
    setSShowLogIn(false);
  };

  const showRegister = () => {
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
    const username = JSON.stringify(user.SNickname);
    const userId = username.replace(/^"+|"+$/g, '');
    setSUsername(userId);
    console.log(userId);
  }

  

  return (
    <div>
      <header className="header">
        <div className="title">
          <p className="DLT">Daily Life Tracker</p>
        </div>
        <div className="buttons">
          {SLogInStatus ? <p className="username">{SUsername}</p> : <p className="username">   </p>}
          <button className="add-post-button" onClick={(e) => showAddPost()}><FontAwesomeIcon icon={faPlus} /></button>
          <AddPost pop={SShowAddPost} close={closeAddPost} username={SUsername} increase={setNPostCount} postcount={NPostCount}/>
          {SLogInStatus ? <button className="login" onClick={(e) => LogOut()}><FontAwesomeIcon icon={faRightFromBracket} /></button> : <button className="login" onClick={(e) => showLogIn()}><FontAwesomeIcon icon={faRightToBracket} /></button>}
          <LogIn pop={SShowLogIn} close={closeLogIn} handleLogin={handleLogin}/>
          <button className="register" onClick={(e) => showRegister()}><FontAwesomeIcon icon={faUserPlus} /></button>
          <Register pop={SShowRegister} close={closeRegister}/>
        </div>
      </header>
      
      <ul className="post-list">
        {
          SPostlist.map(POST => (
            <li className="post-element" key = {POST.id}>
              <p className="post-date">{POST.date}</p>
              <p className="post-goal">{POST.goal}</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default HomePage;
