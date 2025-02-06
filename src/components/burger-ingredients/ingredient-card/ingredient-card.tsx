import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cardSrtyles from "./ingredient-card.module.css";
import { BurgerItem } from "../../../types/types";
import { useDrag } from "react-dnd";

type IngredientCardProps = {
  ingredient: BurgerItem;
  count: number;
  onClick: (arg0: BurgerItem) => void;
};

const IngredientCard = ({
  ingredient,
  count,
  onClick,
}: IngredientCardProps) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BURGER_ITEM',
    item: { ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={cardSrtyles.box}
      onClick={() => onClick(ingredient)}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img
        className={`${cardSrtyles.image} mr-4 ml-4`}
        src={ingredient.image_large}
      ></img>
      {count ? <Counter count={count} size="default" /> : null}
      <div className={`${cardSrtyles.price} mt-1 mb-1`}>
        <p className="text text_type_digits-default">{ingredient.price}</p>{" "}
        <CurrencyIcon type="primary" className="ml-1" />
      </div>
      <p className="text text_type_main-small mt-2">{ingredient.name}</p>
    </div>
  );
};
export default IngredientCard;
