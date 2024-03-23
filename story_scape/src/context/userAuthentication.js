const { createContext, useContext,useState, useEffect } = require("react");

/**
 * Created user authetication context
 */
const userAuthentication = createContext()

/**
 * Function to fetch all context states in components
 * @returns context
 */
function useAuthValue(){
    return useContext(userAuthentication)
}

/**
 * Context component to be used by the component
 * @param {*} param0 
 * @returns 
 */
const CustomAutheticationContext=({children})=>{
    const [authetication,setAuthetication]=useState(null)
    useEffect(()=>{
        const items = JSON.parse(localStorage.getItem('authetication'));
        if (items) {
         setAuthetication(items);
        }
    },[])
    const handleAuthetication=(user)=>{
        setAuthetication(user)
    }
    return(<userAuthentication.Provider value={{authetication,handleAuthetication}}>{children}</userAuthentication.Provider>)

}

export {useAuthValue}
export default CustomAutheticationContext