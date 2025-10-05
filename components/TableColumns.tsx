// leavesColumns.ts
import { Edit2Icon, EllipsisIcon, Trash } from "lucide-react";
import { Column } from "@/components/ui/DataTable";
import { Leave } from "@/interface/interface";
import { Dropdown } from "./ui/Dropdown";

type LeaveType = Leave & { action?: string };

export const getLeavesColumns = (
  onEdit: (leave: LeaveType) => void,
  onDelete: (leave: LeaveType) => void
): Column<LeaveType>[] => [
  {
    key: "leaveType",
    label: "Type",
    render: (_, row) => <span className="capitalize">{row.leaveType}</span>,
  },
  { key: "startDate", label: "From" },
  { key: "endDate", label: "To" },
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
      <Dropdown
        trigger={
          <EllipsisIcon className="rotate-90 cursor-pointer" size={20} />
        }
        label="Action"
        items={[
          {
            label: "Edit",
            icon: <Edit2Icon className="h-4 w-4" />,
            onClick: () => onEdit(row),
          },
          {
            label: "Delete",
            icon: <Trash className="h-4 w-4" />,
            onClick: () => onDelete(row),
          },
        ]}
      />
    ),
  },
];
