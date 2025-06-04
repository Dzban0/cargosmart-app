import { useState, useEffect, useRef } from "react";
import './App.css';
import EmployeeProfile from './components/EmployeeProfile';
import InventoryTable from "./components/InventoryTable";
import NavBar from "./components/NavBar";

import { fetchUser, isLoggedIn, logout } from "./services/authService";
import { api } from "./services/api";

export const App = () => {
  const [user, setUser] = useState(null);


};


export default App;