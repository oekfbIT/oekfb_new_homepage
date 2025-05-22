import { Link } from "react-router-dom";
import styles from "./style.module.css";

const Banner = () => {
  return (
    <div
      className={styles.banner}
    >
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <h1 className={styles.heading}>Team Neuanmeldungen</h1>
                <Link className="item" to="/register">
                      <button className={styles.downloadBtn}>Jetzt Ihr Team Anmelden</button>>
                </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
