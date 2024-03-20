import React from 'react'
import styles from './postcard.module.css'
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import {months} from '../../utils/utils'

function PostCard({post}) {
    const navigate =useNavigate()
    var date = `${new Date(post.userId.createdAt).getDate()} /${months[new Date(post.userId.createdAt).getMonth()]}/${new Date(post.userId.createdAt).getFullYear()}`

    const handlePostClick=(id)=>{
            navigate(`/post/${id}`)
    }
  return (
    <div className={styles.cardContainer} onClick={()=>handlePostClick(post._id)}>
        <div className={styles.userDetails}>
            <img src={`http://localhost:8000/${post.userId.avatar}`} alt="user-image" width="30" height="30"/>
            <p>{post.userId.username}</p>
            <p>{date}</p>
        </div>
        <div className={styles.postDetail}>
            <h2>{post.title}</h2>
            <ReactQuill 
        theme="snow" modules={{ toolbar: false }} 
        bounds="#parent"
        value={post.description}
        readOnly={true} // Set readOnly to true if you only want to display the text
      />
        </div>
    </div>

  )
}

export default PostCard