import React from 'react'; 
import { useEffect, useState } from 'react'; /* 외부 API 와 교류 */


/* 여기다가 지금까지 쓴 post 들을 띄우고 싶으니, 백에서 그들을 가져오는 axios가 필요하다. */
import axios from 'axios';

const HomePage = () => {
  const [SPostlist, setSPostlist] = useState([]);
  const [NPostCount, setNPostCount] = useState(0);

  useEffect(() => {
    const getPost = async () => {
      const POSTS = await axios.get('http://localhost:8080/posts');
      console.log(POSTS);
      setSPostlist(POSTS.data); /* json.data */
    };
    getPost().catch((e) => window.alert(`Error while Running API Call: ${e}`));
  }, [NPostCount]);

  const addPost = () => {
    const asyncFun = async () => {
      await axios.post('http://localhost:8080/posts', {
        date: 'New Date',
        goal: 'New Goal'
      }); 
      setNPostCount(NPostCount + 1);
    }
    asyncFun().catch((e) => window.alert(`ERROR: ${e}`));
  }



  return (
    <div>
      <button onClick={(e) => addPost()}>New Post!</button>
      <ul>
        {
          SPostlist.map(POST => (
            <li key = {POST.id}>
              <p>{POST.date}</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default HomePage;
