import { useAppSelector } from "../../../services/app/hooks";
import { TWebsocketOrder } from "../../../types/order-feed";
import Loader from "../../loader/loader";
import styles from "./Orders.module.css";

type TAcc = {
  [name: string]: TWebsocketOrder[];
};

const Orders = () => {
  const { connectionError, loader } = useAppSelector(
    (state) => state.ordersFeed
  );

  const { orders, total, totalToday } = useAppSelector(
    (state) => state.ordersFeed
  );

  const ordersSort = (array: TWebsocketOrder[] | undefined) => {
    if (!Array.isArray(array)) {
      return { done: [], pending: [] };
    }

    return array.reduce(
      (acc: TAcc, current) => {
        if (current.status === "done") {
          acc["done"] = [...acc["done"], current];
        } else if (current.status === "pending") {
          acc["pending"] = [...acc["pending"], current];
        }
        return acc;
      },
      { done: [], pending: [] } as TAcc
    );
  };

  const statusArray = ordersSort(orders);

  if (connectionError || loader) {
    return <Loader />
  } else {
    return (
      <div className={`${styles.ordersContainer}`}>
        <div className={`${styles.ordersGrid}`}>
          <div className={`${styles.orderColumn}`}>
            <h3 className="text text_type_main-medium">Готовы:</h3>
            <ul className={`${styles.orderList}`}>
              {statusArray?.done.map((order, index) => (
                <li
                  className={`${styles.ordersuccess} text text_type_digits-default`}
                  key={index}
                >
                  {order.number}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.orderColumn}`}>
            <h3 className="text text_type_main-medium">В работе:</h3>
            <ul className={`${styles.orderList}`}>
              {statusArray?.pending.map((order, index) => (
                <li
                  className={`${styles.orderPending} text text_type_digits-default`}
                  key={index}
                >
                  {order.number}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`${styles.orderStats}`}>
          <h3 className="text text_type_main-medium">
            Выполнено за все время:
          </h3>
          <p className={`${styles.large} text text_type_digits-large`}>
            {total}
          </p>
        </div>
        <div className={`${styles.today}`}>
          <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
          <p className={`${styles.large} text text_type_digits-large`}>
            {totalToday}
          </p>
        </div>
      </div>
    );
  }
};

export default Orders;
