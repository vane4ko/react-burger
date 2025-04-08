import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import styles from "./order-data.module.css";
import { useAppDispatch, useAppSelector } from "../../services/app/hooks";
import { BurgerItem } from "../../types/types";
import { thunkGetOrder } from "../../services/features/current-order/order-thunk";
import Loader from "../loader/loader";

interface IParams {
  id: string;
}

interface OrderDataProps {
  inModal?: boolean;
}

const statusConfig = {
  done: {
    text: "Готов",
    className: styles.orderStatusSuccess,
  },
  created: {
    text: "Создан",
    className: styles.orderStatusCreated,
  },
  pending: {
    text: "Готовится",
    className: styles.orderStatusPending,
  },
};

const OrderData = ({ inModal = false }: OrderDataProps) => {
  const dispatch = useAppDispatch();
  const { id } = useParams<keyof IParams>();

  const orderId = Number(id);

  const burgerIngredients = useAppSelector((state) => state.ingredients.items);
  const { order, loading } = useAppSelector((state) => state.currentOrder);

  const orderIngredientIds: string[] = order
    ? order.ingredients
    : burgerIngredients.map((item) => item._id);

  const uniqueIngredientIds = orderIngredientIds.filter(
    (id, index, self) => index === self.indexOf(id)
  );

  const findIngredient = (ingredientId: string): BurgerItem | undefined =>
    burgerIngredients.find((item) => item._id === ingredientId);

  const orderIngredients = orderIngredientIds.map((id) => findIngredient(id));

  const totalPrice = useMemo(() => {
    return orderIngredients?.reduce((acc, item) => {
      if (!item) return acc;
      return acc + (item.type === "bun" ? 2 * item.price : item.price);
    }, 0);
  }, [orderIngredients]);

  const getIngredientCount = useMemo(
    () => (ingredientId: string) =>
      orderIngredientIds.filter((id) => id === ingredientId).length,
    [orderIngredientIds]
  );

  useEffect(() => {
    dispatch(thunkGetOrder(orderId));
  }, [dispatch, orderId]);

  if (loading) {
    return <Loader />;
  }

  const currentStatus =
    order?.status && statusConfig[order.status as keyof typeof statusConfig];

  return (
    <div
      className={`${styles.container} ${
        inModal ? styles.modalOffset : "mt-15"
      }`}
    >
      <ul className={`${styles.orderDetailsList} pb-5`}>
        <li
          className={`${styles.orderNumber} text text_type_digits-default pb-5`}
        >
          #{order?.number}
        </li>
        <li
          className={`${styles.orderTitle} text text_type_main-medium pt-5 pb-3`}
        >
          {order?.name}
        </li>
        <li className={`${currentStatus?.className}`}>{currentStatus?.text}</li>
        <li className="text text_type_main-medium pt-5">
          Состав:
          <ul className={`${styles.ingredientList} pt-3`}>
            {uniqueIngredientIds.map((ingredientId, index) => {
              const ingredient = findIngredient(ingredientId);
              return (
                <li className={styles.ingredientItem} key={index}>
                  <div className={styles.ingredientWrapper}>
                    <div className={styles.ingredientImage}>
                      <img
                        src={ingredient?.image_mobile}
                        alt={ingredient?.name}
                      />
                    </div>
                    <p
                      className={`${styles.ingredientName} text text_type_main-small`}
                    >
                      {ingredient?.name}
                    </p>
                  </div>
                  <div className={styles.priceContainer}>
                    <p className="text text_type_digits-default">
                      {getIngredientCount(ingredientId)} x {ingredient?.price}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
      <div className={`${styles.orderFooter} pt-5`}>
        <p
          className={`${styles.orderDate} text text_type_main-default text_color_inactive`}
        >
          {order?.updatedAt
            ? new Date(order.updatedAt).toLocaleString(undefined, {
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })
            : ""}
        </p>
        <div className={styles.priceRow}>
          <div className={`${styles.priceContainer} pr-5`}>
            <p className="text text_type_digits-medium">{totalPrice}</p>
            <div>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderData;
