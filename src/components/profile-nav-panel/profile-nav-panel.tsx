import { NavLink, useNavigate } from "react-router-dom";
import styleNavProfile from "./profile-nav-panel.module.css";
import { useCallback } from "react";
import { useAppDispatch } from "../../services/app/hooks";
import { thunkLogout } from "../../services/features/auth/auth-thunk";
import { AppRoutes } from "../../utils/routes";
import { clearTokens } from "../../services/features/auth/auth-utils";

const ProfileNavPanel = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutUser = useCallback(async () => {
    const token = localStorage.getItem("refreshToken");
    if (token) {
      try {
        await dispatch(thunkLogout({ token })).unwrap();
        clearTokens();
        navigate(AppRoutes.sign.in);
      } catch (error) {
        alert(`Ошибка при выходе: ${error}`);
      }
    }
  }, [dispatch, navigate]);

  return (
    <>
      <ul className={styleNavProfile.list}>
        <li className={styleNavProfile.item}>
          <NavLink
            to={{ pathname: AppRoutes.user.profile }}
            end
            className={({ isActive }) =>
              `${styleNavProfile.link} text text_type_main-medium  ${
                isActive ? styleNavProfile.active : "text_color_inactive"
              }`
            }
          >
            Профиль
          </NavLink>
        </li>
        <li className={styleNavProfile.item}>
          <NavLink
            to={{ pathname: AppRoutes.user.orders }}
            className={({ isActive }) =>
              `${styleNavProfile.link} text text_type_main-medium  ${
                isActive ? styleNavProfile.active : "text_color_inactive"
              }`
            }
          >
            История заказов
          </NavLink>
        </li>
        <li className={styleNavProfile.item}>
          <div
            className={`${styleNavProfile.link} text text_type_main-medium text_color_inactive`}
            onClick={logoutUser}
          >
            Выход
          </div>
        </li>
      </ul>
    </>
  );
};

export default ProfileNavPanel;
