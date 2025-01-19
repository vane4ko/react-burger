import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import mainStyles from "./main.module.css";
import { burgerData } from "../../utils/data";
import { useState } from "react";
import { BurgerItem } from "../../types/types";

const Main = () => {
  const [burgerRecipe] = useState<BurgerItem[]>([
    {
      _id: "60666c42cc7b410027a1a9b1",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0,
    },
    {
      _id: "60666c42cc7b410027a1a9b9",
      name: "Соус традиционный галактический",
      type: "sauce",
      proteins: 42,
      fat: 24,
      carbohydrates: 42,
      calories: 99,
      price: 15,
      image: "https://code.s3.yandex.net/react/code/sauce-03.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
      __v: 0,
    },
    {
      _id: "60666c42cc7b410027a1a9b4",
      name: "Мясо бессмертных моллюсков Protostomia",
      type: "main",
      proteins: 433,
      fat: 244,
      carbohydrates: 33,
      calories: 420,
      price: 1337,
      image: "https://code.s3.yandex.net/react/code/meat-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
      __v: 0,
    },
    {
      _id: "60666c42cc7b410027a1a9bc",
      name: "Плоды Фалленианского дерева",
      type: "main",
      proteins: 20,
      fat: 5,
      carbohydrates: 55,
      calories: 77,
      price: 874,
      image: "https://code.s3.yandex.net/react/code/sp_1.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sp_1-large.png",
      __v: 0,
    },
    {
      _id: "60666c42cc7b410027a1a9bb",
      name: "Хрустящие минеральные кольца",
      type: "main",
      proteins: 808,
      fat: 689,
      carbohydrates: 609,
      calories: 986,
      price: 300,
      image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
      image_mobile:
        "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
      image_large:
        "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
      __v: 0,
    },
    {
      _id: "60666c42cc7b410027a1a9bb",
      name: "Хрустящие минеральные кольца",
      type: "main",
      proteins: 808,
      fat: 689,
      carbohydrates: 609,
      calories: 986,
      price: 300,
      image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
      image_mobile:
        "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
      image_large:
        "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
      __v: 0,
    },
    {
      _id: "60666c42cc7b410027a1a9be",
      name: "Мини-салат Экзо-Плантаго",
      type: "main",
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 6,
      price: 4400,
      image: "https://code.s3.yandex.net/react/code/salad.png",
      image_mobile: "https://code.s3.yandex.net/react/code/salad-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/salad-large.png",
      __v: 0,
    },
  ]);
  return (
    <main className={mainStyles.main}>
      <BurgerConstructor burgerData={burgerData} burgerRecipe={burgerRecipe} />
      <BurgerIngredients
        burgerRecipe={burgerRecipe}
      />
    </main>
  );
};
export default Main;
