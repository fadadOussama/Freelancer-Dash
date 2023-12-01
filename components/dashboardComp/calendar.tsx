"use client";

import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Button, buttonVariants } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { generateUniqueId } from "@/helpers/generateUniqueId";
import { CalendarContainer } from "@/type";
import updateCalendarInDb from "@/serverActions/updateCalendarInDb";

type Props = {
  calendarData: CalendarContainer;
};

export default function Calendar({ calendarData }: Props) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<DateSelectArg | null>(null);
  const [deleteEvent, setDeleteEvent] = useState<EventClickArg | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const openAddEventDialog = (selected: DateSelectArg) => {
    setIsAddDialogOpen(true);
    setSelectedEvent(selected);
  };

  const openDeleteEventDialog = (selected: EventClickArg) => {
    setIsDeleteDialogOpen(true);
    setDeleteEvent(selected);
  };

  const unsetSelectedEvent = () => {
    setSelectedEvent(null);
  };

  const unsetDeletedEvent = () => {
    setDeleteEvent(null);
  };

  const handleAddEvent = () => {
    const eventContent = inputRef.current?.value.trim() as string;
    if (selectedEvent) {
      let calendarApi = selectedEvent.view.calendar;
      calendarApi.unselect();

      if (eventContent === "") toast.error("Please write an event first");
      else {
        calendarApi.addEvent({
          id: `${eventContent}-${generateUniqueId()}`,
          title: eventContent,
          start: selectedEvent.startStr,
          end: selectedEvent.endStr,
          allDay: selectedEvent.allDay,
        });

        setSelectedEvent(null);
        setIsAddDialogOpen(false);
      }
    }
  };

  const handleDeleteEvent = () => {
    deleteEvent?.event.remove();
  };

  const setEvents = async (events: any) => {
    const newEvents: CalendarContainer = JSON.parse(JSON.stringify(events));
    const result = await updateCalendarInDb(newEvents);

    if (result.error) {
      toast.error(result.message);
    }
  };

  return (
    <>
      <div className="grid">
        <FullCalendar
          height={"85vh"}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={openAddEventDialog}
          eventClick={openDeleteEventDialog}
          eventsSet={(events) => setEvents(events)}
          initialEvents={calendarData}
          editable={true}
          longPressDelay={0}
        />
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent onInteractOutside={unsetSelectedEvent} onEscapeKeyDown={unsetSelectedEvent}>
          <DialogHeader className="mb-4">
            <DialogTitle>Add Event</DialogTitle>
            <DialogDescription>Add new event that you want to track</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-center text-sm font-medium">
              Event
            </label>
            <input
              ref={inputRef}
              id="name"
              className="max-h-[200px] min-h-[40px] placeholder:text-colorText/50 col-span-3 text-sm py-2 px-3 bg-colorBg border-[2px] border-colorText/10 rounded-md outline-none"
              placeholder="Enter Content Here"
            />
          </div>

          <Button variant={"default"} onClick={handleAddEvent} className="active:scale-[.98] active:duration-75 transition-all">
            Add Event
          </Button>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone and it will permanently delete your event</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-full" onClick={unsetDeletedEvent}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="w-full" onClick={handleDeleteEvent}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
