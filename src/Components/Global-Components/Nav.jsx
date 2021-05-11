import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Switch } from "antd";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import RestaurantContext from "../../lib/Context/context";

function Nav() {
  const { admin, setAdmin } = useContext(RestaurantContext);
  const history = useHistory();
  const params = (useParams().isAdmin = true);
  //   const [check, setCheck] = useState(false);
  const onChange = (checked) => {
    setAdmin(checked);
    console.log(`switch to ${checked}`);
    checked == true
      ? history.push({ search: "?isAdmin=true" })
      : history.push({ search: "" });
  };
  const { Header } = Layout;
  return (
    <>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            selectable={false}
            defaultSelectedKeys={["0"]}
          >
            <Menu.Item key="1">
              <Link
                className="link"
                {...(admin ? { to: "/home?isAdmin=true" } : { to: "/home" })}
              >
                Home
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link className="link" to="/admin">
                Admin
              </Link>
            </Menu.Item>
            <Switch
              checkedChildren="ADMIN"
              unCheckedChildren="USER"
              onChange={onChange}
            />
            <input
              type="checkbox"
              id="male"
              name="gender"
              value="male"
              onChange={onChange}
            ></input>
          </Menu>
        </Header>
      </Layout>
    </>
  );
}

export default Nav;
