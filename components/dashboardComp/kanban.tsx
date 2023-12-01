"use client";

import { useRef, useState, useOptimistic, startTransition } from "react";

// DnD
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import KanbanContainer from "@/components/dashboardComp/kanbanComp/kanbanContainer";
import KanbanItems from "@/components/dashboardComp/kanbanComp/kanbanItems";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

import { FiPlus } from "react-icons/fi";
import { generateUniqueId } from "@/helpers/generateUniqueId";
import { ItemsType, actionReturnType } from "@/type";
import updateKanbanInDb from "@/serverActions/updateKanbanInDb";
import { Button } from "../ui/button";

export type DNDType = {
  id: UniqueIdentifier;
  title: string;
  color: string;
  items: {
    id: UniqueIdentifier;
    title: string;
  }[];
};

type DNDTypeContainer = {
  kanbanData: DNDType[];
};

export default function KanbanPage({ kanbanData }: DNDTypeContainer) {
  const [containers, setContainers] = useOptimistic(kanbanData, (state, newContainer: DNDType[]) => newContainer);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const [selectedValue, setSelectedValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Find the value of the items
  function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
    if (type === "container") {
      return containers.find((item) => item.id === id);
    }
    if (type === "item") {
      return containers.find((container) => container.items.find((item: ItemsType) => item.id === id));
    }
  }

  // Dnd Handlers
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),

    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragStart(e: DragStartEvent) {
    const { active } = e;
    const { id } = active;

    setActiveId(id);
  }

  async function handleDragMove(e: DragMoveEvent) {
    const { active, over } = e;

    // Handle Items Sorting
    if (active.id.toString().includes("item") && over?.id.toString().includes("item") && active && over && active.id !== over.id) {
      // Find The Active Container And Over Container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      // If The Active Or Over Container Is Undefined Will Return
      if (!activeContainer || !overContainer) return;

      // Find The Active And Over Container Index
      const activeContainerIndex = containers.findIndex((container) => container.id === activeContainer?.id);
      const overContainerIndex = containers.findIndex((container) => container.id === overContainer?.id);

      // Find The Index Of The Active And Over Item
      const activeItemIndex = activeContainer?.items.findIndex((item: ItemsType) => item.id === active.id) as number;
      const overItemIndex = overContainer?.items.findIndex((item: ItemsType) => item.id === over.id) as number;

      // Check If Is In The Same Container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = JSON.parse(JSON.stringify(containers));
        newItems[activeContainerIndex].items = arrayMove(newItems[activeContainerIndex].items, activeItemIndex, overItemIndex);

        startTransition(() => {
          setContainers(newItems);
        });
        const result: actionReturnType = await updateKanbanInDb(newItems);
        if (result.error) {
          toast.error(result.message);
        }
      } else {
        // If We Are In Different Container
        let newItems = JSON.parse(JSON.stringify(containers));
        const [removedItem] = newItems[activeContainerIndex].items.splice(activeItemIndex, 1);

        newItems[overContainerIndex].items.splice(overItemIndex, 0, removedItem);

        startTransition(() => {
          setContainers(newItems);
        });
        const result: actionReturnType = await updateKanbanInDb(newItems);
        if (result.error) {
          toast.error(result.message);
        }
      }
    }

    // Handling Item Drop Into A Container
    if (active.id.toString().includes("item") && over?.id.toString().includes("container") && active && over && active.id !== over.id) {
      // Find The Active And Over Container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      // If The Active Or Over Container Is Undefined, Return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex((container) => container.id === activeContainer.id);
      const overContainerIndex = containers.findIndex((container) => container.id === overContainer.id);

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex((item: ItemsType) => item.id === active.id);

      // Remove the active item from the active container and add it to the over container
      let newItems = JSON.parse(JSON.stringify(containers));
      const [removeditem] = newItems[activeContainerIndex].items.splice(activeitemIndex, 1);
      newItems[overContainerIndex].items.push(removeditem);

      startTransition(() => {
        setContainers(newItems);
      });
      const result: actionReturnType = await updateKanbanInDb(newItems);
      if (result.error) {
        toast.error(result.message);
      }
    }
  }

  async function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    // Handling item drop into a container
    if (active.id.toString().includes("container") && over?.id.toString().includes("container") && active && over && active.id !== over.id) {
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex((container) => container.id === active.id);
      const overContainerIndex = containers.findIndex((container) => container.id === over.id);

      // Swap the active and over container
      let newItems = JSON.parse(JSON.stringify(containers));
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);

      startTransition(() => {
        setContainers(newItems);
      });
      const result: actionReturnType = await updateKanbanInDb(newItems);
      if (result.error) {
        toast.error(result.message);
      }
    }

    // Handling item Sorting
    if (active.id.toString().includes("item") && over?.id.toString().includes("item") && active && over && active.id !== over.id) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex((container) => container.id === activeContainer.id);
      const overContainerIndex = containers.findIndex((container) => container.id === overContainer.id);

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex((item: ItemsType) => item.id === active.id);
      const overitemIndex = overContainer.items.findIndex((item: ItemsType) => item.id === over.id);

      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = JSON.parse(JSON.stringify(containers));
        newItems[activeContainerIndex].items = arrayMove(newItems[activeContainerIndex].items, activeitemIndex, overitemIndex);

        startTransition(() => {
          setContainers(newItems);
        });
        const result: actionReturnType = await updateKanbanInDb(newItems);
        if (result.error) {
          toast.error(result.message);
        }
      } else {
        // In different containers
        let newItems = JSON.parse(JSON.stringify(containers));
        const [removeditem] = newItems[activeContainerIndex].items.splice(activeitemIndex, 1);
        newItems[overContainerIndex].items.splice(overitemIndex, 0, removeditem);

        startTransition(() => {
          setContainers(newItems);
        });
        const result: actionReturnType = await updateKanbanInDb(newItems);
        if (result.error) {
          toast.error(result.message);
        }
      }
    }

    // Handling item dropping into Container
    if (active.id.toString().includes("item") && over?.id.toString().includes("container") && active && over && active.id !== over.id) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex((container) => container.id === activeContainer.id);
      const overContainerIndex = containers.findIndex((container) => container.id === overContainer.id);

      // Find the index of the active item
      const activeitemIndex = activeContainer.items.findIndex((item: ItemsType) => item.id === active.id);

      let newItems = JSON.parse(JSON.stringify(containers));
      const [removeditem] = newItems[activeContainerIndex].items.splice(activeitemIndex, 1);
      newItems[overContainerIndex].items.push(removeditem);

      startTransition(() => {
        setContainers(newItems);
      });
      const result: actionReturnType = await updateKanbanInDb(newItems);
      if (result.error) {
        toast.error(result.message);
      }
    }

    setActiveId(null);
  }

  const onAddItem = async () => {
    let copyContainer: DNDType[] = JSON.parse(JSON.stringify(containers));

    const content = inputRef.current?.value as string;
    if (content === "" || selectedValue === "") {
      toast.error("You Must Fullfied The Inputs");
      return;
    }

    const id = `item-${generateUniqueId()}`;

    copyContainer.map((container) => {
      if (container.id === selectedValue) {
        container.items.push({
          id,
          title: content,
        });
      }
    });

    startTransition(() => {
      setContainers(copyContainer);
    });
    toast.success("Task Added Successfully");
    setIsOpen(false);

    const result: actionReturnType = await updateKanbanInDb(copyContainer);
    if (result.error) {
      toast.error(result.message);
    }
  };

  const findItemTitle = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, "item");
    if (!container) return "";
    const item = container.items.find((item: ItemsType) => item.id === id);
    if (!item) return "";
    return item.title;
  };

  const findContainerTitle = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, "container");
    if (!container) return "";
    return container.title;
  };

  const findContainerItems = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, "container");
    if (!container) return [];
    return container.items;
  };

  const findContainerColor = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, "container");
    if (!container) return "";

    return container.color;
  };

  return (
    <section className="case">
      <div className="my-10">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="w-full" asChild>
            <Button
              variant={"outline"}
              className="font-normal bg-colorText text-colorBg mb-5 duration-300 active:scale-[.98] active:duration-75 transition-all"
            >
              Add New Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="mb-4">
              <DialogTitle>Add Task</DialogTitle>
              <DialogDescription className="text-colorText/70">Add task you want to track and select the state</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-center text-sm font-medium">
                Task
              </label>
              <textarea
                ref={inputRef}
                id="name"
                className="h-[40px] max-h-[200px] min-h-[40px] placeholder:text-colorText/50 col-span-3 text-sm py-2 px-3 bg-colorBg border-[2px] border-colorText/10 rounded-md outline-none"
                placeholder="Enter Content Here"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-center text-sm font-medium">
                State
              </label>
              <Select value={selectedValue} onValueChange={setSelectedValue}>
                <SelectTrigger className="col-span-3 bg-colorBg border-[2px] border-colorText/10 rounded-md">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>States</SelectLabel>
                    <SelectItem value="container-todo">Todo</SelectItem>
                    <SelectItem value="container-doing">Doing</SelectItem>
                    <SelectItem value="container-done">Done</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={onAddItem} className="active:scale-[.98] active:duration-75 transition-all">
              Add Task
            </Button>
          </DialogContent>
        </Dialog>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={containers.map((container) => container.id)}>
              {containers.map((container) => (
                <KanbanContainer key={container.id} title={container.title} id={container.id} items={container.items.length} color={container.color}>
                  <SortableContext items={container.items.map((item: ItemsType) => item.id)}>
                    {container.items.map((item: ItemsType) => (
                      <KanbanItems key={item.id} id={item.id} title={item.title} />
                    ))}
                  </SortableContext>
                </KanbanContainer>
              ))}
            </SortableContext>
            <DragOverlay>
              {activeId && activeId.toString().includes("item") && <KanbanItems id={activeId} title={findItemTitle(activeId)} />}

              {activeId && activeId.toString().includes("container") && (
                <KanbanContainer
                  id={activeId}
                  items={findContainerItems(activeId).length}
                  color={findContainerColor(activeId)}
                  title={findContainerTitle(activeId)}
                >
                  {findContainerItems(activeId).map((i: ItemsType) => (
                    <KanbanItems key={i.id} title={i.title} id={i.id} />
                  ))}
                </KanbanContainer>
              )}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </section>
  );
}
