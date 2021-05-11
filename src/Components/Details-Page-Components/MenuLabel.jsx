import React from "react";
import styles from "../../Styles/DetailsPage.module.css";

function MenuLabel({ item }) {
  console.log("HELLLO", item);
  return (
    <div>
      <p className={styles.title2}>{item.menu_name}</p>
      {item.menu.map((dish, index) => (
          <div key={index} className={styles.items}>
            <div>{`${dish.name} $${dish.price} USD`}</div>
          </div>
      ))}
    </div>
  );
}

export default MenuLabel;
