import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
function createData(product, tracking_ID, date, status) {
  return { product, tracking_ID, date, status };
}

const rowsForLatestOrders = [
  createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Approved"),
  createData("Big Baza Bang ", 18908424, "2 March 2022", "Pending"),
  createData("Mouth Freshner", 18908424, "2 March 2022", "Approved"),
  createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
];

const headersForLatestOrders = ["product", "tracking_ID", "date", "status", ""];
const headersForUsers = ["Id", "profile", "Name", "Email", "Activity"];

const MainDash = ({ page }) => {
  return (
    <div className="MainDash">
      {page === "Dashboard" ? (
        <>
          <h1>Dashboard</h1>
          <Cards />
          <Table
            headersForLatestOrders={headersForLatestOrders}
            rowsForLatestOrders={rowsForLatestOrders}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MainDash;
