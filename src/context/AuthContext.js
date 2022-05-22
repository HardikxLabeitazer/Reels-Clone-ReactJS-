import React,{useState,useEffect} from 'react'
import {auth} from '../firebase'
import {onAuthStateChanged} from 'firebase/auth'
export const AuthContext = React.createContext();
export function AuthContextProvider({children}){
    let [cuser, setUser] = useState(null);
    let [mainloader,setMainloader]=useState(false);
    useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
        if(user){
            setUser(user);
           
        }
        else{
            setUser(null);
            
        }
        setMainloader(false)
    })
},[])
let val = {cuser}

return (
    <AuthContext.Provider value={val}>
        {mainloader===false && children}
    </AuthContext.Provider>
)
}

 