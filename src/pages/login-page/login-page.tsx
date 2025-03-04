import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login-page.module.css";
import { useAppDispatch } from "../../services/app/hooks";
import { useState } from "react";
import { AppRoutes } from "../../utils/routes";
import { thunkLogin } from "../../services/features/auth/auth-thunk";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(thunkLogin({ email, password }))
      .unwrap()
      .then(() => navigate(location.state?.from?.pathname || '/404'))
      .catch((rejectedAction) => setError(`${rejectedAction}`));
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form onSubmit={submitHandler} className={styles.content}>
          <h1 className="text text_type_main-medium mb-6 mt-10">Вход</h1>
          <Input
            type={"text"}
            placeholder={"E-mail"}
            onChange={(e) => setEmail(e.target.value)}
            name={"email"}
            value={email}
            extraClass={`${styles.inputEmail} mb-6`}
          />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder={"Пароль"}
            onChange={(e) => setPassword(e.target.value)}
            icon={showPassword ? "HideIcon" : "ShowIcon"}
            name={"password"}
            value={password}
            extraClass={`${styles.inputPwd} mb-6`}
            onIconClick={togglePasswordVisibility}
          />
          {error && (
            <p
              className={`${styles.errorMessage} text text_type_main-default mb-4`}
            >
              {error}
            </p>
          )}
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="mb-20"
            data-cy="submitLoginForm"
          >
            Войти
          </Button>
          <div className="text text_type_main-small mb-4">
            <span className="text_color_inactive">
              Вы - новый пользователь?{" "}
            </span>
            <Link to={AppRoutes.sign.up} className={styles.link}>
              {" "}
              Зарегистрироваться
            </Link>
          </div>
          <div className="text text_type_main-small">
            <span className="text_color_inactive">Забыли пароль? </span>
            <Link to={AppRoutes.password.forgot} className={styles.link}>
              {" "}
              Восстановить пароль
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
