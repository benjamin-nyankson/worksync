import { Leave, LeaveStatus } from "@/interface/interface";
import { fetcher } from "@/lib/fetcher";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// === Queries ===
export function useLeaves() {
  return useQuery<Leave[]>({
    queryKey: ["leaves"],
    queryFn: () => fetcher<Leave[]>("/api/leaves"),
  });
}

export function useLeave(id: string) {
  return useQuery<Leave>({
    queryKey: ["leave", id],
    queryFn: () => fetcher<Leave>(`/api/leaves/${id}`),
    enabled: !!id, // don’t fetch if id is empty
  });
}

// === Mutations ===
export function useCreateLeave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newLeave: Omit<Leave, "id" | "status">) =>
      fetcher<Leave>("/api/leaves", {
        method: "POST",
        body: JSON.stringify(newLeave),
        headers: { "Content-Type": "application/json" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
    },
  });
}

export function useUpdateLeave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateValue: Omit<Leave, "status">) =>
      fetcher<Leave>("/api/leaves/" + updateValue.id, {
        method: "PATCH",
        body: JSON.stringify(updateValue),
        headers: { "Content-Type": "application/json" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
    },
  });
}

export function useValidateLeave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
      message,
    }: {
      id: string;
      status: LeaveStatus;
      message?: string;
    }) =>
      fetcher<Leave>(`/api/leaves/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
        headers: { "Content-Type": "application/json" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
    },
  });
}

// export function useRejectLeave() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (id: string) =>
//       fetcher<Leave>(`/api/leaves/${id}`, {
//         method: "PATCH",
//         body: JSON.stringify({ status: "Rejected" }),
//         headers: { "Content-Type": "application/json" },
//       }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["leaves"] });
//     },
//   });
// }
