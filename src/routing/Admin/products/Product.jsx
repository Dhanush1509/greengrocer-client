import React, { useState } from "react";
import Cards from "./Cards";
import ProductsTable from "./ProductsTable";

const User = () => {
  const [id, setId] = useState("");
  console.log(id);
  return (
    <>
      <Cards id={id} />
      <ProductsTable setId={setId} />
    </>
  );
};

export default User;
