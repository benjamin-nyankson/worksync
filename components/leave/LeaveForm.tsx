"use client";

import { Button } from "@/components/ui/Button";
import { Leave } from "@/interface/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseISO } from "date-fns";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputField } from "../ui/InputField";
import { Textarea } from "../ui/TextArea";

export function LeaveForm({
  onSubmit,
  onCancel,
  initialValue,
  loading
}: {
  onSubmit: (data: LeaveFormValues) => void;
  onCancel: () => void;
  initialValue: Leave | null;
  loading:boolean
}) {
  const defaultValues = useMemo(() => {
    return initialValue || initialValues;
  }, [initialValue]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<LeaveFormValues>({
    resolver: zodResolver(leaveSchema),
    defaultValues,
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  useEffect(() => {
    if (startDate && endDate) {
      const from = parseISO(startDate);
      const to = parseISO(endDate);
      if (to < from) {
       setError("endDate", {message: "Enddate can't be before start date"});
      }
    }
  }, [startDate, endDate, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      
      <InputField
        label="Start Date"
        type="date"
        {...register("startDate")}
        className="w-full border rounded px-3 py-2"
        error={errors.startDate && errors.startDate.message}
      />

      <InputField
        label="End Date"
        type="date"
        {...register("endDate")}
        className="w-full border rounded px-3 py-2"
        error={errors.endDate && errors.endDate.message}
      />

      

      <div>
        <label className="block mb-1 font-medium">Reason</label>
        <Textarea
          {...register("reason")}
          rows={3}
          className="w-full border rounded px-3 py-2"
        />
        {errors.reason && (
          <p className="text-red-500 text-sm">{errors.reason.message}</p>
        )}
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end gap-2">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={loading}>
          Submit
        </Button>
      </div>
    </form>
  );
}

const initialValues: Leave = {
  id: "",
  userId: "",
  employeeName: "",
  startDate: "",
  endDate: "",
  status: "Pending",
  reason: "",
};

const leaveSchema = z
  .object({
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    reason: z.string().min(5, "Reason must be at least 5 characters"),
    id:z.string(),
    userId:z.string()
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "Enddate can't be before start date",
    path: ["endDate"],
  });

type LeaveFormValues = z.infer<typeof leaveSchema>;
