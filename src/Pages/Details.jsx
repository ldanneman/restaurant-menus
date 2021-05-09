import React from "react";
import Data from "../data";
import Menu from "../Components/Details-Page-Components/Menu";
import { useParams } from "react-router-dom";
import styles from "../Styles/DetailsPage.module.css";

function Details() {
  const params = useParams()._id;
  let selectedMenu = Data.find((x) => x._id == params);
  //   console.log("THE MENU", selectedMenu);
  return (
    <div className={styles.detailsBody}>
      <div className={styles.background}>
        <Menu selectedMenu={selectedMenu} />
      </div>
      {/* {selectedMenu.restaurant} */}
    </div>
  );
}

export default Details;
