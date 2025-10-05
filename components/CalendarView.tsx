"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventSourceInput } from "@fullcalendar/core";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { Leave } from "@/interface/interface";

export function CalendarView({
  events,
  leave, getEventDetails
}: {
  events: EventSourceInput;
  leave: Leave[];
  getEventDetails:(leave:Leave) => void
}) {
  return (
    <div className="p-4 rounded-xl bg-background border border-foreground/10 shadow">
      <h2 className="text-xl font-semibold mb-4 text-foreground">
        Calendar View
      </h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClassNames="rounded-lg shadow-sm my-2 p-2 cursor-pointer"
        eventDidMount={(info) => {
          const leave: Leave = info.event.extendedProps as Leave;
          tippy(info.el, {
            content: `
              <div class="text-left text-sm">
                <p><strong>${leave.employeeName}</strong></p>
                <p>Type: ${leave.leaveType}</p>
                <p>Status: ${leave.status}</p>
                <p>From: ${leave.startDate}</p>
                <p>To: ${leave.endDate}</p>
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
          console.log("Clicked Leave:", leave);
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
