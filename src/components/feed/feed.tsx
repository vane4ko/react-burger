import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Feed.module.css";
import { TWebsocketOrder } from "../../types/order-feed";
import FeedItem from "./feed-item/feed-item";

interface IFeedProps {
  orders: TWebsocketOrder[];
}

const Feed: FC<IFeedProps> = ({ orders }) => {

  const location = useLocation();

  return (
    <div className={`${styles.box}`}>
      <ul className={`${styles.list}`}>
        {orders
          ? orders.map((order) => (
              <Link
                className={`${styles.item}`}
                key={order.number}
                to={`/feed/${order.number}`}
                state={{ background: location }}
              >
                <FeedItem order={order} />
              </Link>
            ))
          : null}
      </ul>
    </div>
  );
};

export default Feed;
