import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../styles/post.module.css'
import { months } from '../../utils/utils'
import { FaHandsClapping } from "react-icons/fa6";
import ReactQuill from 'react-quill';
import { useAuthValue } from '../../context/userAuthentication';
import { Button } from 'primereact/button';
import { useDataValue } from '../../context/dataContext';
import { toast } from 'react-toastify';
import { DNA } from 'react-loader-spinner'


/**
 * Component to display a post by id
 * @returns 
 */
function Post() {
    const { authetication } = useAuthValue()
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(false);
    const { updateRender } = useDataValue()
    let { id } = useParams();
    const navigate = useNavigate()
    var date;

    /**
     * API call to fetch particular post by id and set loading state
     */
    useEffect(() => {
        fetchData();
    }, [id])

    /**
     * Function to fetch post by ID and tranform createdAt date to date for render in UI
     */
    const fetchData = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/post/${id}`, { method: 'GET' });
            const data = await response.json();
            if (await response.ok) {
                date = `${new Date(data.createAt).getDate()} /${months[new Date(data.createAt).getMonth()]}/${new Date(data.createAt).getFullYear()}`;
                setPost({ ...data, date });
            } else {
                navigate('/')
            }
        } catch (error) {
            console.error('Error fetching post:', error);
            navigate('/')
        }
        setLoading(false);

    };

    /**
     * Function to delete a post by id and navigate to homepage
     * @param {*} id 
     * @param {*} e 
     */
    const handleDelete = async (id, e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/${id}`, {
                method: 'GET', headers: {
                    "Authorization": authetication.token
                }
            });
            if (await response.ok) {
                updateRender()
                toast.success("Post deleted successfully")
            }
        } catch (error) {
            console.error('Error fetching post:', error);
            toast.error("Error deleting the post.")
        }
        navigate('/')
    }

    return (
        <>
            {loading ?
                <div className={styles.loader}>
                    <DNA
                        visible={true}
                        height="120"
                        width="120"
                        ariaLabel="dna-loading"
                        wrapperClass="dna-wrapper"
                    /></div>
                :
                <div className={styles.postContainer}>
                    <div className={styles.header}>
                        <h1>{post.title}</h1>
                        {authetication && authetication.userId === post.userId &&
                            <div>
                                <Button label="Edit" severity="secondary" size="small" onClick={() => navigate(`/edit/${id}`)} raised />
                                <Button label="Delete" severity="danger" size="small" raised onClick={(e) => handleDelete(id, e)} />
                            </div>
                        }

                    </div>
                    <div className={styles.userDetails}>
                        <img src={`${process.env.REACT_APP_BACKEND_ENDPOINT}/${post.userAvatar}`} alt="user-avatar" width="60" height="60" />
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