import React from 'react'; 
import useEffect from 'react'; /* 외부 API 와 교류 */
import useState from 'react';

/* 여기다가 지금까지 쓴 post 들을 띄우고 싶으니, 백에서 그들을 가져오는 axios가 필요하다. */
import axios from 'axios';

const HomePage = () => {
  const [SPostlist, setSPostlist] = React.useState([]);
  const [NPostCount, setNPostCount] = React.useState(0);

  useEffect(() => {
    const getPost = async () => {
      const POSTS = await axios.get('http://localhost:8080/posts');
      console.log(POSTS);
      setSPostlist(POSTS);
    };
    getPost().catch((e) => window.alert(`Error while Running API Call: ${e}`));
  }, [NPostCount]);






  return (
    <div>
      <button>New Post!</button>
      <ul>
        {
          SPostlist.map(POST => (
            <li key = {POST.id}>
              <p>{POST.title}</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
