import React from "react";
import MenuLabel from "./MenuLabel";
import styles from "../../Styles/DetailsPage.module.css";

function Menu({ selectedMenu }) {
  return (
    <>
      <div className={styles.box}>
        <img className={styles.img} alt="logo" src={selectedMenu.img}></img>
      </div>
      <div className={styles.menu}>
        {selectedMenu.menus.map((item, index) => (
          <MenuLabel key={index} item={item} />
        ))}
      </div>
    </>
  );
}

export default Menu;
