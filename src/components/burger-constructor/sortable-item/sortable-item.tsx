import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "../burger-constructor.module.css";
import { BurgerItemWithKey } from "../../../types/types";

interface SortableFillingItemProps {
  ingredient: BurgerItemWithKey;
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
  deleteHandler: (item: BurgerItemWithKey) => void;
  extraClass: string;
}

interface DragItem {
  index: number;
  type: string;
}

const SortableFillingItem = ({
  ingredient,
  index,
  moveIngredient,
  deleteHandler,
  extraClass,
}: SortableFillingItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "SORT_INGREDIENT",
    item: { index, type: "SORT_INGREDIENT" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop<DragItem>({
    accept: "SORT_INGREDIENT",
    hover(item: DragItem) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={BurgerConstructorStyles.row}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => deleteHandler(ingredient)}
        extraClass={extraClass}
      />
    </div>
  );
};

export default SortableFillingItem;
