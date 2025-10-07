"use client";

import { Leave } from "@/interface/interface";
import { EventSourceInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { add, format } from "date-fns";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

export function CalendarView({
  events,
  leave,
  getEventDetails,
  addEvent,
}: {
  events: EventSourceInput;
  leave: Leave[];
  getEventDetails: (leave: Leave) => void;
  addEvent?: (date: string) => void;
}) {
  const formatDate = (date: string) =>
    date ? format(`${date}`, "dd MMM, yyyy") : "";
  return (
    <div className="p-4 rounded-xl bg-background border border-foreground/10">
      <h2 className="text-xl font-semibold mb-4 text-foreground">
        Calendar View
      </h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClassNames="rounded-lg shadow-sm my-2 p-2 cursor-pointer"
        dayCellClassNames={" cursor-pointer"}
        dateClick={(dateClickInfo) => {
          addEvent && addEvent(dateClickInfo.dateStr);
        }}
        weekends={false}
        eventDidMount={(info) => {
          const leave: Leave = info.event.extendedProps as Leave;
          tippy(info.el, {
            content: `
              <div class="text-left text-sm">
                <p><strong>${leave.employeeName || ""}</strong></p>
                <p>Status: ${leave.status}</p>
                <p>From: ${
                  formatDate(leave.startDate) ||
                  formatDate(leave?.start_date as string)
                }</p>
                <p>To: ${
                  formatDate(leave.endDate) ||
                  formatDate(leave.end_date as string)
                }</p>
                <p>Reason: ${leave.reason}</p>
              </div>
            `,
            allowHTML: true,
            theme: "light-border",
            placement: "top",
          });
        }}
        eventClick={(info) => {
          const leave: Leave = info.event.extendedProps as Leave;
          getEventDetails(leave);
        }}
        height="auto"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek",
        }}
      />
    </div>
  );
}
