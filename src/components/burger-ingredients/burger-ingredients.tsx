import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerItem } from "../../types/types";
import BurgerIngredientsStyles from "./burger-ingredients.module.css";

type BurgerIngredientsProps = {
  burgerRecipe: BurgerItem[];
};

const BurgerIngredients = ({ burgerRecipe }: BurgerIngredientsProps) => {
  const defaultBun = {
    name: "Заглушка булки",
    price: 0,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
  };

  const bunItem =
    burgerRecipe.find((item) => item.type === "bun") || defaultBun;
  const withoutBun = burgerRecipe.filter((item) => item.type !== "bun");
  return (
    <div className={`${BurgerIngredientsStyles.wrapper} mt-25 ml-4`}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${bunItem.name} (верх)`}
        price={bunItem.price}
        thumbnail={bunItem.image}
        extraClass="ml-8"
      />
      <div className={`${BurgerIngredientsStyles.wrapperWithoutBun}`}>
        {withoutBun.map((el) => (
          <div className={BurgerIngredientsStyles.row}>
            <DragIcon type="primary" />{" "}
            <ConstructorElement
              key={el._id}
              text={el.name}
              price={el.price}
              thumbnail={el.image}
            />
          </div>
        ))}
      </div>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${bunItem.name} (низ)`}
        price={bunItem.price}
        thumbnail={bunItem.image}
        extraClass="ml-8"
      />
      <div className={`${BurgerIngredientsStyles.info} mt-10`}>
        <p className="text text_type_digits-medium">610</p>
        <CurrencyIcon type="primary" className="mr-10" />
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};
export default BurgerIngredients;
