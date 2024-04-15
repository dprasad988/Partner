import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Home from './pages/home';
import Signup from './pages/signup';
import Signin from './pages/signin';
import Profile from './pages/profile';
import Logout from './components/logout';
import Post from './components/post';
import ForgotPassword from './pages/forgot';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/signin' element={<Signin/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/logout' element={<Logout/>} />
          <Route path='/post' element={<Post/>} />
          <Route path='/ForgotPassword' element={<ForgotPassword/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
