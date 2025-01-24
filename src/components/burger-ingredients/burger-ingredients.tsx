import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import IngredientCard from "./ingredient-card/ingredient-card";
import ingredientsStyles from "./burger-ingredients.module.css";
import { BurgerItem } from "../../types/types";
import { countById } from "../../utils/helpers";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";

type BurgerIngredientsProps = {
  burgerData: BurgerItem[];
  burgerRecipe: BurgerItem[];
};
const BurgerIngredients = ({
  burgerData,
  burgerRecipe,
}: BurgerIngredientsProps) => {
  const [current, setCurrent] = useState("one");

  const [targetedIngredient, setTargetedIngredient] =
    useState<BurgerItem | null>(null);
  const closeHandler = () => {
    setTargetedIngredient(null);
  };
  const showHandler = (ingredient: BurgerItem) => {
    setTargetedIngredient(ingredient);
  };
  return (
    <div className="mr-10">
      <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
      <div style={{ display: "flex" }}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={ingredientsStyles.wrapper}>
        <p className="text text_type_main-medium mt-10 mb-6">Булки</p>
        <div className={`${ingredientsStyles.constructorCell} ml-4 mb-10`}>
          {burgerData
            .filter((el) => el.type === "bun")
            .map((ingredient) => (
              <IngredientCard
                onClick={showHandler}
                key={ingredient._id}
                count={countById(burgerRecipe, ingredient._id)}
                ingredient={ingredient}
              />
            ))}
        </div>
        <p className="text text_type_main-medium mt-10 mb-6">Соусы</p>
        <div className={`${ingredientsStyles.constructorCell} ml-4 mb-10`}>
          {burgerData
            .filter((el) => el.type === "sauce")
            .map((ingredient) => (
              <IngredientCard
                onClick={showHandler}
                key={ingredient._id}
                count={countById(burgerRecipe, ingredient._id)}
                ingredient={ingredient}
              />
            ))}
        </div>
        <p className="text text_type_main-medium mt-10 mb-6">Начинки</p>
        <div className={`${ingredientsStyles.constructorCell} ml-4 mb-10`}>
          {burgerData
            .filter((el) => el.type === "main")
            .map((ingredient) => (
              <IngredientCard
                onClick={showHandler}
                key={ingredient._id}
                count={countById(burgerRecipe, ingredient._id)}
                ingredient={ingredient}
              />
            ))}
        </div>
      </div>
      <Modal
        title={"Детали ингридиента"}
        isOpen={!!targetedIngredient}
        onClose={closeHandler}
      >
        <IngredientDetails ingredient={targetedIngredient} />
      </Modal>
    </div>
  );
};
export default BurgerIngredients;
