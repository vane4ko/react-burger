import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styleProfileDataPage from "./profile-user-data.module.css";
import { useAppDispatch, useAppSelector } from "../../../services/app/hooks";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { thunkPathcUser } from "../../../services/features/auth/auth-thunk";

const ProfileUserData = () => {
  const { user } = useAppSelector((store) => store.userAuth);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(thunkPathcUser({ email, password, name }));
  };

  const cancelChange = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  };
  return (
    <form className={styleProfileDataPage.form} onSubmit={onSubmit}>
      <Input
        type="text"
        placeholder="Имя"
        icon="EditIcon"
        value={name}
        name="name"
        error={false}
        errorText="Error"
        size="default"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <EmailInput
        placeholder="Логин"
        isIcon={true}
        value={email}
        name="email"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <PasswordInput
        placeholder="Пароль"
        icon="EditIcon"
        value={password}
        name="password"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <div className={styleProfileDataPage.button}>
        <Button type="secondary" htmlType="button" onClick={cancelChange}>
          Отмена
        </Button>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </div>
    </form>
  );
};
export default ProfileUserData;
