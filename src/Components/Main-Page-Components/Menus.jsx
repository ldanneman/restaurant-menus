import React, { useContext } from "react";
import { Card, Col, Row } from "antd";
import "antd/dist/antd.css";
import styles from "../../Styles/MainPage.module.css";
import { Link } from "react-router-dom";
import RestaurantContext from "../../lib/Context/context";

function Menus() {
  const { data, admin } = useContext(RestaurantContext);

  return (
    <div className={styles.siteCardWrapper}>
      <Row gutter={[16, 16]}>
        {data.map(
          (item) =>
            item.menus.length > 0 && (
              <Col key={item._id} span={8}>
                <Link
                  {...(admin
                    ? { to: `/details/${item._id}?isAdmin=true` }
                    : { to: `/details/${item._id}` })}
                >
                  <Card
                    key={item._id}
                    title={item.restaurant}
                    bordered={true}
                    hoverable
                    cover={
                      <img
                        alt={item.restaurant}
                        src={item.img}
                        className={styles.img}
                      />
                    }
                  >
                    MENU
                  </Card>
                </Link>
              </Col>
            )
        )}
      </Row>
    </div>
  );
}

export default Menus;
