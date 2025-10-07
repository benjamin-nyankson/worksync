export type User = {
  exp: number;
  iat: number;
  id: number;
  role: "User" | "Admin";
  username: string;
};

export type LeaveStatus = "Pending" | "Approved" | "Rejected";
export type Leave = {
  id: string;
  userId: string;
  employeeName?: string;
  startDate: string;
  endDate: string;
  status?: LeaveStatus;
  reason: string;
  end_date?:string;
  start_date?:string;
};
