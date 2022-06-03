import './App.css'
import {useState} from "react"
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';

function Admin() {
  const [page,setPage]=useState("Dashboard")
  return (
    <div className="Admin">
      <div className="AdminGlass">
        <Sidebar setPage={setPage}/>
        <MainDash page={page}/>
        <RightSide/>
      </div>
    </div>
  );
}

export default Admin;
