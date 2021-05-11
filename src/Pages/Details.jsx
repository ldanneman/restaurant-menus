import React, { useContext } from "react";
import Menu from "../Components/Details-Page-Components/Menu";
import { useParams } from "react-router-dom";
import styles from "../Styles/DetailsPage.module.css";
import RestaurantContext from "../lib/Context/context";

function Details() {
  const { data } = useContext(RestaurantContext);
  const params = useParams()._id;
  let selectedMenu = data.find((x) => x._id == params);
  //   console.log("THE MENU", selectedMenu);
  return (
    <div className={styles.detailsBody}>
      <div className={styles.background}>
        <div className={styles.menu2}>
          <Menu selectedMenu={selectedMenu} />
        </div>
      </div>
      {/* {selectedMenu.restaurant} */}
    </div>
  );
}

export default Details;
