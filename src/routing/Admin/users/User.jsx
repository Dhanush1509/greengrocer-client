import React, { useState } from "react";
import Cards from "./Cards";
import UsersTable from "./UsersTable";

const User = () => {
  const [id, setId] = useState("");
  console.log(id);
  return (
    <>
      {id && <Cards id={id} />}
      <UsersTable setId={setId} />
    </>
  );
};

export default User;
