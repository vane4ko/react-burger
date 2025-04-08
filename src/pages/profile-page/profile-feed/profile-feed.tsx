import { useEffect } from "react";
import styles from "./profile-feed.module.css";
import Loader from "../../../components/loader/loader";
import {
  wsCloseInProfile,
  wsConnectionStartInProfile,
} from "../../../services/features/orders-profile/orders-profile-slice";
import { useAppDispatch, useAppSelector } from "../../../services/app/hooks";
import FeedInProfile from "../../../components/profile-feed/profile-feed";

const GET_PROFILE_ORDERS_URL = "wss://norma.nomoreparties.space/orders";

const ProfileFeed = () => {
  const dispatch = useAppDispatch();

  const accessToken = localStorage.getItem("accessToken");

  const orders = useAppSelector((state) => state.ordersProfile.orders);
  const { connectionError, loader } = useAppSelector(
    (state) => state.ordersProfile
  );

  useEffect(() => {
    dispatch(
      wsConnectionStartInProfile(
        `${GET_PROFILE_ORDERS_URL}?token=${accessToken}`
      )
    );
    return () => {
      dispatch(wsCloseInProfile());
    };
  }, [dispatch, accessToken]);

  if (orders === undefined || connectionError || loader) {
    return <Loader />;
  } else if (orders.length === 0) {
    return (
      <div className={styles.empty}>
        <p className="text text_type_main-default text_color_inactive">
          Кажется, Вы ещё ничего не заказывали
        </p>
      </div>
    );
  } else {
    const sortedOrders = orders
      ?.slice()
      .sort((orderCurrent, orderNext) =>
        orderNext.updatedAt.localeCompare(orderCurrent.updatedAt)
      );
    return (
      <>
        <div className={`${styles.wrapper}`}>
          <FeedInProfile orders={sortedOrders} />
        </div>
      </>
    );
  }
};

export default ProfileFeed;
