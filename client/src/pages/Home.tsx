import React from 'react'; 
import { useEffect, useState } from 'react'; /* 외부 API 와 교류 */
import LogIn from './LogIn.tsx';
import "./css/Home.css";


/* 여기다가 지금까지 쓴 post 들을 띄우고 싶으니, 백에서 그들을 가져오는 axios가 필요하다. */
import axios from 'axios';

const HomePage = () => {
  const [SPostlist, setSPostlist] = useState([]);
  const [NPostCount, setNPostCount] = useState(0);
  const [SShowLogIn, setSShowLogIn] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const POSTS = await axios.get('http://localhost:8000/posts');
      console.log(POSTS);
      setSPostlist(POSTS.data); /* json.data */
    };
    getPost().catch((e) => window.alert(`Error while Running API Call: ${e}`));
  }, [NPostCount]);

  const addPost = () => {
    const asyncFun = async () => {
      await axios.post('http://localhost:8000/posts', {
        date: 'New Date',
        goal: 'New Goal'
      }); 
      setNPostCount(NPostCount + 1);
    }
    asyncFun().catch((e) => window.alert(`ERROR: ${e}`));
  };

  const showLogIn = () => {
    setSShowLogIn(true);
  };

  const closeLogIn = () => {
    setSShowLogIn(false);
  }

  

  return (
    <div>
      <header class="header">
        <h3 class="DLT">Daily Life Tracker</h3>
        <button onClick={(e) => showLogIn()}>Log In</button>
        <LogIn pop={SShowLogIn} close={closeLogIn}/>
        <button>Register</button>
      </header>
      <button class="add-post-button" onClick={(e) => addPost()}>New Post!</button>
      <ul class="post-list">
        {
          SPostlist.map(POST => (
            <li class="post-element" key = {POST.id}>
              <p class="post-date">{POST.date}</p>
              <p class="post-goal">{POST.goal}</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default HomePage;
