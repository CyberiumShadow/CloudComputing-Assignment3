import NavBar from "components/utils/navBar";
import styles from "./main.module.css";

function Dashboard() {
  return (
    <div>
      <NavBar currentPage={"Dashboard"} />
      <div className={styles.contentWrapper}>
        <h3 className={styles.pageTitle}>Dashboard</h3>
        <hr />
        This page shows upcoming car rental and current car hire listing
      </div>
    </div>
  );
}

export default Dashboard;