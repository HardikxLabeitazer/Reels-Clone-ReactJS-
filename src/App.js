import './App.css';
// import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router';
import Feed from './components/Feed';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Profile from './components/Profile';
import Signup from './components/Signup';
import { AuthContextProvider } from './context/AuthContext';
function App() {
  return (
    <>
     <AuthContextProvider>

     
      <Routes>
        <Route exact path="/feed" element={<Feed/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/pagenotfound" element={<PageNotFound/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
      </Routes>
    </AuthContextProvider>
   
      
    </>
  );
}

export default App;
