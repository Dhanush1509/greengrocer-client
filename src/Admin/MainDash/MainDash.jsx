import React from "react";
import Cards from "../components/Cards/Cards";
import Table from "../orders/Table";
import UsersTable from "../users/UsersTable";
import OrdersTable from "../orders/OrdersTable";
import "./MainDash.css";
import User from "../users/User"


const MainDash = ({ page }) => {
  return (
    <div className="MainDash">
      {page === "Dashboard" ? (
        <>
  
          <h1>Dashboard</h1>
          <Cards />
          <Table />
        </>
      ) : page==="Customers"?
      <User/> :<OrdersTable/>
      }
    </div>
  );
};

export default MainDash;
