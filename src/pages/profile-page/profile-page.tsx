import styleProfilePage from "./profile-page.module.css";
import ProfileNavPanel from "../../components/profile-nav-panel/profile-nav-panel";
import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  return (
    <section className={styleProfilePage.wrapper}>
      <nav className={styleProfilePage.nav}>
        <ProfileNavPanel />
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Outlet />
    </section>
  );
};

export default ProfilePage;
