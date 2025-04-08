import { Link, useLocation } from "react-router-dom";
import styles from "./profile-feed.module.css";
import FeedItem from "../feed/feed-item/feed-item";
import { TWebsocketOrder } from "../../types/order-feed";

interface IFeedInProfilerops {
  orders: TWebsocketOrder[];
}

const FeedInProfile = ({ orders }: IFeedInProfilerops) => {
  const location = useLocation();

  return (
    <div className={`${styles.wrapper}`}>
      <ul className={`${styles.list}`}>
        {orders
          ? orders.map((order) => (
              <Link
                className={`${styles.item} pb-5`}
                key={order.number}
                to={`/profile/orders/${order.number}`}
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

export default FeedInProfile;
