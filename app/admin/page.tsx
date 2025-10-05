"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { CalendarView } from "@/components/CalendarView";
import { LeaveDetails } from "@/components/leave/LeaveDetails";
import { Button } from "@/components/ui/Button";
import { Column, DataTable } from "@/components/ui/DataTable";
import { Loader } from "@/components/ui/Loader";
import { Modal } from "@/components/ui/Modal";
import { Tabs } from "@/components/ui/Tabs";
import { useLeaves, useValidateLeave } from "@/hooks/api";
import { Leave, LeaveStatus } from "@/interface/interface";
import { EventSourceInput } from "@fullcalendar/core";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"calendar" | "table">("calendar");
  const { data: leaves, isFetching: loading } = useLeaves();
  const [open, setOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<Leave | null>(null);
  const { mutate, isPending, isSuccess } = useValidateLeave();

  const getLeaveDetails = (leave: Leave) => {
    setSelectedLeave(leave);
    setOpen(true);
  };
  // --- Columns for Table
  const columns: Column<Leave>[] = [
    { key: "employeeName", label: "Employee" },
    { key: "leaveType", label: "Type" },
    { key: "startDate", label: "From" },
    { key: "endDate", label: "To" },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium
            ${
              value === "Approved"
                ? "bg-green-100 text-green-700"
                : value === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (_, row) => (
        <Button onClick={() => getLeaveDetails(row)}>View</Button>
      ),
    },
  ];

  // --- Stats
  const total = leaves?.length;
  const approved = leaves?.filter((l) => l.status === "Approved").length;
  const pending = leaves?.filter((l) => l.status === "Pending").length;
  const rejected = leaves?.filter((l) => l.status === "Rejected").length;

  const tabs = [
    { label: "Calendar", value: "calendar" },
    { label: "Table", value: "table" },
  ];

  const events = useMemo(
    () =>
      leaves?.map((leave) => ({
        id: leave.id,
        title: `${leave.employeeName} - ${leave.leaveType}`,
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
    <ProtectedRoute role="admin">
      <div className="p-6 space-y-10 bg-background text-foreground ">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-foreground/70">
              Manage all employee leave requests efficiently
            </p>
          </div>
          <Tabs tabs={tabs} defaultValue="calendar" onChange={setActiveTab} />
        </header>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="p-5 rounded-xl border border-foreground/10 shadow bg-background">
            <h3 className="text-sm text-foreground/70">Total Requests</h3>
            <p className="text-2xl font-bold text-primary">{total}</p>
          </div>
          <div className="p-5 rounded-xl border border-foreground/10 shadow bg-background">
            <h3 className="text-sm text-foreground/70">Approved</h3>
            <p className="text-2xl font-bold text-green-600">{approved}</p>
          </div>
          <div className="p-5 rounded-xl border border-foreground/10 shadow bg-background">
            <h3 className="text-sm text-foreground/70">Pending</h3>
            <p className="text-2xl font-bold text-yellow-500">{pending}</p>
          </div>
          <div className="p-5 rounded-xl border border-foreground/10 shadow bg-background">
            <h3 className="text-sm text-foreground/70">Rejected</h3>
            <p className="text-2xl font-bold text-red-500">{rejected}</p>
          </div>
        </section>

        {/* Data Table */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Leave Requests</h2>
          {loading ? (
            <Loader text="Loading leaves..." />
          ) : (
            <>
              {activeTab === "calendar" && (
                <CalendarView
                  events={events as EventSourceInput}
                  leave={leaves || []}
                  getEventDetails={getLeaveDetails}
                />
              )}
              {activeTab === "table" && (
                <DataTable
                  columns={columns}
                  data={leaves || []}
                  emptyMessage="No leave requests yet."
                />
              )}
            </>
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
