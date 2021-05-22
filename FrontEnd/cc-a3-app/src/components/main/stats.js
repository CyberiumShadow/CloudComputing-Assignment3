import NavBar from "components/utils/navBar";
import styles from "./main.module.css";

function Stats() {
  return (
    <div>
      <NavBar currentPage={"Stats"} />
      <div className={styles.contentWrapper}>
        <h3 className={styles.pageTitle}>Stats</h3>
        <hr />
        This page shows user's past car hire records and stats
      </div>
    </div>
  );
}

export default Stats;