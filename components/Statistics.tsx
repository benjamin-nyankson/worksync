import { ReactNode } from "react";

interface StatisticsProps {
  totalLeaves: number;
  approved: number;
  pending: number;
  rejected: number;
}
export function Statistics(props: StatisticsProps) {
  const { totalLeaves, approved, pending, rejected } = props;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <StatsCard>
        <h3 className="text-sm text-foreground/70">Rejected</h3>
        <p className="text-2xl font-bold text-red-500">{rejected}</p>
      </StatsCard>
    </section>
  );
}

export const StatsCard = ({ children }: { children: ReactNode }) => (
  <div className="p-6 rounded-xl bg-background border border-foreground/10">
    {children}
  </div>
);
