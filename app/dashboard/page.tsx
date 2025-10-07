"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { getLeavesColumns } from "@/components/TableColumns";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { Leave, User } from "@/interface/interface";
import { useEffect, useMemo, useRef, useState } from "react";
import { LeaveForm } from "@/components/leave/LeaveForm";
import { Modal } from "@/components/ui/Modal";
import { useCreateLeave, useLeaves, useUpdateLeave } from "@/hooks/api";
import { toast } from "sonner";
import { Loader } from "@/components/ui/Loader";
import { LeaveDetails } from "@/components/leave/LeaveDetails";
import { CalendarView } from "@/components/CalendarView";
import { EventSourceInput } from "@fullcalendar/core";
import { Tabs } from "@/components/ui/Tabs";
import { ReactNode } from "react";

type ModalState = {
  type: "none" | "create" | "update" | "view";
  data: Leave | null;
};

export default function DashboardPage() {
  const userNameRef = useRef("User");
  const [modal, setModal] = useState<ModalState>({ type: "none", data: null });
  const [view, setView] = useState("calendar");

  const { data: leavesData, isLoading } = useLeaves();
  const { mutate: createLeave, isPending, isSuccess } = useCreateLeave();
  const {
    mutate: updateLeave,
    isPending: updateLoading,
    isSuccess: updateSuccess,
  } = useUpdateLeave();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user_data") ?? "{}") as User;
    if (user?.username) userNameRef.current = user.username;
  }, []);

  const leaves = useMemo(() => leavesData ?? [], [leavesData]);

  const totalLeaves = leaves.length;
  const approved = leaves.filter((l) => l.status === "Approved").length;
  const pending = leaves.filter((l) => l.status === "Pending").length;

  const handleLeaveSubmit = (leave: Leave) => {
    const user = JSON.parse(localStorage.getItem("user_data") ?? "{}") as User;

    if (leave.id) {
      updateLeave({ ...leave, userId: `${user?.id}` });
    } else {
      createLeave({ ...leave, userId: `${user?.id}` });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Leave booked successfully");
      setModal({ type: "none", data: null });
    }

    if (updateSuccess) {
      toast.success("Leave updated successfully");
      setModal({ type: "none", data: null });
    }
  }, [isSuccess, updateSuccess]);

  const getLeaveDetails = (leave: Leave) =>
    setModal({ type: "view", data: leave });

  const columns = getLeavesColumns(getLeaveDetails);

  const events = useMemo<EventSourceInput>(
    () =>
      leaves.map((leave) => ({
        id: leave.id,
        title: `${userNameRef.current} - ${leave.status}`,
        start: leave.start_date,
        end: leave.end_date,
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

  return (
    <ProtectedRoute role="User">
      <div className="p-6 space-y-10 bg-background text-foreground min-h-screen">
        {/* Header */}
        <section>
          <h1 className="text-3xl font-bold mb-2">
            Welcome back,{" "}
            <span className="uppercase">{userNameRef.current}</span>
          </h1>
          <p className="text-foreground/70">
            Here’s an overview of your leave requests.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatsCard>
            <h3 className="text-sm text-foreground/70">Total Leaves</h3>
            <p className="text-2xl font-bold text-primary">{totalLeaves}</p>
          </StatsCard>
          <StatsCard>
            <h3 className="text-sm text-foreground/70">Approved</h3>
            <p className="text-2xl font-bold text-green-600">{approved}</p>
          </StatsCard>
          <StatsCard>
            <h3 className="text-sm text-foreground/70">Pending</h3>
            <p className="text-2xl font-bold text-yellow-500">{pending}</p>
          </StatsCard>
        </section>

        {/* Leaves Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Leave Requests</h2>
            <Tabs
              tabs={[
                { label: "Calendar", value: "calendar" },
                { label: "Table", value: "table" },
              ]}
              defaultValue="calendar"
              onChange={setView}
            />
            <Button
              variant="primary"
              onClick={() => setModal({ type: "create", data: null })}
            >
              + New Request
            </Button>
          </div>

          {isLoading && <Loader fullscreen text="Loading Leaves" />}

          {view === "table" && (
            <DataTable
              columns={columns}
              data={leaves}
              emptyMessage="No leave requests yet"
            />
          )}

          {view === "calendar" && (
            <CalendarView
              events={events}
              leave={leaves}
              getEventDetails={getLeaveDetails}
              addEvent={(date: string) => {
                setModal({
                  type: "create",
                  data: {
                    id: "",
                    reason: "",
                    status: "Pending",
                    userId: "",
                    employeeName: userNameRef.current,
                    startDate: date,
                    endDate: date,
                  },
                });
              }}
            />
          )}
        </section>

        {/* Leave Form / View Modals */}
        {["create", "update"].includes(modal.type) && (
          <Modal
            open
            onOpenChange={() => setModal({ type: "none", data: null })}
            title={
              modal.type === "update" ? "Update Leave" : "New Leave Request"
            }
            description="Fill in the details to submit a new leave request."
          >
            <LeaveForm
              onCancel={() => setModal({ type: "none", data: null })}
              onSubmit={handleLeaveSubmit}
              initialValue={modal.data}
              loading={isPending || updateLoading}
            />
          </Modal>
        )}

        {modal.type === "view" && (
          <Modal
            open
            title="Leave Details"
            onOpenChange={() => setModal({ type: "none", data: null })}
          >
            <LeaveDetails
              leave={modal.data}
              handleValidate={() => {}}
              loading={isPending}
            />
          </Modal>
        )}
      </div>
    </ProtectedRoute>
  );
}

/** Reusable Stats Card */
export const StatsCard = ({ children }: { children: ReactNode }) => (
  <div className="p-6 rounded-xl bg-background border border-foreground/10">
    {children}
  </div>
);
