import React from 'react';

import { useParams, useNavigate } from 'react-router-dom'; 
import mainLogo from "./img/logo.png";
import './css/Post.css';

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Schedule from './Schedule.tsx';
import Food from './Food.tsx';

const PostPage = () => {
  const { username, date } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <header className="header">
        <div className="title">
          <button className="add-post-button" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /></button>
          <img className="logo" src={mainLogo} alt="logo"/>
          <p className="DLT">{date}</p>
        </div>
        <div className="buttons">
          <p className="username">{username}</p>
        </div>
      </header>

      <Schedule />
      <Food />

      <footer>
      </footer>
    </div>
  )
}

export default PostPage;