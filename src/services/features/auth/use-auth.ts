import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { kickUser } from "./auth-slice";
import { thunkGetUser, thunkRefresh } from "./auth-thunk";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const authenticateUser = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        dispatch(kickUser());
        return;
      }

      try {
        await dispatch(thunkGetUser({ token: accessToken })).unwrap();
      } catch (error) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            const { accessToken: newAccessToken } = await dispatch(
              thunkRefresh({ token: refreshToken })
            ).unwrap();
            await dispatch(
              thunkGetUser({ token: newAccessToken.split(" ")[1] })
            ).unwrap();
          } catch (refreshError) {
            dispatch(kickUser());
          }
        } else {
          dispatch(kickUser());
        }
      }
    };

    authenticateUser();
  }, [dispatch]);
};
