"use client";

import { Leave, LeaveStatus } from "@/interface/interface";
import { cn } from "@/lib/utils";
import { CalendarDays, Clock, FileText, Type } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/Button";

interface LeaveDetailsProps {
  leave: Leave | null;
  handleValidate: (id: string, status: LeaveStatus, message: string) => void;
  loading: boolean;
  showValidate?: boolean;
}

export function LeaveDetails({
  leave,
  handleValidate,
  loading,
  showValidate
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
      


      {/* Leave Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Type size={16} className="text-primary" />
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
            <strong>From:</strong> {leave.start_date}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays size={16} className="text-primary" />
          <span>
            <strong>To:</strong> {leave.end_date}
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
      {leave.status === "Pending" && showValidate && (
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
