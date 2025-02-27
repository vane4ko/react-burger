import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerItem, BurgerItemWithKey } from "../../types/types";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import { useMemo, useState } from "react";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";

import {
  addIngredient,
  deleteIngredient,
  moveIngredient,
} from "../../services/features/constructor/constructor-slice";
import { useAppDispatch, useAppSelector } from "../../services/app/hooks";
import { useDrop } from "react-dnd";
import { thunkSendOrder } from "../../services/features/order/order-thunk";
import SortableFillingItem from "./sortable-item/sortable-item";

const BurgerConstructor = () => {
  const bun = useAppSelector((store) => store.burgerConstructor.bun);
  const filling = useAppSelector((store) => store.burgerConstructor.filling);

  const bunItem = useMemo(() => {
    const defaultBun = {
      name: "Выберите булку",
      price: 0,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
    };
    return bun || defaultBun;
  }, [bun]);
  const price = useMemo(() => {
    let tempPrice = filling.reduce((sum, item) => sum + item.price, 0);
    if (bun) tempPrice = tempPrice + bun.price * 2;
    return tempPrice;
  }, [bun, filling]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeHandler = () => {
    setIsOpen(false);
  };
  const showHandler = () => {
    const ids = [];
    filling.forEach((el) => {
      ids.push(el._id);
    });
    if (bun) ids.push(bun._id);
    dispatch(thunkSendOrder({ ingredients: ids }));
    setIsOpen(true);
  };

  const dispatch = useAppDispatch();
  const deleteHandler = (item: BurgerItemWithKey) => {
    dispatch(deleteIngredient(item));
  };
  const onDrop = (item: BurgerItem) => {
    dispatch(addIngredient(item));
  };
  const [{ isHover, ingredientTypeDrop }, drop] = useDrop(() => ({
    accept: "BURGER_ITEM",
    drop: (item: { ingredient: BurgerItem }) => {
      onDrop(item.ingredient);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      ingredientTypeDrop: monitor.getItem()?.ingredient?.type,
    }),
  }));

  const boxShadowBun = isHover && ingredientTypeDrop === "bun" ? true : false;
  const boxShadowFill = isHover && ingredientTypeDrop !== "bun" ? true : false;

  const handleMoveIngredient = (dragIndex: number, hoverIndex: number) => {
    dispatch(moveIngredient({ dragIndex, hoverIndex }));
  };

  return (
    <div ref={drop} className={`${BurgerConstructorStyles.wrapper} mt-25 ml-4`}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${bunItem.name} (верх)`}
        price={bunItem.price}
        thumbnail={bunItem.image}
        extraClass={`ml-8 ${boxShadowBun && BurgerConstructorStyles.shadowed}`}
      />
      <div className={`${BurgerConstructorStyles.wrapperWithoutBun}`}>
        {filling.map((el, index) => (
          <SortableFillingItem
            key={`${el.key}`}
            ingredient={el}
            index={index}
            moveIngredient={handleMoveIngredient}
            deleteHandler={deleteHandler}
            extraClass={`${boxShadowFill && BurgerConstructorStyles.shadowed}`}
          />
        ))}
      </div>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${bunItem.name} (низ)`}
        price={bunItem.price}
        thumbnail={bunItem.image}
        extraClass={`ml-8 ${boxShadowBun && BurgerConstructorStyles.shadowed}`}
      />
      <div className={`${BurgerConstructorStyles.info} mt-10`}>
        <p className="text text_type_digits-medium">{price}</p>
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
