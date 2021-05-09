import React from "react";
import MenuLabel from "./MenuLabel";
import styles from "../../Styles/DetailsPage.module.css";

function Menu({ selectedMenu }) {
  return (
    <div>
      <div>{selectedMenu.restaurant}</div>
      {/* <div className={styles.title}>menu</div> */}
      {selectedMenu.menus.map((item, index) => (
        <MenuLabel item={item} />
      ))}
    </div>
  );
}

export default Menu;
