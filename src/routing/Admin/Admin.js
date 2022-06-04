import "./App.css";
import { useState,useEffect,useContext } from "react";
import MainDash from "./MainDash/MainDash";
import RightSide from "./components/RigtSide/RightSide";
import Sidebar from "./components/Sidebar";
import AdminContext from "../context/admin/AdminContext";

function Admin() {
const {setActivePage,activePage} = useContext(AdminContext)

  return (
    <div className="Admin">
      <div className="AdminGlass">
        <Sidebar setPage={setActivePage} />
        <MainDash page={activePage} />
        <RightSide />
      </div>
    </div>
  );
}

export default Admin;
