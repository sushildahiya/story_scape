import React, { useEffect, useState } from 'react'
import { toolbarOptions } from '../../utils/utils';
import { useAuthValue } from '../../context/userAuthentication';
import { useDataValue } from '../../context/dataContext';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../Writepost/write.module.css'
import TagsInput from '../Writepost/TagsInput';
import { Button } from 'primereact/button';
import ReactQuill from 'react-quill';



function EditPost() {
    const {authetication}=useAuthValue()
    const [post,setPost]=useState({});
    const [loading,setLoading]=useState(false);
    const [tags,setTags]=useState([])
    const [title,setTitle]=useState()
    const [description,setDescription]=useState()
    const {updateRender}= useDataValue()
    let { id } = useParams()
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
            setTitle(data.title)
            setDescription(data.description)
            setTags(data.tags)
        }else{
            navigate('/')
        }          
    } catch (error) {
        console.error('Error fetching post:', error);
        navigate('/')
    }
};


return (
<>
{!loading &&
    <div className={styles.writeContainer}>
    <div className={styles.headerContainer}>
      <div>
        <h1>Publish your story</h1>

      </div>
      <div>
        <Button label="Update" icon="pi pi-external-link"  />
        <Button label="Cancel" icon="pi pi-external-link" onClick={()=>navigate(-1)} severity="danger" />
      </div>
    </div>
    <div className={styles.title}>
      <input type="text" placeholder='Title' name='title' value={title} onChange={(e)=>setTitle(e.target.value)} required />
    </div>
    <div className={styles.imageTagsContainer}>
        <TagsInput tags={tags} setTags={setTags} />
    </div>
    <div className={styles.description}>
      <ReactQuill theme="snow" modules={{ toolbar: toolbarOptions }} value={description} onChange={setDescription}placeholder='Tell your story...' />;
    </div>
  </div>
}
</>
)
}

export default EditPost