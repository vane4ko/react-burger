import { BurgerItem } from "../../../types/types";
import ingredientStyles from "./ingredient-details.module.css";

type IngredientDetailsProps = {
  ingredient: BurgerItem | null;
};

const IngredientDetails = ({ ingredient }: IngredientDetailsProps) => {
  if (!ingredient) return null;
  return (
    <div className={ingredientStyles.wrapper}>
      <img
        className={`${ingredient.image} mb-4`}
        src={ingredient.image_large}
      ></img>
      <p className="text text_type_main-medium  mb-8">{ingredient.name}</p>
      <div className={`${ingredientStyles.macronutrientsBlock} mb-15`}>
        <div className={ingredientStyles.macronutrient}>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </p>
        </div>
        <div className={ingredientStyles.macronutrient}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </div>
        <div className={ingredientStyles.macronutrient}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </p>
        </div>
        <div className={ingredientStyles.macronutrient}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};
export default IngredientDetails;
