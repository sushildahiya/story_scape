import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from './post.module.css'
import {months} from '../../utils/utils'
import { FaHandsClapping } from "react-icons/fa6";
import ReactQuill from 'react-quill';
import { useAuthValue } from '../../context/userAuthentication';
import { Button } from 'primereact/button';
import { useDataValue } from '../../context/dataContext';

/**
 * Component to display a post by id
 * @returns 
 */
function Post() {

    const {authetication}=useAuthValue()
    const [post,setPost]=useState({});
    const [loading,setLoading]=useState(false);
    const [update,setUpdate]= useState(false)
    const {updateRender}= useDataValue()
    let { id } = useParams();
    const navigate = useNavigate()
    var date;

    /**
     * API call to fetch particular post by id and set loading state
     */
    useEffect(()=>{
        setLoading(true);
        fetchData(); 
        setLoading(false);
    },[id])

    /**
     * Function to fetch post by ID and tranform createdAt date to date for render in UI
     */
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/post/${id}`, { method: 'GET' });
            const data = await response.json();
            if(await response.ok){
                date = `${new Date(data.createAt).getDate()} /${months[new Date(data.createAt).getMonth()]}/${new Date(data.createAt).getFullYear()}`;
                setPost({...data,date});
            }else{
                navigate(-1)
            }          
        } catch (error) {
            console.error('Error fetching post:', error);
            navigate(-1)
        }
    };
    
    const toggleUpdate=()=>{
        setUpdate(!update)
    }

    /**
     * Function to delete a post by id and navigate to homepage
     * @param {*} id 
     * @param {*} e 
     */
    const handleDelete = async (id,e)=>{
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:8000/post/delete/${id}`, { method: 'GET',  headers: {
                "Authorization": authetication.token}});
            if(await response.ok){
                updateRender()
            }           
        } catch (error) {
            console.error('Error fetching post:', error);
        }
        navigate('/')
    }

  return (
    <>
    {!loading &&
        <div className={styles.postContainer}>
        <div className={styles.header}>
            <h1>{post.title}</h1>
            {authetication&&authetication.userId===post.userId&&
            <div>
                <Button label={update?"Cancel":"Edit"} severity="secondary" size="small" raised onClick={toggleUpdate}/>
                <Button label="Delete" severity="danger" size="small" raised onClick={(e)=>handleDelete(id,e)}/>
            </div>
            }
            
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
        </div>
        <div className={styles.descriptionContainer}>
        <ReactQuill 
        theme="snow" modules={{toolbar:false}} 
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