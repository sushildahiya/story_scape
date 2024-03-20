const { createContext, useContext,useState, useEffect } = require("react");



const userAuthentication = createContext()

function useAuthValue(){
    return useContext(userAuthentication)
}

const CustomAutheticationContext=({children})=>{
    const [authetication,setAuthetication]=useState(null)
    useEffect(()=>{
        const items = JSON.parse(localStorage.getItem('autheticate'));
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