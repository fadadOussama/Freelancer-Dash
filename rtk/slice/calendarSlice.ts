import { CalendarProps } from "@/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CalendarProps[] = [];

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    updateCalendar: (state, action: PayloadAction<CalendarProps[]>) => {
      return (state = action.payload);
    },
  },
});

export const calendarReducer = calendarSlice.reducer;
export const { updateCalendar } = calendarSlice.actions;
