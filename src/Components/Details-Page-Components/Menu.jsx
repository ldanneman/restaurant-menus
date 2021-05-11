import React from "react";
import MenuLabel from "./MenuLabel";
import styles from "../../Styles/DetailsPage.module.css";

function Menu({ selectedMenu }) {
  return (
    <div className={styles.menu}>
      {/* <div>{selectedMenu.restaurant}</div> */}
      {/* <div className={styles.title}>menu</div> */}
      {selectedMenu.menus.map((item, index) => (
        <MenuLabel key={index} item={item} />
      ))}
    </div>
  );
}

export default Menu;
