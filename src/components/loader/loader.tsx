import styles from "./loader.module.css";

const Loader = () => (
  <div className={styles.loaderContainer}>
    <div className={styles.loader}>
      <div className={styles.ring}></div>
      <div className={styles.ring}></div>
      <div className={styles.ring}></div>
      <div className={styles.inner}></div>
    </div>
  </div>
);

export default Loader;
