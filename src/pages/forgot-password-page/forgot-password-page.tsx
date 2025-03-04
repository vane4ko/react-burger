import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password-page.module.css";
import { AppRoutes } from "../../utils/routes";
import { FormEvent, useState } from "react";
import { useAppDispatch } from "../../services/app/hooks";
import { thunkResetPassword } from "../../services/features/auth/auth-thunk";
import { unwrapResult } from "@reduxjs/toolkit";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
    await  dispatch(thunkResetPassword({ email })).then(unwrapResult);
      navigate(AppRoutes.password.reset)
    } catch (error) {
      setError(`${error}`);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.content}>
          <h1 className="text text_type_main-medium mb-6 mt-10">
            Восстановление пароля
          </h1>
          <Input
            type={"text"}
            placeholder={"Укажите e-mail"}
            onChange={(e) => setEmail(e.target.value)}
            name={"email"}
            value={email}
            extraClass={`${styles.inputEmail} mb-6`}
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
            Восстановить
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
export default ForgotPasswordPage;
