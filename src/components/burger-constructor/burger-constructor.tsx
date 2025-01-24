import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerItem } from "../../types/types";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import { useMemo, useState } from "react";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";

type BurgerConstructorProps = {
  burgerRecipe: BurgerItem[];
};

const BurgerConstructor = ({ burgerRecipe }: BurgerConstructorProps) => {
  const bunItem = useMemo(() => {
    const defaultBun = {
      name: "Заглушка булки",
      price: 0,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
    };

    return burgerRecipe.find((item) => item.type === "bun") || defaultBun;
  }, [burgerRecipe]);

  const withoutBun = useMemo(() => {
    return burgerRecipe.filter((item) => item.type !== "bun");
  }, [burgerRecipe]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeHandler = () => {
    setIsOpen(false);
  };
  const showHandler = () => {
    setIsOpen(true);
  };
  return (
    <div className={`${BurgerConstructorStyles.wrapper} mt-25 ml-4`}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${bunItem.name} (верх)`}
        price={bunItem.price}
        thumbnail={bunItem.image}
        extraClass="ml-8"
      />
      <div className={`${BurgerConstructorStyles.wrapperWithoutBun}`}>
        {withoutBun.map((el, index) => (
          <div
            key={`${el._id}${index}`}
            className={BurgerConstructorStyles.row}
          >
            <DragIcon type="primary" />{" "}
            <ConstructorElement
              text={el.name}
              price={el.price}
              thumbnail={el.image}
            />
          </div>
        ))}
      </div>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${bunItem.name} (низ)`}
        price={bunItem.price}
        thumbnail={bunItem.image}
        extraClass="ml-8"
      />
      <div className={`${BurgerConstructorStyles.info} mt-10`}>
        <p className="text text_type_digits-medium">610</p>
        <CurrencyIcon type="primary" className="mr-10" />
        <Button
          onClick={showHandler}
          htmlType="button"
          type="primary"
          size="medium"
        >
          Оформить заказ
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={closeHandler}>
        <OrderDetails />
      </Modal>
    </div>
  );
};
export default BurgerConstructor;
