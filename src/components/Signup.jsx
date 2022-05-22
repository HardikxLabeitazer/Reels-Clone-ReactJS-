import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { auth, db} from "../firebase";
import { createUserWithEmailAndPassword,signOut } from "firebase/auth";
import {addDoc,collection} from 'firebase/firestore'
function Signup() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [name, setName] = useState("");
  let [user, setUser] = useState(null);
  let [loader, setLoader] = useState(false);
  let [error, setError] = useState("");
  const trackEmail = function (e) {
    setEmail(e.target.value);
  }
  const trackname = function (e) {
    setName(e.target.value);
  }
  const trackPassword = function (e) {
    setPassword(e.target.value);
  }
  // const printDetails = async function () {
  //   // alert(email + " " + password);
  //   try {
  //       // let getinfo =await createUserWithEmailAndPassword(auth,email,password)

  //     setLoader(true);
  //     let userCred = await
  //       signInWithEmailAndPassword(auth,email,password)
  //     console.log(userCred.user);
  //     setUser(userCred.user);
  //   } catch (err) {
  //     setError(err.message);
  //     // after some time -> error message remove 
  //     setTimeout(() => {
  //       setError("")
  //     }, 2000)
  //   }
  //   setLoader(false);
  // }
  const signout = async function () {
    await signOut(auth);
    setUser(null);
  }
 const printDetailsSignup=async ()=>{
    try {
        // let getinfo =await createUserWithEmailAndPassword(auth,email,password)

      setLoader(true);
      let userCred = await
       createUserWithEmailAndPassword(auth,email,password,name);
      console.log(userCred.user);
      setUser(userCred.user);

      const docRef = await addDoc(collection(db,"users"),{
        email,
        name,
        reelsIds:[],
        profileImgUrl: "" ,
        userId:userCred.user.uid
      });
    } catch (err) {
      setError(err.message);
      // after some time -> error message remove 
      setTimeout(() => {
        setError("")
      }, 2000)
    }
    setLoader(false);
 }
  
  return (
    <>
      {
        error !== "" ? <h1>Error is {error}</h1> :
          loader === true ? <h1>...Loading</h1> :
            user !== null ?
              <>
                <button
                  onClick={signout}
                >Signout</button>
                <h1>user is {user.uid}</h1>
              </>
              :
              <div className='maincontainer'>
                <div className='container'>
                  <h1>Instragram</h1>
                  <h3>SIGN UP</h3>
                <input type="email" onChange={trackEmail} value={email} placeholder="Enter Email" ></input>
                <br></br>
                <input type="password" onChange={trackPassword} value={password} placeholder="Password"
                ></input>
                 <input type="text" id="name" onChange={trackname} value={name} placeholder="Full Name" ></input>
                <br></br>
                <br></br>
                <button type="click" onClick={printDetailsSignup}
                >Signup</button>
                <span style={{width:'200px',padding:'15px',marginTop:'20px',textAlign:'center'}}>Have and account?<Link  style={{textDecoration:'none',color:'lightcoral'}} to="/login">Login</Link></span>
                </div>
              </div>
                
      }

    </>
  )
}
export default Signup;