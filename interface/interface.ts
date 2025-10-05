export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

export type LeaveStatus = "Pending" | "Approved" | "Rejected";
export type Leave = {
  id: string;
  userId: string;
  employeeName?: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status?: LeaveStatus;
  noOfDays: number;
  reason: string;
};
