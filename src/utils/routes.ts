export const AppRoutes = {
  home: "/",
  sign: {
    up: "/register",
    in: "/login",
  },
  password: {
    forgot: "/forgot-password",
    reset: "/reset-password",
  },
  user: {
    profile: "/profile",
    orders: "orders",
  },
  orders: "/feed",
  orderDetails: "/feed/:id",
  ingredients: "/ingredients",
  ingredientDetails: "/ingredients/:id",
};
