import React from "react";
import Data from "../data";
import { Card, Col, Row } from "antd";
import "antd/dist/antd.css";
import styles from "../Styles/MainPage.module.css";
import { Link } from "react-router-dom";

console.log(Data);

function Menus() {
  return (
    <div className={styles.siteCardWrapper}>
      <Row gutter={16}>
        {Data.map((item, index) => (
          <Col span={8}>
            <Link to={"/details/" + item._id}>
              <Card
                key={item.id}
                title="MENU"
                bordered={true}
                hoverable
                cover={
                  <img alt="Pizza Hut" src={item.img} className={styles.img} />
                }
              >
                {item.restaurant}
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Menus;
