import React from 'react'
import styles from '../../styles/postcard.module.css'
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import {months} from '../../utils/utils'

function PostCard({post}) {
    
    // Navigate hook to custom navigation to a URL
    const navigate =useNavigate()

    /** Convert timestamp to a date format */
    var date = `${new Date(post.userId.createdAt).getDate()} /${months[new Date(post.userId.createdAt).getMonth()]}/${new Date(post.userId.createdAt).getFullYear()}`

    /**
     * Handler to handle click on a post card 
     * @param {*} id 
     */
    const handlePostClick=(id)=>{
      navigate(`/post/${id}`)
    }
  return (
    <div className={styles.cardContainer} onClick={()=>handlePostClick(post._id)}>
        <div className={styles.userDetails}>
            <img src={`${process.env.REACT_APP_BACKEND_ENDPOINT}/${post.userId.avatar}`} alt="user-avatar" width="30" height="30"/>
            <p>{post.userId.username}</p>
            <p>{date}</p>
        </div>
        <div className={styles.postDetail}>
            <h2>{post.title}</h2>
          {/* ReactQuill to render description as created in a post and making quill read only. */}
            <ReactQuill 
        theme="snow" modules={{ toolbar: false }} 
        bounds="#parent"
        value={post.description}
        readOnly={true} 
      />
        </div>
    </div>

  )
}

export default PostCard