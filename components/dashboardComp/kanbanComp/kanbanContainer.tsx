import { KanbanProps } from "@/type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PiDotsSixVerticalBold } from "react-icons/pi";

export default function KanbanContainer({ id, children, title, items, color }: KanbanProps) {
  const { attributes, setNodeRef, listeners, transform, transition, isDragging } = useSortable({
    id: id,
    data: {
      type: "container",
    },
  });

  return (
    <div
      {...attributes}
      aria-describedby=""
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={`cursor-default w-full h-full p-6 bg-colorBg border border-colorText/10 rounded-lg shadow-sm flex flex-col gap-y-4 ${
        isDragging && "opacity-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <div className={`h-2 w-2 rounded-full ${color}`}></div>
          <p className="text-colorText tracking-widest font-semibold uppercase">{title}</p>
          <span className="text-xs font-medium text-colorText/70">( {items} )</span>
        </div>
        <button
          className="border border-colorText/10 p-2 font-medium rounded-lg hover:shadow-sm transition-shadow duration-300 cursor-grab"
          {...listeners}
        >
          <PiDotsSixVerticalBold />
        </button>
      </div>

      {children}
    </div>
  );
}
