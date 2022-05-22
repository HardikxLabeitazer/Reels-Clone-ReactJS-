import React, { useEffect, useState } from 'react'
import './profile.css'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import {doc,getDoc} from 'firebase/firestore'
export default function Profile() {

  let contextObj = useContext(AuthContext);
  console.log(contextObj)
  const [loading,setLoading]=useState("");
  // useEffect(()=>{
  //  ( async function(){
  //     const docRef = doc(db,"user",contextObj.cuser.uid);
  //   const docsnap = await getDoc(docRef);
  //   if(docsnap.exists()){
  //     console.log("document data"+docsnap.data());
  //   }
  //   }
  //  )()
   
    
  // })(),[contextObj])
 
 
  return (
    <>
   { contextObj==null?<div>Need to Login</div>:
   
   contextObj.cuser != null ?<div>User is:{contextObj.cuser.uid}</div>:
   <div>{contextObj.uid}</div>
   
   
  //   loading===true?<div>Getting Data</div>:
  //  <>
  //   <div className='header'></div> 
  //   <div className='main'>
  //     <img src="" alt="" className='ping'/>
  //     <div className='details'>
  //       <div className='content'>Name : <strong>xyz</strong></div>
  //       <div className='content'>No. of posts : <strong>15</strong></div>
  //       <div className='content'>Email : <strong>xyzabc123ABCXYZ@gmail.com</strong></div>
  //     </div>

  //   </div>
  //   </>
    }
    </>
  )
}
