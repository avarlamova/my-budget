import React, { useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  return (
    <div>
      <h2>Users list</h2>
      {users ? users : ""}
    </div>
  );
};

export default Users;
