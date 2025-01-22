import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './components/Admin/Admin';
import User from './components/User/User';
import Home from './components/Home/Home';
import MangeUser from './components/Admin/content/ManageUser';
import DashBoard from './components/Admin/content/DashBoard';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} >
        <Route index element={<Home />} />
        <Route path='users' element={<User />} />
      </Route>
      <Route path='/admins' element={<Admin />} >
        <Route index element={<DashBoard />} />
        <Route path='manage-user' element={<MangeUser />} />
      </Route>
    </Routes>

  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
