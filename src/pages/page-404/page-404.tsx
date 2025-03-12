import { useLocation } from "react-router-dom";
import styles404 from "./page-404.module.css";

const Page404 = () => {
  const { pathname } = useLocation();
  return (
    <div className={styles404.wrapper}>
      <p className="text text_type_main-large text_color_inactive">
        {pathname}
      </p>
      <p className="text text_type_main-large mt-5">Страница не найдена.</p>
    </div>
  );
};
export default Page404;
