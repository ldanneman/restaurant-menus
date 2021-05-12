import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Switch } from "antd";
import { useHistory } from "react-router-dom";
import RestaurantContext from "../../lib/Context/context";
import "../../App.css";

function Nav() {
  const { admin, setAdmin } = useContext(RestaurantContext);
  const history = useHistory();
  const onChange = (checked) => {
    setAdmin(checked);
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
            <Switch
              className="switch"
              checkedChildren="ADMIN"
              unCheckedChildren="USER"
              onChange={onChange}
            />
          </Menu>
        </Header>
      </Layout>
    </>
  );
}

export default Nav;
