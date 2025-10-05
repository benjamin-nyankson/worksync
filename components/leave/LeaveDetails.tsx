"use client";

import { Leave, LeaveStatus } from "@/interface/interface";
import { CalendarDays, User, Type, FileText, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";
import { useState } from "react";

interface LeaveDetailsProps {
  leave: Leave | null;
  handleValidate: (id: string, status: LeaveStatus, message: string) => void;
  loading: boolean;
}

export function LeaveDetails({
  leave,
  handleValidate,
  loading,
}: LeaveDetailsProps) {
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<LeaveStatus>("Pending");
  if (!leave)
    return (
      <div className="p-6 text-center text-foreground/60">
        No leave selected
      </div>
    );

  const statusColor =
    leave.status === "Approved"
      ? "text-green-600 bg-green-100"
      : leave.status === "Pending"
      ? "text-yellow-600 bg-yellow-100"
      : "text-red-600 bg-red-100";

  const validateLeave = (status: LeaveStatus) => {
    setStatus(status);
    handleValidate(leave.id, status, comment);
  };
  return (
    <div className="w-full max-w-lg mx-auto bg-background  rounded-2xl  space-y-5">
      {/* Employee Info */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary font-semibold uppercase">
          {leave?.employeeName && leave?.employeeName.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-foreground">{leave.employeeName}</p>
          <p className="text-sm text-foreground/60">{leave.userId}</p>
        </div>
      </div>

      <hr className="border-foreground/10" />

      {/* Leave Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Type size={16} className="text-primary" />
          <span>
            <strong>Type:</strong> {leave.leaveType}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={16} className="text-primary" />
          <span>
            <strong>Status:</strong>{" "}
            <span
              className={cn(
                "px-2 py-0.5 rounded text-xs font-medium",
                statusColor
              )}
            >
              {leave.status}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays size={16} className="text-primary" />
          <span>
            <strong>From:</strong> {leave.startDate}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays size={16} className="text-primary" />
          <span>
            <strong>To:</strong> {leave.endDate}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={16} className="text-primary" />
          <span>
            <strong>No. of Days:</strong> {leave.noOfDays}
          </span>
        </div>
      </div>

      <hr className="border-foreground/10" />

      {/* Reason */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
          <FileText size={16} className="text-primary" /> Reason
        </h3>
        <p className="text-sm text-foreground/70 leading-relaxed border border-foreground/10 bg-background p-3 rounded-md">
          {leave.reason || "No reason provided"}
        </p>
      </div>
      {leave.status === "Pending" && (
        <>
          <div>
            <label className="block mb-1 font-medium">Admin Comment</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="danger"
              disabled={!comment?.trim()}
              onClick={() => validateLeave("Rejected")}
              loading={loading && status === "Rejected"}
            >
              Reject
            </Button>
            <Button
              onClick={() => validateLeave("Approved")}
              loading={loading && status === "Approved"}
            >
              Approve
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
