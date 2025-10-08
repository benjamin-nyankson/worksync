"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { CalendarView } from "@/components/CalendarView";
import { LeaveDetails } from "@/components/leave/LeaveDetails";
import { Statistics } from "@/components/Statistics";
import { Loader } from "@/components/ui/Loader";
import { Modal } from "@/components/ui/Modal";
import { useLeaves, useValidateLeave } from "@/hooks/api";
import { Leave, LeaveStatus } from "@/interface/interface";
import { EventSourceInput } from "@fullcalendar/core";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function AdminPage() {
  const { data: leaves, isFetching: loading } = useLeaves();
  const [open, setOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<Leave | null>(null);
  const { mutate, isPending, isSuccess } = useValidateLeave();

  const getLeaveDetails = (leave: Leave) => {
    setSelectedLeave(leave);
    setOpen(true);
  };

  const totalLeaves = leaves?.length ?? 0;
  const approved = leaves?.filter((l) => l.status === "Approved").length ??0;
  const pending = leaves?.filter((l) => l.status === "Pending").length ??0;
  const rejected = leaves?.filter((l) => l.status === "Rejected").length ??0;
  const stats = { totalLeaves, approved, pending, rejected };

  const { events } = useLeaveEvent(leaves || []);

  const handleValidate = (id: string, status: LeaveStatus, message: string) => {
    mutate({ id, status });
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      setSelectedLeave(null);
      toast.success("Leave request updated successfully");
    }
  }, [isSuccess]);

  return (
    <ProtectedRoute role="Admin">
      <div className="p-6 space-y-10 bg-background text-foreground ">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-foreground/70">
              Manage all employee leave requests efficiently
            </p>
          </div>
        </header>

        {/* Stats */}
        <Statistics {...stats} />

        {/* Data Table */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Leave Requests</h2>
          {loading ? (
            <Loader text="Loading leaves..." />
          ) : (
            <CalendarView
              events={events as EventSourceInput}
              leave={leaves || []}
              getEventDetails={getLeaveDetails}
            />
          )}
          <Modal open={open} title="Leave Details" onOpenChange={setOpen}>
            <LeaveDetails
              leave={selectedLeave}
              handleValidate={handleValidate}
              loading={isPending}
            />
          </Modal>
        </section>
      </div>
    </ProtectedRoute>
  );
}

export const useLeaveEvent = (leaves: Leave[]) => {
  const events = useMemo(
    () =>
      leaves?.map((leave) => ({
        id: leave.id,
        start: leave.startDate,
        end: leave.endDate,
        backgroundColor:
          leave.status === "Approved"
            ? "var(--color-primary)"
            : leave.status === "Pending"
            ? "var(--color-secondary)"
            : "#ef4444",
        borderColor: "transparent",
        extendedProps: leave,
      })),
    [leaves]
  );

  return { events };
};
