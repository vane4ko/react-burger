import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AppHeader from "./components/app-header/app-header";
import Main from "./components/main/main";
import PrivateRouter from "./components/private-router/private-router";
import { AppRoutes } from "./utils/routes";
import LoginPage from "./pages/login-page/login-page";
import ForgotPasswordPage from "./pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "./pages/reset-password-page/reset-password-page";
import ProfilePage from "./pages/profile-page/profile-page";
import IngredientInfo from "./pages/ingredient-info/ingredient-info";
import SignUpPage from "./pages/sing-up-page/sing-up-page";
import { useAppDispatch, useAppSelector } from "./services/app/hooks";
import { useCallback, useEffect } from "react";
import Modal from "./components/modal/modal";
import { clearCurrentIngredient } from "./services/features/current-ingredient/current-ingredient";
import { useAuth } from "./services/features/auth/use-auth";
import ProfileUserData from "./pages/profile-page/profile-user-data/profile-user-data";
import Page404 from "./pages/page-404/page-404";
import { thunkFetchIngredients } from "./services/features/ingredients/ingredients-thunk";
import OrderFeed from "./pages/order-feed/order-feed";
import OrderData from "./components/order-data/order-data";
import ProfileFeed from "./pages/profile-page/profile-feed/profile-feed";

function App() {
  const { status } = useAppSelector((store) => store.userAuth);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;

  useAuth();

  const navigate = useNavigate();
  const handleModalClose = useCallback(() => {
    dispatch(clearCurrentIngredient());
    navigate(-1);
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(thunkFetchIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path={AppRoutes.home} element={<Main />} />
        <Route path={AppRoutes.orders} element={<OrderFeed />} />
        <Route
          element={
            <PrivateRouter
              isAllowed={status !== "guest"}
              redirectPath={AppRoutes.sign.in}
            />
          }
        >
          <Route path={AppRoutes.user.profile} element={<ProfilePage />}>
            <Route index element={<ProfileUserData />} />
            <Route path={AppRoutes.user.orders} element={<ProfileFeed />} />
          </Route>
          <Route
            path={AppRoutes.ingredientDetails}
            element={<IngredientInfo />}
          />
          <Route path={AppRoutes.orderDetails} element={<OrderData />} />{" "}
          <Route path={AppRoutes.user.profileOrderId} element={<OrderData />} />
        </Route>
        <Route
          element={<PrivateRouter isAllowed={status !== "authenticated"} />}
        >
          <Route
            path={AppRoutes.password.forgot}
            element={<ForgotPasswordPage />}
          />
          <Route
            path={AppRoutes.password.reset}
            element={<ResetPasswordPage />}
          />
          <Route path={AppRoutes.sign.up} element={<SignUpPage />} />
          <Route path={AppRoutes.sign.in} element={<LoginPage />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path={AppRoutes.ingredientDetails}
            element={
              <Modal
                isOpen={true}
                title="Детали ингридиента"
                onClose={handleModalClose}
              >
                <IngredientInfo />
              </Modal>
            }
          />
          <Route
            path={AppRoutes.orderDetails}
            element={
              <Modal isOpen={true} title=" " onClose={handleModalClose}>
                <OrderData inModal />
              </Modal>
            }
          />
          <Route
            path={AppRoutes.user.profileOrderId}
            element={
              <Modal isOpen={true} title=" " onClose={handleModalClose}>
                <OrderData inModal />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
