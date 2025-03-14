import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import IngredientCard from "./ingredient-card/ingredient-card";
import ingredientsStyles from "./burger-ingredients.module.css";
import { BurgerItem } from "../../types/types";
import { countById } from "../../utils/helpers";
import { useAppDispatch, useAppSelector } from "../../services/app/hooks";
import { clearError } from "../../services/features/ingredients/ingredients-slice";
import { setCurrentIngredient } from "../../services/features/current-ingredient/current-ingredient";

const BurgerIngredients = () => {
  const burgerData = useAppSelector((store) => store.ingredients.items);
  const error = useAppSelector((store) => store.ingredients.error);
  const bun = useAppSelector((store) => store.burgerConstructor.bun);
  const filling = useAppSelector((store) => store.burgerConstructor.filling);

  const [burgerRecipe, setBurgerRecipe] = useState<BurgerItem[]>([]);
  const [current, setCurrent] = useState("one");

  const containerRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (value: string) => {
    setCurrent(value);
    let ref: React.RefObject<HTMLDivElement> | null = null;
    switch (value) {
      case "bun":
        ref = bunRef;
        break;
      case "sauce":
        ref = sauceRef;
        break;
      case "main":
        ref = mainRef;
        break;
    }
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const showHandler = (ingredient: BurgerItem) => {
    dispatch(setCurrentIngredient(ingredient));
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
    });
  };

  useEffect(() => {
    bun ? setBurgerRecipe([...filling, bun]) : setBurgerRecipe([...filling]);
  }, [filling, bun]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const containerTop = container.getBoundingClientRect().top;
      const distances = [
        {
          type: "bun",
          dist: Math.abs(
            (bunRef.current?.getBoundingClientRect().top || 0) - containerTop
          ),
        },
        {
          type: "sauce",
          dist: Math.abs(
            (sauceRef.current?.getBoundingClientRect().top || 0) - containerTop
          ),
        },
        {
          type: "main",
          dist: Math.abs(
            (mainRef.current?.getBoundingClientRect().top || 0) - containerTop
          ),
        },
      ];
      const closest = distances.reduce((prev, curr) =>
        curr.dist < prev.dist ? curr : prev
      );
      if (closest.type !== current) {
        setCurrent(closest.type);
      }
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [current]);

  return (
    <div className="mr-10">
      <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
      <div style={{ display: "flex" }}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => handleTabClick("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => handleTabClick("sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => handleTabClick("main")}
        >
          Начинки
        </Tab>
      </div>
      <div ref={containerRef} className={ingredientsStyles.wrapper}>
        <p className="text text_type_main-medium mt-10 mb-6">Булки</p>
        <div
          ref={bunRef}
          className={`${ingredientsStyles.constructorCell} ml-4 mb-10`}
        >
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
        <div
          ref={sauceRef}
          className={`${ingredientsStyles.constructorCell} ml-4 mb-10`}
        >
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
        <div
          ref={mainRef}
          className={`${ingredientsStyles.constructorCell} ml-4 mb-10`}
        >
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
    </div>
  );
};

export default BurgerIngredients;
