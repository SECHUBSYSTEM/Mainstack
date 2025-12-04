"use client";

import { useState } from "react";
import { format } from "date-fns";
import { WalletCard } from "@/components/WalletCard";
import { SideStats } from "@/components/SideStats";
import { RevenueChart } from "@/components/RevenueChart";
import { TransactionsList } from "@/components/TransactionsList";
import { FilterModal } from "@/components/FilterModal";

import { useWallet } from "@/hooks/useWallet";
import { useTransactions } from "@/hooks/useTransactions";
import { Transaction, FilterState } from "@/types";

export default function Home() {
  const { wallet } = useWallet();
  const { transactions, isLoading: isTransactionsLoading } = useTransactions();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    dateRange: "All Time",
    transactionType: [],
    transactionStatus: [],
  });

  const filterCount =
    (filters.dateRange !== "All Time" ? 1 : 0) +
    filters.transactionType.length +
    filters.transactionStatus.length;

  const dateRangeLabel =
    filters.dateRange === "All Time"
      ? "all time"
      : filters.dateRange.toLowerCase();

  const filteredTransactions =
    transactions?.filter((t: Transaction) => {
      // Filter by Date Range
      if (filters.startDate && filters.endDate) {
        const transactionDate = new Date(t.date);
        const start = new Date(filters.startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(filters.endDate);
        end.setHours(23, 59, 59, 999);

        if (transactionDate < start || transactionDate > end) {
          return false;
        }
      }

      // Filter by Transaction Type
      if (filters.transactionType.length > 0) {
        const type = t.type || "";
        const metadataType = t.metadata?.type || "";

        const matches = filters.transactionType.some((selectedType) => {
          switch (selectedType) {
            case "Store Transactions":
              return (
                metadataType === "digital_product" || metadataType === "webinar"
              );
            case "Get Tipped":
              return metadataType === "coffee";
            case "Withdrawals":
              return type === "withdrawal";
            case "Chargebacks":
              return type === "chargeback";
            case "Cashbacks":
              return type === "cashback";
            case "Refer & Earn":
              return type === "referral";
            default:
              return false;
          }
        });

        if (!matches) return false;
      }

      // Filter by Transaction Status
      if (filters.transactionStatus.length > 0) {
        if (!filters.transactionStatus.includes(t.status)) {
          return false;
        }
      }

      return true;
    }) || [];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          <WalletCard balance={wallet?.balance} />
          <RevenueChart
            data={
              filteredTransactions.length > 0
                ? filteredTransactions.map((t: Transaction) => ({
                    date: format(new Date(t.date), "MMM dd, yyyy"),
                    value: t.amount,
                  }))
                : [
                    {
                      date: filters.startDate
                        ? format(new Date(filters.startDate), "MMM dd, yyyy")
                        : format(new Date(), "MMM dd, yyyy"),
                      value: 0,
                    },
                    {
                      date: filters.endDate
                        ? format(new Date(filters.endDate), "MMM dd, yyyy")
                        : format(new Date(), "MMM dd, yyyy"),
                      value: 0,
                    },
                  ]
            }
          />
        </div>

        {/* Side Column */}
        <div className="lg:col-span-1">
          <SideStats
            ledgerBalance={wallet?.ledger_balance}
            totalPayout={wallet?.total_payout}
            totalRevenue={wallet?.total_revenue}
            pendingPayout={wallet?.pending_payout}
          />
        </div>
      </div>

      <div className="space-y-6">
        <TransactionsList
          transactions={filteredTransactions}
          isLoading={isTransactionsLoading}
          onFilterClick={() => setIsFilterOpen(true)}
          filterCount={filterCount}
          dateRangeLabel={dateRangeLabel}
        />
      </div>

      <FilterModal
        key={isFilterOpen ? "open" : "closed"}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        currentFilters={filters}
        onApply={setFilters}
      />
    </div>
  );
}
