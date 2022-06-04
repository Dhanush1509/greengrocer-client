import React, { useState,useContext } from "react";
import "./Sidebar.css";
import Logo from "../../../assets/brand.svg";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion/dist/framer-motion";
import { useHistory } from "react-router-dom";
import AdminContext from "../../../context/admin/AdminContext";
const Sidebar = ({ setPage }) => {
  const {activePage}=useContext(AdminContext)
  const history = useHistory();

  const [expanded, setExpaned] = useState(true);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className="logo">
          <span>
            <img
              src={Logo}
              alt="logo"
              style={{ width: "24px", height: "24px" }}
            />
            Greengr<span>o</span>cer
          </span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                className={activePage == item.heading ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => setPage(item.heading)}
              >
                <item.icon />
                <span>{item.heading}</span>
              </div>
            );
          })}
          {/* signoutIcon */}
          <div className="menuItem" onClick={history.goBack}>
            <UilSignOutAlt />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
