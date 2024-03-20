import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styles from './post.module.css'
import {months} from '../../utils/utils'
import { FaHandsClapping } from "react-icons/fa6";
import ReactQuill from 'react-quill';
import { Dropdown } from 'primereact/dropdown';
import { useAuthValue } from '../../context/userAuthentication';


function Post() {
    const {authetication}=useAuthValue()
    const [post,setPost]=useState({});
    const [loading,setLoading]=useState(false);
    let { id } = useParams();
    var date;
    useEffect(()=>{
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/post/${id}`, { method: 'GET' });
                const data = await response.json();
                if(await response.ok){
                    date = `${new Date(data.createAt).getDate()} /${months[new Date(data.createAt).getMonth()]}/${new Date(data.createAt).getFullYear()}`;
                    setPost({...data,date});
                }           
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchData(); 
        setLoading(false);

    },[id])

  return (
    <>
    {!loading &&
        <div className={styles.postContainer}>
        <div className={styles.header}>
            <h1>{post.title}</h1>
            {authetication&&authetication.userId===post.userId&&<div>:</div>}
            
        </div>
        <div className={styles.userDetails}>
            <img src={`http://localhost:8000/${post.userAvatar}`} alt="user-avatar" width="60" height="60"/>
            <div>
                <p>{post.username}</p>
                <p>{post.date}</p>
            </div>
        </div>
        <div className={styles.viewContainer}>
            <div>
                <p><FaHandsClapping /><span>{post.post_views}</span></p>
            </div>
            <div>

            </div>
        </div>
       
        <div className={styles.descriptionContainer}>
        <ReactQuill 
        theme="snow" modules={{ toolbar: false }} 
        value={post.description}
        readOnly={true} 
      />
        </div>
    </div>
}
   </>
  )
}

export default Post