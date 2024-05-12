import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 
import './css/Post.css';

import { faRightToBracket, faRightFromBracket, faUserPlus, faPlus, faFaceMehBlank, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const PostPage = () => {

  const { username, id } = useParams();
  const navigate = useNavigate();
  console.log(username);

  return (
    <div>
      <header className="header">
        <div className="title">
          <button className="add-post-button" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /></button>
          <p className="DLT">DLT</p>
        </div>
        <div className="buttons">
          <p className="username">{username}</p>
          <button className="add-post-button" ><FontAwesomeIcon icon={faPlus} /></button>
          <button className="register" ><FontAwesomeIcon icon={faUserPlus} /></button>
          
        </div>
      </header>
    </div>
  )
}

export default PostPage;