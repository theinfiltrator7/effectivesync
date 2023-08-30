import "./App.css";

import Home from "./Containers/Home/Home";
import Members from "./Containers/Members/Members";
import Tasks from "./Containers/Tasks/Tasks";
import Login from "./Containers/Login/LoginContainer";
import Cookies from "js-cookie";

import axios from "axios";
import { Routes, Route } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3001";
if (Cookies.get('token')) {
  let AUTH_TOKEN = `Bearer ${Cookies.get('token')}`
  axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
}


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/members" element={<Members />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  );
}

export default App;
