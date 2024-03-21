const { createContext, useContext,useState, useEffect } = require("react");



const dataContext= createContext()

function useDataValue(){
    return useContext(dataContext)
}

const CustomDataContext=({children})=>{
    const [posts,setPosts]=useState([])
    const [render,setRender]=useState(true)
    useEffect(()=>{
        (async function(){
            const options = {method:'GET'}
            const response = await fetch('http://localhost:8000/post/all-posts', options)
            const data =await response.json()
            setPosts(data.posts)
        })()
    },[render])

    const updateRender=()=>{
        setRender(!render)
    }
    return(<dataContext.Provider value={{posts,updateRender}}>{children}</dataContext.Provider>)
}
export {useDataValue}
export default CustomDataContext