import { Info } from "lucide-react";

interface SideStatsProps {
  ledgerBalance?: number;
  totalPayout?: number;
  totalRevenue?: number;
  pendingPayout?: number;
}

export function SideStats({
  ledgerBalance = 0,
  totalPayout = 0,
  totalRevenue = 0,
  pendingPayout = 0,
}: SideStatsProps) {
  const stats = [
    { label: "Ledger Balance", value: ledgerBalance },
    { label: "Total Payout", value: totalPayout },
    { label: "Total Revenue", value: totalRevenue },
    { label: "Pending Payout", value: pendingPayout },
  ];

  return (
    <div className="space-y-8 pt-10">
      {stats.map((stat) => (
        <div key={stat.label} className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <Info size={16} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold">
            USD{" "}
            {stat.value.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h3>
        </div>
      ))}
    </div>
  );
}
