import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./order-feed.module.css";
import { useAppSelector } from "../../services/app/hooks";
import {
  wsClose,
  wsConnectionStart,
} from "../../services/features/order-feed/order-feed-slice";
import Feed from "../../components/feed/feed";
import Orders from "../../components/feed/orders/orders";
import Loader from "../../components/loader/loader";

const GET_ORDERS_URL = "wss://norma.nomoreparties.space/orders/all";

const OrderFeed = () => {
  const dispatch = useDispatch();

  const { orders, connectionError, loader } = useAppSelector(
    (state) => state.ordersFeed
  );

  useEffect(() => {
    dispatch(wsConnectionStart(GET_ORDERS_URL));
    return () => {
      dispatch(wsClose());
    };
  }, [dispatch]);

  if (connectionError || loader) {
    return <Loader />;
  } else {
    return (
      <div className={`${styles.wrapper}`}>
        <h2 className={`${styles.title} text text_type_main-large pb-5`}>
          Лента заказов
        </h2>
        <div className={`${styles.components}`}>
          <Feed orders={orders} />
          <Orders />
        </div>
      </div>
    );
  }
};

export default OrderFeed;
