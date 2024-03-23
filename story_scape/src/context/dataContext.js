import { createContext, useContext,useState, useEffect } from "react";

/**
 * Created dataContext
 */
const dataContext= createContext()

/**
 * Function to fetch all context states in components
 * @returns context
 */
function useDataValue(){
    return useContext(dataContext)
}

/**
 * Custom context component
 * @param {*} param0 
 * @returns 
 */
const CustomDataContext=({children})=>{
    const [posts,setPosts]=useState([])
    const [render,setRender]=useState(true)
    const [loading,setLoading]=useState(false)
    /**
     * Side effect to be render whenever there is change in value of render state
     */
    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true);
            try {
                const options = {method:'GET'};
                const response = await fetch('http://localhost:8000/post/all-posts', options);
                const data = await response.json();
                setPosts(data.posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };
        fetchData();
    },[render])

    /**
     * Method to update render state for reloading posts
     */
    const updateRender=()=>{
        setRender(!render)
    }
    return(<dataContext.Provider value={{posts,updateRender,loading}}>{children}</dataContext.Provider>)
}
export {useDataValue}
export default CustomDataContext