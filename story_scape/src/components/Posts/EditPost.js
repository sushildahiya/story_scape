import React, { useEffect, useState } from 'react'
import { toolbarOptions } from '../../utils/utils';
import { useAuthValue } from '../../context/userAuthentication';
import { useDataValue } from '../../context/dataContext';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../styles/write.module.css'
import TagsInput from '../Writepost/TagsInput';
import { Button } from 'primereact/button';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';
import { DNA } from 'react-loader-spinner'

function EditPost() {
    const {authetication}=useAuthValue()
    const [loading,setLoading]=useState(false);
    const [tags,setTags]=useState([])
    const [title,setTitle]=useState()
    const [description,setDescription]=useState()
    const {updateRender}= useDataValue()
    let { id } = useParams()
    const navigate = useNavigate()

  /**
     * API call to fetch particular post by id \
     */
  useEffect(()=>{
    fetchData(); 
},[id])

/**
 * Function to fetch post by ID and tranform createdAt date to date for render in UI
 */
const fetchData = async () => {
    setLoading(true);
    try {
        const response = await fetch(`${process.env.BACKEND_ENDPOINT}/post/${id}`, { method: 'GET' });
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
    setLoading(false);

};

const handleUpdate= async (e)=>{
    e.preventDefault()
    if (!title || !description || tags.length === 0) {
      alert("Title, description can't be empty and there should be atlest one tag.")
    }
    const response = await fetch(`${process.env.BACKEND_ENDPOINT}/post/edit/${id}`, {
      method: 'POST',
      body: JSON.stringify({title,description,tags}),
      headers: {
        "Authorization": authetication.token,
        "Content-Type":"application/json"
      }
    })
    if(await response.ok){
      updateRender()
      toast.success("Post updated successfully")
      navigate('/')
    }else{
        toast.error("Error updating post.")
    }
}

return (
<>
{loading ? <div className={styles.loader}>
                    <DNA
                        visible={true}
                        height="120"
                        width="120"
                        ariaLabel="dna-loading"
                        wrapperClass="dna-wrapper"
                    /></div>:
    <div className={styles.writeContainer}>
    <div className={styles.headerContainer}>
      <div>
        <h1>Publish your story</h1>

      </div>
      <div>
        <Button label="Update" icon="pi pi-external-link" onClick={handleUpdate} />
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