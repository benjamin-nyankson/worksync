"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { CalendarView } from "@/components/CalendarView";
import { LeaveDetails } from "@/components/leave/LeaveDetails";
import { Loader } from "@/components/ui/Loader";
import { Modal } from "@/components/ui/Modal";
import { useLeaves, useValidateLeave } from "@/hooks/api";
import { Leave, LeaveStatus } from "@/interface/interface";
import { EventSourceInput } from "@fullcalendar/core";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { StatsCard } from "../dashboard/page";

export default function AdminPage() {
  const { data: leaves, isFetching: loading } = useLeaves();
  const [open, setOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<Leave | null>(null);
  const { mutate, isPending, isSuccess } = useValidateLeave();

  const getLeaveDetails = (leave: Leave) => {
    setSelectedLeave(leave);
    setOpen(true);
  };

  const total = leaves?.length;
  const approved = leaves?.filter((l) => l.status === "Approved").length;
  const pending = leaves?.filter((l) => l.status === "Pending").length;
  const rejected = leaves?.filter((l) => l.status === "Rejected").length;

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
        <section className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <StatsCard>
            <h3 className="text-sm text-foreground/70">Total Requests</h3>
            <p className="text-2xl font-bold text-primary">{total}</p>
          </StatsCard>
          <StatsCard>
            <h3 className="text-sm text-foreground/70">Approved</h3>
            <p className="text-2xl font-bold text-green-600">{approved}</p>
          </StatsCard>
          <StatsCard>
            <h3 className="text-sm text-foreground/70">Pending</h3>
            <p className="text-2xl font-bold text-yellow-500">{pending}</p>
          </StatsCard>
          <StatsCard>
            <h3 className="text-sm text-foreground/70">Rejected</h3>
            <p className="text-2xl font-bold text-red-500">{rejected}</p>
          </StatsCard>
        </section>

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
