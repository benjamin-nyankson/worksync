"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { getLeavesColumns } from "@/components/TableColumns";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { Leave, User } from "@/interface/interface";
import { ReactNode, useEffect, useMemo, useState } from "react";

import { LeaveForm } from "@/components/leave/LeaveForm";
import { Modal } from "@/components/ui/Modal";
import { useCreateLeave, useLeaves, useUpdateLeave } from "@/hooks/api";
import { toast } from "sonner";
import { Loader } from "@/components/ui/Loader";

export default function DashboardPage() {
  const [userName, setUserName] = useState("User");
  const [openDialog, setOpenDialog] = useState(false);
  const [leave, setLeave] = useState<Leave | null>(null);
  const { data: leavesData, isLoading } = useLeaves();
  const { mutate, isPending, isSuccess } = useCreateLeave();
  const {
    mutate: updateLeave,
    isSuccess: updateSuccess,
    isPending: updateLoading,
  } = useUpdateLeave();

  let user: User;

  // Simulate fetching data from API
  useEffect(() => {
    const storedName = localStorage.getItem("worksync_name");
    if (storedName) setUserName(storedName);
    user = JSON.parse(localStorage.getItem("user_data") ?? "[]");
  }, []);

  const leaves: Leave[] = useMemo(() => {
    return (
      leavesData?.map((leave) => {
        return {
          ...leave,
          leaveType: leave.leaveType.toLowerCase(),
        };
      }) ?? []
    );
  }, [leavesData]);

  const totalLeaves = leaves.length;
  const approved = leaves.filter((l) => l.status === "Approved").length;
  const pending = leaves.filter((l) => l.status === "Pending").length;

  const handleEdit = (leave: Leave) => {
    setOpenDialog(true);
    setLeave(leave);
  };

  const handleDelete = (leave: Leave) => {
    console.log("Delete leave:", leave);
    // confirm + remove from state
  };

  const columns = getLeavesColumns(handleEdit, handleDelete);

  useEffect(() => {
    if (!openDialog) {
      setLeave(null);
    }
  }, [openDialog]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Leave booked successfully");
      setOpenDialog(false);
      setLeave(null);
    }

    if (updateSuccess) {
      toast.success("Leave updated successfully");
      setOpenDialog(false);
      setLeave(null);
    }
  }, [isSuccess, updateSuccess]);

  const handleAddLeave = (leave: Leave) => {
    if (leave.id) {
      updateLeave({ ...leave, userId: user?.id });
    } else {
      mutate({ ...leave, userId: user?.id });
    }
  };

  return (
    <ProtectedRoute role={"user"}>
      <div className="p-6 space-y-10 bg-background text-foreground min-h-screen">
        {/* Greeting */}
        <section>
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {userName} 👋
          </h1>
          <p className="text-foreground/70">
            Here’s an overview of your leave requests.
          </p>
        </section>

        {/* Stats Section */}
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

        {/* Recent Leaves Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Leave Requests</h2>
            <Button variant="primary" onClick={() => setOpenDialog(true)}>
              + New Request
            </Button>
          </div>
          {isLoading && <Loader fullscreen text="Loading Leaves" />}
          <DataTable
            columns={columns}
            data={leaves}
            emptyMessage="No leave requests yet"
          />

          <Modal
            open={openDialog}
            onOpenChange={setOpenDialog}
            title={leave ? "Update Leave" : "New Leave Request"}
            description="Fill in the details to submit a new leave request."
          >
            <LeaveForm
              onCancel={() => {
                setLeave(null);
                setOpenDialog(false);
              }}
              onSubmit={handleAddLeave}
              initialValue={leave}
              loading={isPending || updateLoading}
            />
          </Modal>
        </section>
      </div>
    </ProtectedRoute>
  );
}

const StatsCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-6 rounded-xl bg-background border border-foreground/10">
      {children}
    </div>
  );
};
