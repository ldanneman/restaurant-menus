import React, { useContext } from "react";
import Menu from "../Components/Details-Page-Components/Menu";
import { useParams, useHistory } from "react-router-dom";
import styles from "../Styles/DetailsPage.module.css";
import RestaurantContext from "../lib/Context/context";

function Details() {
  const history = useHistory();
  const { data, admin } = useContext(RestaurantContext);
  const params = useParams()._id;
  let selectedMenu = data.find((x) => x._id == params);
  return (
    <div className={styles.detailsBody}>
      <div className={styles.background}>
        {admin && (
          <button
            className={styles.button}
            onClick={() =>
              history.push({
                pathname: `/admin/${params}`,
                search: "?isAdmin=true",
              })
            }
          >
            EDIT
          </button>
        )}
        <div className={styles.menu2}>
          <Menu selectedMenu={selectedMenu} />
        </div>
      </div>
    </div>
  );
}

export default Details;
