import { useLocation, useParams } from "react-router-dom";
import IngredientDetails from "../../components/burger-ingredients/ingredient-details/ingredient-details";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/app/hooks";
import {
  clearCurrentIngredient,
  setCurrentIngredient,
} from "../../services/features/current-ingredient/current-ingredient";
import { thunkFetchIngredients } from "../../services/features/ingredients/ingredients-thunk";
import IIStyles from "./ingredient-info.module.css";

const IngredientInfo = () => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((store) => store.ingredients);
  const targetedIngredient = useAppSelector(
    (store) => store.currentIngredient.ingredient
  );
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    dispatch(thunkFetchIngredients());
    return () => {
      dispatch(clearCurrentIngredient());
    };
  }, [dispatch]);

  useEffect(() => {
    if (items.length) {
      const findItem = items.find((i) => i._id === id);
      findItem !== undefined && dispatch(setCurrentIngredient(findItem));
    }
  }, [dispatch, id, items, loading, targetedIngredient]);

  const location = useLocation();

  const background = location.state && location.state.background;

  return (
    <div>
      {!background && (
        <div className={`text text_type_main-large mt-30 ${IIStyles.title}`}>
          Детали ингридиента
        </div>
      )}
      <IngredientDetails ingredient={targetedIngredient} />
    </div>
  );
};
export default IngredientInfo;
