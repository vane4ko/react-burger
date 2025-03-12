import { Link } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./sing-up-page.module.css";
import { useAppDispatch } from "../../services/app/hooks";
import { useState } from "react";
import { AppRoutes } from "../../utils/routes";
import { thunkSignUp } from "../../services/features/auth/auth-thunk";
import { unwrapResult } from "@reduxjs/toolkit";
import { saveTokens } from "../../services/features/auth/auth-utils";

const SignUpPage = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { accessToken, refreshToken } = await dispatch(
        thunkSignUp({ name, email, password })
      ).then(unwrapResult);
      saveTokens(accessToken, refreshToken);
    } catch (rejectedAction) {
      setError(`${rejectedAction}`);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form onSubmit={submitHandler} className={styles.content}>
          <h1 className="text text_type_main-medium mb-6 mt-10">Регистрация</h1>

          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setName(e.target.value)}
            name={"name"}
            value={name}
            extraClass="mb-6"
          />

          <Input
            type={"text"}
            placeholder={"E-mail"}
            onChange={(e) => setEmail(e.target.value)}
            name={"email"}
            value={email}
            extraClass="mb-6"
          />

          <Input
            type={showPassword ? "text" : "password"}
            placeholder={"Пароль"}
            onChange={(e) => setPassword(e.target.value)}
            icon={showPassword ? "HideIcon" : "ShowIcon"}
            name={"password"}
            value={password}
            extraClass="mb-6"
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
          >
            Зарегистрироваться
          </Button>

          <div className="text text_type_main-small mb-4">
            <span className="text_color_inactive">Уже зарегистрированы?</span>

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

export default SignUpPage;
