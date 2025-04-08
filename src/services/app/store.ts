import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "../features/ingredients/ingredients-slice";
import constructorReducer from "../features/constructor/constructor-slice";
import authReducer from "../features/auth/auth-slice";
import orderReducer from "../features/order/order-slice";
import ordersReducer, {
  wsConnecting,
  wsOpen,
  wsMessage,
  wsClose,
  wsError,
  wsConnectionStart,
} from "../features/order-feed/order-feed-slice";
import ordersProfileReducer, {
  wsConnectingInProfile,
  wsOpenInProfile,
  wsMessageInProfile,
  wsCloseInProfile,
  wsErrorInProfile,
  wsConnectionStartInProfile,
} from "../features/orders-profile/orders-profile-slice";
import currentIngredientReducer from "../features/current-ingredient/current-ingredient";
import currentOrderReducer from "../features/current-order/current-order";
import { socketMiddleware } from "../middleware/ws-middleware";

const ordersMiddlware = socketMiddleware({
  wsConnect: wsConnectionStart,
  wsConnecting: wsConnecting,
  onOpen: wsOpen,
  onMessage: wsMessage,
  onClose: wsClose,
  onError: wsError,
});

const ordersProfileMiddlware = socketMiddleware({
  wsConnect: wsConnectionStartInProfile,
  wsConnecting: wsConnectingInProfile,
  onOpen: wsOpenInProfile,
  onMessage: wsMessageInProfile,
  onClose: wsCloseInProfile,
  onError: wsErrorInProfile,
});

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    currentIngredient: currentIngredientReducer,
    currentOrder: currentOrderReducer,
    order: orderReducer,
    userAuth: authReducer,
    ordersFeed: ordersReducer,
    ordersProfile: ordersProfileReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      ordersMiddlware,
      ordersProfileMiddlware
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
