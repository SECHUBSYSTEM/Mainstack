import { Transaction } from "@/types";
import { ArrowDownLeft, ArrowUpRight, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TransactionsListProps {
  transactions: Transaction[];
  isLoading?: boolean;
  onFilterClick: () => void;
  filterCount: number;
  dateRangeLabel: string;
}

export function TransactionsList({
  transactions,
  isLoading,
  onFilterClick,
  filterCount,
  dateRangeLabel,
}: TransactionsListProps) {
  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading transactions...
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="p-16 text-center flex flex-col items-center justify-center space-y-4">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect
            width="48"
            height="48"
            rx="16"
            fill="url(#paint0_linear_21967_444)"
          />
          <mask
            id="mask0_21967_444"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="12"
            y="12"
            width="24"
            height="24">
            <rect x="12" y="12" width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_21967_444)">
            <path
              d="M18 33C17.4333 33 16.9583 32.8083 16.575 32.425C16.1917 32.0417 16 31.5667 16 31V29H19V15.375L20.275 16.275L21.575 15.375L22.875 16.275L24.2 15.375L25.5 16.275L26.8 15.375L28.125 16.275L29.425 15.375L30.725 16.275L32 15.375V31C32 31.5667 31.8083 32.0417 31.425 32.425C31.0417 32.8083 30.5667 33 30 33H18ZM30 32C30.2833 32 30.5207 31.904 30.712 31.712C30.904 31.5207 31 31.2833 31 31V17H20V29H29V31C29 31.2833 29.096 31.5207 29.288 31.712C29.4793 31.904 29.7167 32 30 32ZM21.375 20.5V19.5H26.725V20.5H21.375ZM21.375 23.5V22.5H26.725V23.5H21.375ZM28.875 20.775C28.675 20.775 28.5 20.6957 28.35 20.537C28.2 20.379 28.125 20.2 28.125 20C28.125 19.8 28.2 19.6207 28.35 19.462C28.5 19.304 28.675 19.225 28.875 19.225C29.0917 19.225 29.275 19.304 29.425 19.462C29.575 19.6207 29.65 19.8 29.65 20C29.65 20.2 29.575 20.379 29.425 20.537C29.275 20.6957 29.0917 20.775 28.875 20.775ZM28.875 23.775C28.675 23.775 28.5 23.6957 28.35 23.537C28.2 23.379 28.125 23.2 28.125 23C28.125 22.8 28.2 22.6207 28.35 22.462C28.5 22.304 28.675 22.225 28.875 22.225C29.0917 22.225 29.275 22.304 29.425 22.462C29.575 22.6207 29.65 22.8 29.65 23C29.65 23.2 29.575 23.379 29.425 23.537C29.275 23.6957 29.0917 23.775 28.875 23.775Z"
              fill="url(#paint1_linear_21967_444)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_21967_444"
              x1="1.5"
              y1="0.314453"
              x2="48"
              y2="46.8145"
              gradientUnits="userSpaceOnUse">
              <stop stopColor="#DBDEE6" />
              <stop offset="1" stopColor="#F6F7F9" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_21967_444"
              x1="16.8"
              y1="15.375"
              x2="32.2687"
              y2="31.5158"
              gradientUnits="userSpaceOnUse">
              <stop stopColor="#5C6670" />
              <stop offset="1" stopColor="#131316" />
            </linearGradient>
          </defs>
        </svg>

        <h3 className="text-xl font-bold">
          No matching transaction found for the selected filter
        </h3>
        <p className="text-gray-500 max-w-md">
          Change your filters to see more results, or add a new product.
        </p>
        <button
          onClick={onFilterClick}
          className="bg-gray-100 text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors">
          Clear Filter
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="">
          <h3 className="text-2xl font-bold">
            {transactions.length} Transactions
          </h3>
          <p className="text-gray-500">
            Your transactions for {dateRangeLabel}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onFilterClick}
            className="flex items-center gap-2 cursor-pointer bg-gray-100 px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
            Filter
            {filterCount > 0 && (
              <span className="w-5 h-5 bg-black text-white rounded-full text-xs flex items-center justify-center">
                {filterCount}
              </span>
            )}
            <ChevronDown size={20} />
          </button>
          <button className="flex items-center gap-2 cursor-pointer bg-gray-100 px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
            Export list
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.83333 8.8125L2.875 5.875L3.47917 5.27083L5.41667 7.20833V0L6.25 0V7.20833L8.1875 5.27083L8.79167 5.875L5.83333 8.8125ZM1.35417 11.9583C0.965278 11.9583 0.6425 11.83 0.385833 11.5733C0.128611 11.3161 0 10.9931 0 10.6042L0 8.625H0.833333V10.6042C0.833333 10.7431 0.885556 10.8644 0.99 10.9683C1.09389 11.0728 1.21528 11.125 1.35417 11.125H10.3125C10.4514 11.125 10.5728 11.0728 10.6767 10.9683C10.7811 10.8644 10.8333 10.7431 10.8333 10.6042V8.625H11.6667V10.6042C11.6667 10.9931 11.5383 11.3161 11.2817 11.5733C11.0244 11.83 10.7014 11.9583 10.3125 11.9583H1.35417Z"
                fill="#131316"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction, index) => {
          const isWithdrawal = transaction.type === "withdrawal";
          const Icon = isWithdrawal ? ArrowUpRight : ArrowDownLeft;
          const iconColor = isWithdrawal ? "text-red-500" : "text-green-500";
          const iconBg = isWithdrawal ? "bg-red-50" : "bg-green-50";

          return (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    iconBg,
                    iconColor
                  )}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {transaction.metadata?.product_name ||
                      transaction.type ||
                      "Transaction"}
                  </p>
                  <p
                    className={`text-sm ${
                      isWithdrawal ? "text-[#0EA163]" : "text-gray-500"
                    }`}>
                    {transaction.metadata?.name || transaction.status}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">
                  USD {transaction.amount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(transaction.date), "MMM dd, yyyy")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
