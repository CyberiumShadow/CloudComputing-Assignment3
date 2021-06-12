import NavBar from "components/utils/navBar";
import styles from "./main.module.css";

function Stats() {
  return (
    <div>
      <NavBar currentPage={"Stats"} />
      <div className={styles.contentWrapper}>
        <h3 className={styles.pageTitle}>Stats</h3>
        <hr />
        <h5 className={styles.formTitle}>Car hired</h5>
        <p className={styles.subTitle}>Table shows all cars hired by you in the past</p>
        <div className={`table-responsive ${styles.tableScrollable}`}>
          <table className={`table table-sm table-hover ${styles.tableCustom}`}>
            <thead>
              <tr>
                <th className={styles.th1}>Owner</th>
                <th className={styles.th2}>Car</th>
                <th className={styles.th3}>Licence Plate</th>
                <th className={styles.th4}>Cost</th>
                <th className={styles.th5}>From</th>
                <th className={styles.th6}>To</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cyberius</td>
                <td>Toyota Corolla 2020</td>
                <td>ABC126</td>
                <td>$200</td>
                <td>09 Apr, 09:00pm</td>
                <td>10 Apr, 09:00pm</td>
              </tr>
              <tr>
                <td>Cyberius</td>
                <td>Toyota Corolla 2020</td>
                <td>ABC126</td>
                <td>$200</td>
                <td>09 Apr, 09:00pm</td>
                <td>10 Apr, 09:00pm</td>
              </tr>
              <tr>
                <td>Cyberius</td>
                <td>Toyota Corolla 2020</td>
                <td>ABC126</td>
                <td>$200</td>
                <td>09 Apr, 09:00pm</td>
                <td>10 Apr, 09:00pm</td>
              </tr>
              <tr>
                <td>Cyberius</td>
                <td>Toyota Corolla 2020</td>
                <td>ABC126</td>
                <td>$200</td>
                <td>09 Apr, 09:00pm</td>
                <td>10 Apr, 09:00pm</td>
              </tr>
              <tr>
                <td>Cyberius</td>
                <td>Toyota Corolla 2020</td>
                <td>ABC126</td>
                <td>$200</td>
                <td>09 Apr, 09:00pm</td>
                <td>10 Apr, 09:00pm</td>
              </tr>
              <tr>
                <td>Cyberius</td>
                <td>Toyota Corolla 2020</td>
                <td>ABC126</td>
                <td>$200</td>
                <td>09 Apr, 09:00pm</td>
                <td>10 Apr, 09:00pm</td>
              </tr>
              <tr>
                <td>Cyberius</td>
                <td>Toyota Corolla 2020</td>
                <td>ABC126</td>
                <td>$200</td>
                <td>09 Apr, 09:00pm</td>
                <td>10 Apr, 09:00pm</td>
              </tr>
              <tr>
                <td>Cyberius</td>
                <td>Toyota Corolla 2020</td>
                <td>ABC126</td>
                <td>$200</td>
                <td>09 Apr, 09:00pm</td>
                <td>10 Apr, 09:00pm</td>
              </tr>
              <tr>
                <td>Cyberius</td>
                <td>Toyota Corolla 2020</td>
                <td>ABC126</td>
                <td>$200</td>
                <td>09 Apr, 09:00pm</td>
                <td>10 Apr, 09:00pm</td>
              </tr>
              <tr>
                <td>Cyberius</td>
                <td>Toyota Corolla 2020</td>
                <td>ABC126</td>
                <td>$200</td>
                <td>09 Apr, 09:00pm</td>
                <td>10 Apr, 09:00pm</td>
              </tr>
              <tr>
                <td>Cyberius</td>
                <td>Toyota Corolla 2020</td>
                <td>ABC126</td>
                <td>$200</td>
                <td>09 Apr, 09:00pm</td>
                <td>10 Apr, 09:00pm</td>
              </tr>
              <tr>
                <td>Cyberius</td>
                <td>Toyota Corolla 2020</td>
                <td>ABC126</td>
                <td>$200</td>
                <td>09 Apr, 09:00pm</td>
                <td>10 Apr, 09:00pm</td>
              </tr>
              <tr>
                <td>Cyberius</td>
                <td>Toyota Corolla 2020</td>
                <td>ABC126</td>
                <td>$200</td>
                <td>09 Apr, 09:00pm</td>
                <td>10 Apr, 09:00pm</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <br />

        <h5 className={styles.formTitle}>Car listed</h5>
        <p className={styles.subTitle}>Table shows all cars listed by you and hired by customers in the past</p>
        <div className={`table-responsive ${styles.tableScrollable}`}>
          <table className={`table table-sm table-hover ${styles.tableCustom}`}>
            <thead>
              <tr>
                <th className={styles.th1}>Customer</th>
                <th className={styles.th2}>Car</th>
                <th className={styles.th3}>Licence Plate</th>
                <th className={styles.th4}>Cost</th>
                <th className={styles.th5}>From</th>
                <th className={styles.th6}>To</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cyberius</td>
                <td>Honda Civic 2020</td>
                <td>CCC111</td>
                <td>$300</td>
                <td>19 May, 09:00am</td>
                <td>20 May, 09:00am</td>
              </tr>
              <tr>
                <td>Cyberius</td>
                <td>Honda Civic 2020</td>
                <td>CCC111</td>
                <td>$300</td>
                <td>19 May, 09:00am</td>
                <td>20 May, 09:00am</td>
              </tr>
              <tr>
                <td>Cyberius</td>
                <td>Honda Civic 2020</td>
                <td>CCC111</td>
                <td>$300</td>
                <td>19 May, 09:00am</td>
                <td>20 May, 09:00am</td>
              </tr>
              <tr>
                <td>Cyberius</td>
                <td>Honda Civic 2020</td>
                <td>CCC111</td>
                <td>$300</td>
                <td>19 May, 09:00am</td>
                <td>20 May, 09:00am</td>
              </tr>
              <tr>
                <td>Cyberius</td>
                <td>Honda Civic 2020</td>
                <td>CCC111</td>
                <td>$300</td>
                <td>19 May, 09:00am</td>
                <td>20 May, 09:00am</td>
              </tr>
              <tr>
                <td>Cyberius</td>
                <td>Honda Civic 2020</td>
                <td>CCC111</td>
                <td>$300</td>
                <td>19 May, 09:00am</td>
                <td>20 May, 09:00am</td>
              </tr>
              <tr>
                <td>Cyberius</td>
                <td>Honda Civic 2020</td>
                <td>CCC111</td>
                <td>$300</td>
                <td>19 May, 09:00am</td>
                <td>20 May, 09:00am</td>
              </tr>
              <tr>
                <td>Cyberius</td>
                <td>Honda Civic 2020</td>
                <td>CCC111</td>
                <td>$300</td>
                <td>19 May, 09:00am</td>
                <td>20 May, 09:00am</td>
              </tr>
              <tr>
                <td>Cyberius</td>
                <td>Honda Civic 2020</td>
                <td>CCC111</td>
                <td>$300</td>
                <td>19 May, 09:00am</td>
                <td>20 May, 09:00am</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Stats;