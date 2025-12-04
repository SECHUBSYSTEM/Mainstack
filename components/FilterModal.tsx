import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { FilterState } from "@/types";
import { format } from "date-fns";
import { Calendar } from "./Calendar";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters: FilterState;
  onApply: (filters: FilterState) => void;
}

export function FilterModal({
  isOpen,
  onClose,
  currentFilters,
  onApply,
}: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>(currentFilters);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleDateRangeClick = (range: string) => {
    const now = new Date();
    let start = new Date();
    let end = new Date();

    if (range === "Today") {
      start = now;
      end = now;
    } else if (range === "Last 7 days") {
      start.setDate(now.getDate() - 7);
    } else if (range === "This month") {
      start.setDate(1);
    } else if (range === "Last 3 months") {
      start.setMonth(now.getMonth() - 3);
    }

    setFilters((prev) => ({
      ...prev,
      dateRange: range,
      startDate: start,
      endDate: end,
    }));
  };

  const handleTypeToggle = (type: string) => {
    setFilters((prev) => {
      const newTypes = prev.transactionType.includes(type)
        ? prev.transactionType.filter((t) => t !== type)
        : [...prev.transactionType, type];

      return { ...prev, transactionType: newTypes };
    });
  };

  const handleStatusToggle = (status: string) => {
    setFilters((prev) => {
      const newStatuses = prev.transactionStatus.includes(status)
        ? prev.transactionStatus.filter((s) => s !== status)
        : [...prev.transactionStatus, status];

      return { ...prev, transactionStatus: newStatuses };
    });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = {
      dateRange: "All Time",
      startDate: undefined,
      endDate: undefined,
      transactionType: [],
      transactionStatus: [],
    };
    setFilters(clearedFilters);
    onApply(clearedFilters);
    onClose();
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const isApplyDisabled =
    JSON.stringify(filters) === JSON.stringify(currentFilters);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.25, 
            ease: [0.4, 0, 0.2, 1] // Custom ease-out curve for smooth fade
          }}
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/20 backdrop-blur-sm"
          onClick={onClose}>
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              mass: 0.8,
              velocity: 0,
            }}
            className="h-[95vh] w-full max-w-md bg-white m-2 rounded-2xl shadow-2xl flex flex-col will-change-transform"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              transform: "translateZ(0)", // Force GPU acceleration
            }}>
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto hide-scrollbar p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Filter</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Date Range Presets */}
                <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                  {["Today", "Last 7 days", "This month", "Last 3 months"].map(
                    (label) => (
                      <button
                        key={label}
                        onClick={() => handleDateRangeClick(label)}
                        className={`whitespace-nowrap px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                          filters.dateRange === label
                            ? "bg-black text-white border-black"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}>
                        {label}
                      </button>
                    )
                  )}
                </div>

                {/* Date Range Inputs */}
                <div className="space-y-2">
                  <label className="font-bold">Date Range</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <div
                        onClick={() => toggleSection("startDate")}
                        className="bg-gray-50 p-3 rounded-xl text-sm font-medium flex justify-between items-center border border-transparent hover:border-gray-200 transition-colors cursor-pointer">
                        <span>
                          {filters.startDate
                            ? format(new Date(filters.startDate), "dd MMM yyyy")
                            : "Start Date"}
                        </span>
                        <ChevronDown size={16} className="text-gray-500" />
                      </div>
                      {activeSection === "startDate" && (
                        <div className="absolute top-full left-0 mt-2 z-20">
                          <Calendar
                            selectedDate={filters.startDate}
                            onDateSelect={(date) => {
                              setFilters((prev) => ({
                                ...prev,
                                startDate: date,
                              }));
                              setActiveSection(null);
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <div
                        onClick={() => toggleSection("endDate")}
                        className="bg-gray-50 p-3 rounded-xl text-sm font-medium flex justify-between items-center border border-transparent hover:border-gray-200 transition-colors cursor-pointer">
                        <span>
                          {filters.endDate
                            ? format(new Date(filters.endDate), "dd MMM yyyy")
                            : "End Date"}
                        </span>
                        <ChevronDown size={16} className="text-gray-500" />
                      </div>
                      {activeSection === "endDate" && (
                        <div className="absolute top-full right-0 mt-2 z-20">
                          <Calendar
                            selectedDate={filters.endDate}
                            onDateSelect={(date) => {
                              setFilters((prev) => ({
                                ...prev,
                                endDate: date,
                              }));
                              setActiveSection(null);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Transaction Type */}
                <div className="space-y-2">
                  <label className="font-bold">Transaction Type</label>
                  <div className="relative">
                    <button
                      onClick={() => toggleSection("type")}
                      className="w-full flex items-center justify-between bg-gray-50 p-4 rounded-xl text-left text-sm font-medium hover:bg-gray-100 transition-colors">
                      <span className="truncate pr-4">
                        {filters.transactionType.length > 0
                          ? filters.transactionType.join(", ")
                          : "Select Transaction Type"}
                      </span>
                      {activeSection === "type" ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                    {activeSection === "type" && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg p-4 z-10 space-y-3">
                        {[
                          "Store Transactions",
                          "Get Tipped",
                          "Withdrawals",
                          "Chargebacks",
                          "Cashbacks",
                          "Refer & Earn",
                        ].map((type) => (
                          <label
                            key={type}
                            className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={filters.transactionType.includes(type)}
                              onChange={() => handleTypeToggle(type)}
                              className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black accent-black"
                            />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Transaction Status */}
                <div className="space-y-2">
                  <label className="font-bold">Transaction Status</label>
                  <div className="relative">
                    <button
                      onClick={() => toggleSection("status")}
                      className="w-full flex items-center justify-between bg-gray-50 p-4 rounded-xl text-left text-sm font-medium hover:bg-gray-100 transition-colors">
                      <span className="truncate pr-4">
                        {filters.transactionStatus.length > 0
                          ? filters.transactionStatus.join(", ")
                          : "Select Transaction Status"}
                      </span>
                      {activeSection === "status" ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                    {activeSection === "status" && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg p-4 z-10 space-y-3">
                        {["successful", "pending", "failed"].map((status) => (
                          <label
                            key={status}
                            className="flex items-center gap-3 cursor-pointer capitalize">
                            <input
                              type="checkbox"
                              checked={filters.transactionStatus.includes(
                                status
                              )}
                              onChange={() => handleStatusToggle(status)}
                              className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black accent-black"
                            />
                            <span>{status}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Footer */}
            <div className="p-6 bg-white rounded-b-2xl">
              <div className="flex gap-4">
                <button
                  onClick={handleClear}
                  className="flex-1 py-3 rounded-full border cursor-pointer border-gray-200 font-medium hover:bg-gray-50 transition-colors">
                  Clear
                </button>
                <button
                  onClick={handleApply}
                  disabled={isApplyDisabled}
                  className={`flex-1 py-3 rounded-full cursor-pointer font-medium transition-colors ${
                    isApplyDisabled
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}>
                  Apply
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
