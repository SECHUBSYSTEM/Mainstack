import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarProps {
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
  className?: string;
}

export function Calendar({
  selectedDate,
  onDateSelect,
  className = "",
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-4 px-2">
        <button
          onClick={prevMonth}
          className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft size={20} className="text-gray-500" />
        </button>
        <span className="text-sm font-bold">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button
          onClick={nextMonth}
          className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronRight size={20} className="text-gray-500" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-400 py-1">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    const daysInInterval = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    return (
      <div className="grid grid-cols-7 gap-y-2">
        {daysInInterval.map((dayItem, idx) => {
          const isSelected = selectedDate
            ? isSameDay(dayItem, selectedDate)
            : false;
          const isCurrentMonth = isSameMonth(dayItem, monthStart);

          return (
            <div
              key={idx}
              className={`flex justify-center items-center cursor-pointer`}
              onClick={() => onDateSelect(dayItem)}>
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors ${
                  !isCurrentMonth
                    ? "text-gray-300"
                    : isSelected
                    ? "bg-black text-white font-bold"
                    : isToday(dayItem)
                    ? "bg-gray-100 text-black font-bold"
                    : "text-black hover:bg-gray-50"
                }`}>
                {format(dayItem, dateFormat)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={`bg-white p-4 rounded-xl shadow-lg border border-gray-100 ${className}`}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
