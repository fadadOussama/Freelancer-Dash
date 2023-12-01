import { ItemsType } from "@/type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { PiDotsSixVerticalBold } from "react-icons/pi";

export default function KanbanItems({ id, title }: ItemsType) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: id,
    data: {
      type: "item",
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      aria-describedby=""
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={`cursor-default p-4 bg-colorText/5 rounded-lg w-full border border-colorText/10 hover:shadow-md transition-shadow duration-300 ${
        isDragging && "opacity-60"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="w-[70%] pr-2">
          <span className="text-sm font-medium text-colorText break-words">{title}</span>
        </div>
        <button
          className="border border-colorText/10 p-2 font-medium rounded-lg hover:shadow-md transition-shadow duration-300 cursor-grab"
          {...listeners}
        >
          <PiDotsSixVerticalBold />
        </button>
      </div>
    </div>
  );
}
