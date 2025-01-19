import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";

const AppHeader = () => {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.headerContent}>
        <nav>
          <ul className={headerStyles.navList}>
            <div className={headerStyles.navigationBlock}>
              <li className={`${headerStyles.li}`}>
                <BurgerIcon type="primary" className="ml-5 mr-2" />
                <p className="text text_type_main-small  mr-5">Конструктор</p>
              </li>
              <li className={`${headerStyles.li}`}>
                <ListIcon type="secondary" className="ml-5 mr-2" />
                <p className="text text_type_main-small text_color_inactive mr-5">
                  Лента заказов
                </p>
              </li>
            </div>
            <Logo className={headerStyles.logo}/>
            <li className={`${headerStyles.liv}`}>
              <ProfileIcon type="secondary" className="ml-5 mr-2" />
              <p className="text text_type_main-small text_color_inactive mr-5">
                Личный кабинет
              </p>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default AppHeader;
