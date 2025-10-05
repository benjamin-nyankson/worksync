"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { differenceInDays, parseISO } from "date-fns";
import { useEffect, useMemo } from "react";
import { InputField } from "../ui/InputField";
import { SelectField } from "../ui/SelectField";
import { Leave } from "@/interface/interface";

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
    formState: { errors },
  } = useForm<LeaveFormValues>({
    resolver: zodResolver(leaveSchema),
    defaultValues,
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  // Auto-calc number of days
  useEffect(() => {
    if (startDate && endDate) {
      const from = parseISO(startDate);
      const to = parseISO(endDate);
      if (to >= from) {
        const days = differenceInDays(to, from) + 1;
        setValue("noOfDays", days);
      }
    }
  }, [startDate, endDate, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      {/* Leave Type */}
      <SelectField
        label="Leave Type"
        placeholder="Choose leave type"
        value={watch("leaveType")}
        onChange={(val) => setValue("leaveType", val)}
        error={errors.leaveType?.message}
        options={[
          { value: "vacation", label: "Vacation" },
          { value: "sick", label: "Sick" },
          { value: "emergency", label: "Emergency" },
        ]}
      />

      {/* Dates */}
      <InputField
        label="From"
        type="date"
        {...register("startDate")}
        className="w-full border rounded px-3 py-2"
        error={errors.startDate && errors.startDate.message}
      />

      <InputField
        label="To"
        type="date"
        {...register("endDate")}
        className="w-full border rounded px-3 py-2"
        error={errors.endDate && errors.endDate.message}
      />

      {/* No. of Days */}
      <InputField
        label="No. of Days"
        type="number"
        {...register("noOfDays", { valueAsNumber: true })}
        className="w-full border rounded px-3 py-2 bg-gray-100"
        readOnly
        error={errors.noOfDays && errors.noOfDays.message}
      />

      {/* Reason */}
      <div>
        <label className="block mb-1 font-medium">Reason</label>
        <textarea
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
  leaveType: "",
  startDate: "",
  endDate: "",
  status: "Pending",
  noOfDays: 0,
  reason: "",
};

const leaveSchema = z
  .object({
    leaveType: z.string().min(1, "Leave type is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    noOfDays: z.number().min(1, "Number of days must be at least 1"),
    reason: z.string().min(5, "Reason must be at least 5 characters"),
    id:z.string(),
    userId:z.string()
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "Enddate can't be before start date",
    path: ["endDate"],
  });

type LeaveFormValues = z.infer<typeof leaveSchema>;
