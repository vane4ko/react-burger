import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import IngredientCard from "./ingredient-card/ingredient-card";
import costructorStyles from "./burger-construcor.module.css";
import { BurgerItem } from "../../types/types";

type BurgerConstructorProps = {
  burgerData: BurgerItem[];
  burgerRecipe: BurgerItem[];
};
const BurgerConstructor = ({
  burgerData,
  burgerRecipe,
}: BurgerConstructorProps) => {
  const [current, setCurrent] = useState("one");
  const countById = (array: { _id: string }[], id: string): number => {
    return array.reduce(
      (count, item) => (item._id === id ? count + 1 : count),
      0
    );
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
      <div className={costructorStyles.wrapper}>
        <p className="text text_type_main-medium mt-10 mb-6">Булки</p>
        <div className={`${costructorStyles.constructorCell} ml-4 mb-10`}>
          {burgerData
            .filter((el) => el.type === "bun")
            .map((ingredient) => (
              <IngredientCard
                count={countById(burgerRecipe, ingredient._id)}
                ingredient={ingredient}
              />
            ))}
        </div>
        <p className="text text_type_main-medium mt-10 mb-6">Соусы</p>
        <div className={`${costructorStyles.constructorCell} ml-4 mb-10`}>
          {burgerData
            .filter((el) => el.type === "sauce")
            .map((ingredient) => (
              <IngredientCard
                count={countById(burgerRecipe, ingredient._id)}
                ingredient={ingredient}
              />
            ))}
        </div>
        <p className="text text_type_main-medium mt-10 mb-6">Начинки</p>
        <div className={`${costructorStyles.constructorCell} ml-4 mb-10`}>
          {burgerData
            .filter((el) => el.type === "main")
            .map((ingredient) => (
              <IngredientCard
                count={countById(burgerRecipe, ingredient._id)}
                ingredient={ingredient}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
export default BurgerConstructor;
