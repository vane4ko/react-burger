import { useMemo } from "react";
import styles from "./feed-item.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../../services/app/hooks";
import { BurgerItem } from "../../../types/types";
import { TWebsocketOrder } from "../../../types/order-feed";

interface FeedItemProps {
  order: TWebsocketOrder;
}

const FeedItem = ({ order }: FeedItemProps) => {
  const burgerIngredients = useAppSelector((state) => state.ingredients.items);

  const findIngredient = (ingredientId: string) =>
    burgerIngredients.find((item) => item._id === ingredientId) as BurgerItem;

  const ingredientsWithImage = order.ingredients.map(findIngredient);

  const totalPrice = useMemo(() => {
    return ingredientsWithImage.reduce((acc, item) => {
      return acc + (item.type === "bun" ? 2 * item.price : item.price);
    }, 0);
  }, [ingredientsWithImage]);

  const formattedDate = new Date(order.updatedAt).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className={styles.feedItemCard}>
      <div className={styles.headerRow}>
        <p className={`${styles.orderNumber} text text_type_digits-default`}>
          #{order.number}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          {formattedDate}
        </p>
      </div>
      <h3 className={`${styles.feedItemTitle} text text_type_main-medium`}>
        {order.name}
      </h3>
      <div className={styles.contentWrapper}>
        <ul className={styles.ingredientList}>
          {order.ingredients.map((ingredientId, index) => {
            if (index < 5) {
              return (
                <li
                  key={index}
                  style={{ zIndex: 9 - index }}
                  className={styles.ingredientItem}
                >
                  <img
                    className={styles.ingredientImage}
                    src={findIngredient(ingredientId)?.image_mobile}
                    alt="ingredient"
                  />
                </li>
              );
            } else if (index === 5) {
              return (
                <li
                  key={index}
                  style={{ zIndex: 9 - index }}
                  className={styles.ingredientOverlayItem}
                >
                  <img
                    className={styles.ingredientImage}
                    src={findIngredient(ingredientId)?.image_mobile}
                    alt="ingredient"
                  />
                  <div className={styles.imageOverlay}></div>
                  <span
                    className={`text text_type_main-default ${styles.ingredientCount}`}
                  >
                    +{order.ingredients.length - 5}
                  </span>
                </li>
              );
            }
            return null;
          })}
        </ul>
        <div className={`${styles.priceWrapper}`}>
          <p className="text text_type_digits-default">{totalPrice || 0}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
