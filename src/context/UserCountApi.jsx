import React,{createContext, useEffect,useState} from 'react'
import { getUsers } from '../Services/apiService'

export const getUserCountContext = createContext()
function UserCountApi({children}) {

    const [user,setUser] = useState("")
    
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const res = await getUsers();
            if(res.status==200){
                setUser(res.data)
            }
        } catch (err) {
            console.error("Error fetching user data:", err);
            res.status(400).json(err)
        }
    }

  return (
    <>
    <getUserCountContext.Provider value={{user}}>
        {children}
    </getUserCountContext.Provider>
    </>
  )
}

export default UserCountApi