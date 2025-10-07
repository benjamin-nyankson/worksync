// leavesColumns.ts
import { Column } from "@/components/ui/DataTable";
import { Leave } from "@/interface/interface";
import { Eye } from "lucide-react";
import { format } from "date-fns";

interface LeaveType extends Leave {
  action?: string;
}
export const getLeavesColumns = (
  viewLeave: (leave: Leave) => void
): Column<LeaveType>[] => [
  {
    key: "start_date",
    label: "Start Date",
    render: (_, row) => {
      const formatedDate = format(`${row.start_date}`, "dd MMM, yyyy");
      return formatedDate;
    },
  },
  {
    key: "end_date",
    label: "End Date",
    render: (_, row) => {
      const formatedDate = format(`${row.end_date}`, "dd MMM, yyyy");
      return formatedDate;
    },
  },
  { key: "reason", label: "Reason" },
  {
    key: "status",
    label: "Status",
    render: (_, row) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium
          ${
            row.status === "Approved"
              ? "bg-green-100 text-green-700"
              : row.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: "action",
    label: "Action",
    render: (_, row) => (
      <Eye onClick={() => viewLeave(row)} className="cursor-pointer" />
    ),
  },
];
