import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../utils/routes";

const AppHeader = () => {
  const navigate = useNavigate();
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.headerContent}>
        <nav>
          <ul className={headerStyles.navList}>
            <div className={headerStyles.navigationBlock}>
              <li className={headerStyles.li}>
                <NavLink
                  to={AppRoutes.home}
                  className={({ isActive }) =>
                    `${headerStyles.navLink} ${
                      isActive ? headerStyles.active : ""
                    }`
                  }
                >
                  <BurgerIcon type="secondary" className="ml-5 mr-2" />
                  <p className="text text_type_main-small text_color_inactive mr-5">
                    Конструктор
                  </p>
                </NavLink>
              </li>
              <li className={headerStyles.li}>
                <NavLink
                  to={AppRoutes.orders}
                  className={({ isActive }) =>
                    `${headerStyles.navLink} ${
                      isActive ? headerStyles.active : ""
                    }`
                  }
                >
                  <ListIcon type="secondary" className="ml-5 mr-2" />
                  <p className="text text_type_main-small text_color_inactive mr-5">
                    Лента заказов
                  </p>
                </NavLink>
              </li>
            </div>
            <li
              className={headerStyles.logoItem}
              onClick={() => navigate(AppRoutes.home)}
            >
              <Logo className={headerStyles.logo} />
            </li>
            <li className={headerStyles.liv}>
              <NavLink
                to={AppRoutes.user.profile}
                className={({ isActive }) =>
                  `${headerStyles.navLink} ${
                    isActive ? headerStyles.active : ""
                  }`
                }
              >
                <ProfileIcon type="secondary" className="ml-5 mr-2" />
                <p className="text text_type_main-small text_color_inactive mr-5">
                  Личный кабинет
                </p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
