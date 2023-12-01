import { DNDType } from "@/components/dashboardComp/kanban";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: DNDType[] = [
  {
    id: "container-todo",
    title: "Todo",
    color: "bg-red-500",
    items: [],
  },
  {
    id: "container-doing",
    title: "Doing",
    color: "bg-green-500",
    items: [],
  },
  {
    id: "container-done",
    title: "Done",
    color: "bg-amber-500",
    items: [],
  },
];

export const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    updateKanban: (state, action: PayloadAction<DNDType[]>) => {
      return (state = action.payload);
    },
  },
});

export const kanbanReducer = kanbanSlice.reducer;
export const { updateKanban } = kanbanSlice.actions;
