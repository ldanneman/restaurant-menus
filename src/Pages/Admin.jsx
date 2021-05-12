import React, { useContext } from "react";
import Table from "../Components/Admin-Page-Components/Table";
import RestaurantContext from "../lib/Context/context";
import { useHistory } from "react-router-dom";

function Admin() {
  const history = useHistory();
  const { admin } = useContext(RestaurantContext);
  return admin == true ? (
    <div>
      <Table />
    </div>
  ) : (
    <div>
      {history.push("/home")}
      {alert("only admins")}
    </div>
  );
}

export default Admin;
