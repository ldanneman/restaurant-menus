import React, { useState, useContext } from "react";
import RestaurantContext from "../../lib/Context/context";
import MaterialTable from "material-table";
import { useParams } from "react-router-dom";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
import BACK_PORT from "../../lib/Context/BackPort";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function Table() {
  const { data, setData } = useContext(RestaurantContext);

  const params = useParams()._id;

  let array = [];
  let menus = data[params - 1].menus;
  console.log("menus", typeof menus);
  for (let i = 0; i < menus.length; i++) {
    array.push({ menu_name: menus[i].menu_name });
    for (let j = 0; j < menus[i].menu.length; j++) {
      array.push(menus[i].menu[j]);
    }
  }
  console.log("array", typeof array);
  console.log("THE ARRAY", array);
  const [columns, setColumns] = useState([
    { title: "Menu", field: "menu_name" },
    { title: "Name", field: "name" },
    { title: "Price", field: "price" },
  ]);

  const handleRowUpdate = (newData, oldData, resolve) => {
    const index = oldData.tableData.id;
    console.log("index", index);
    let newArray = [array, (array[index] = newData)];
    console.log("NEW", newArray);

    const result = newArray[0].reduce((acc, curr) => {
      const { menu_name } = curr;
      if (menu_name) {
        acc.push({ menu_name, menu: [] });
      } else {
        const { name, price } = curr;
        acc[acc.length - 1].menu.push({ name, price });
      }
      return acc;
    }, []);
    // let updated = [...data, (data[params - 1].menus = result)];
      let updated = [...data];
      updated[params - 1].menus = result

    console.log("UPDATED", updated);

    axios
      .post(`${BACK_PORT}/restaurantData/update`, updated, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setData(updated);
        resolve();
      })
      .catch((error) => {
        console.log("error", error);
        resolve();
      });
  };

  const handleRowAdd = (newData, resolve) => {
    let dataToAdd = [...array];
    dataToAdd.push(newData);
    const result = dataToAdd.reduce((acc, curr) => {
      const { menu_name } = curr;
      if (menu_name) {
        acc.push({ menu_name, menu: [] });
      } else {
        const { name, price } = curr;
        acc[acc.length - 1].menu.push({ name, price });
      }
      return acc;
    }, []);
    let added = [...data, (data[params - 1].menus = result)];
    axios
      .post(`${BACK_PORT}/restaurantData/update`, added, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setData(added);
        resolve();
      })
      .catch((error) => {
        alert(error?.response?.data);
        resolve();
      });
  };

  const handleRowDelete = (oldData, resolve) => {
    const dataDelete = [...array];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);
    console.log(dataDelete);
    const result = dataDelete.reduce((acc, curr) => {
      const { menu_name } = curr;
      if (menu_name) {
        acc.push({ menu_name, menu: [] });
      } else {
        const { name, price } = curr;
        acc[acc.length - 1].menu.push({ name, price });
      }
      return acc;
    }, []);
    let deleted = [...data, (data[params - 1].menus = result)];
    axios
      .post(`${BACK_PORT}/restaurantData/update`, deleted, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setData(deleted);
        resolve();
      })
      .catch((error) => {
        console.log(error);
        resolve();
      });
  };

  return (
    <div>
      <MaterialTable
        title={data[params - 1].restaurant}
        icons={tableIcons}
        rowsPerPageOptions={[20, 10, 5]}
        columns={columns}
        data={array}
        options={{
          pageSize: 15,
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve);
            }),
        }}
      />
    </div>
  );
}

export default Table;
