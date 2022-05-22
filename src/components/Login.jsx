import React, { useEffect, useState } from 'react'
import { auth, } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword,signOut } from "firebase/auth";
import { Link } from 'react-router-dom';
function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let [user, setUser] = useState(null);
  let [loader, setLoader] = useState(false);
  let [error, setError] = useState("");
  let [mainloader,setMainloader]=useState(false);
  const trackEmail = function (e) {
    setEmail(e.target.value);
  }
  const trackPassword = function (e) {
    setPassword(e.target.value);
  }
  const printDetails = async function () {
    // alert(email + " " + password);
    try {
        // let getinfo =await createUserWithEmailAndPassword(auth,email,password)

      setLoader(true);
      let userCred = await
        signInWithEmailAndPassword(auth,email,password)
      console.log(userCred.user);
      setUser(userCred.user);
    } catch (err) {
      setError(err.message);
      // after some time -> error message remove 
      setTimeout(() => {
        setError("")
      }, 2000)
    }
    setLoader(false);
  }
  const signout = async function () {
    await signOut(auth);
    setUser(null);
  }
 useEffect(()=>{
     onAuthStateChanged(auth,(user)=>{
         if(user){
             setUser(user);
            
         }
         else{
             setUser(null);
             
         }
     })
 },[])
  
  return (
    <>
      { mainloader==true ?<h1>Page Loading.....</h1>:
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
                    <h3>LOG IN</h3>
                  
                  <input type="email" onChange={trackEmail} value={email} placeholder="Email" ></input>
                <br></br>
                <input type="password" onChange={trackPassword} value={password} placeholder="Password"
                ></input>
                <br></br>
                <button type="click" onClick={printDetails}
                >Login</button>
                <span style={{width:'200px',padding:'15px',marginTop:'25px',textAlign:'center'}}>Dont have an account?<Link to="/signup" style={{textDecoration:'none',color:'lightcoral'}}>SignUp</Link></span>
               </div>
                </div>
                
      }

    </>
  )
}
export default Login