import React, {  useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toolbarOptions } from '../../utils/utils.js'
import styles from '../../styles/write.module.css'
import { Button } from 'primereact/button';
import TagsInput from './TagsInput.js';
import { useNavigate } from 'react-router-dom'
import { useAuthValue} from '../../context/userAuthentication.js'
import { useDataValue } from '../../context/dataContext.js';
import { toast } from 'react-toastify';

function WritePost() {
  const {authetication} = useAuthValue()
  const {updateRender} = useDataValue()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  const navigate = useNavigate()

  /**
   * Handles publish button click to add the post
   * @param {*} e 
   */
  const handlePublish = async (e) => {
    e.preventDefault()
    if (!title || !description || tags.length === 0) {
      alert("Title, description can't be empty and there should be atlest one tag.")
    }
    const response = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/post/create`, {
      method: 'POST',
      body: JSON.stringify({title,description,tags}),
      headers: {
        "Authorization": authetication.token,
        "Content-Type":"application/json"
      }
    })
    if(await response.ok){
      updateRender()
      toast.success('Post created successfully')
      navigate('/')
    }else{
      toast.error("Error creating the post.")
    }
  }
  
  /**
   * Handles cancel button click to cancel the post
   */
  const handleCancelButton = () => {
      navigate('/')
    }

    /**
     * Handles the changes in input data
     * @param {*} setMethod 
     * @param {*} e 
     */
    const handleChange = (setMethod, e) => {
        setMethod(e.target.value);
    };

    return (
      <div className={styles.writeContainer}>
        <div className={styles.headerContainer}>
          <div>
            <h1>Publish your story</h1>

          </div>
          <div>
            <Button label="Publish" icon="pi pi-external-link" onClick={handlePublish} />
            <Button label="Cancel" icon="pi pi-external-link" onClick={handleCancelButton} severity="danger" />
          </div>
        </div>
        <div className={styles.title}>
          <input type="text" placeholder='Title' name='title' onChange={(e) => handleChange(setTitle, e)} required />
        </div>
        <div className={styles.imageTagsContainer}>
            <TagsInput tags={tags} setTags={setTags} />
        </div>
        <div className={styles.description}>
          <ReactQuill theme="snow" modules={{ toolbar: toolbarOptions }} value={description} onChange={setDescription} placeholder='Tell your story...' />;
        </div>
      </div>
    )
  }

  export default WritePost