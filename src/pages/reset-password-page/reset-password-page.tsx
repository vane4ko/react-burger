import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password-page.module.css";
import { AppRoutes } from "../../utils/routes";
import { FormEvent, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/app/hooks";
import { offReset } from "../../services/features/auth/auth-slice";
import { thunkSetPassword } from "../../services/features/auth/auth-thunk";
import { unwrapResult } from "@reduxjs/toolkit";

const ResetPasswordPage = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetCompleted, setResetCompleted] = useState(false);
  const dispatch = useAppDispatch();
  const { resetIsActive } = useAppSelector((store) => store.userAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!resetIsActive && !resetCompleted) {
      navigate(AppRoutes.password.forgot);
    }
  }, [resetIsActive, resetCompleted, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(thunkSetPassword({ password, token })).then(unwrapResult);
      setResetCompleted(true);
      dispatch(offReset());
      navigate(AppRoutes.sign.in, { replace: true });
    } catch (error) {
      setError(`${error}`);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.content}>
          <h1 className="text text_type_main-medium mb-6 mt-10">
            Восстановление пароля
          </h1>

          <Input
            type={showPassword ? "text" : "password"}
            placeholder={"Введите новый пароль"}
            onChange={(e) => setPassword(e.target.value)}
            icon={showPassword ? "HideIcon" : "ShowIcon"}
            name={"password"}
            value={password}
            extraClass={`${styles.inputPwd} mb-6`}
            onIconClick={togglePasswordVisibility}
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => setToken(e.target.value)}
            name={"token"}
            value={token}
            extraClass={`${styles.inputText} mb-6`}
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
          >
            Сохранить
          </Button>
          <div className="text text_type_main-small mb-4">
            <span className="text_color_inactive">Вспомнили пароль?</span>
            <Link to={AppRoutes.sign.in} className={styles.link}>
              {" "}
              Войти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
