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
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [view, setView] = useState<"day" | "month" | "year">("day");

  const next = () => {
    if (view === "day") setCurrentDate(addMonths(currentDate, 1));
    if (view === "month") setCurrentDate(addMonths(currentDate, 12));
    if (view === "year") setCurrentDate(addMonths(currentDate, 120)); // 10 years
  };

  const prev = () => {
    if (view === "day") setCurrentDate(subMonths(currentDate, 1));
    if (view === "month") setCurrentDate(subMonths(currentDate, 12));
    if (view === "year") setCurrentDate(subMonths(currentDate, 120));
  };

  const handleHeaderClick = () => {
    if (view === "day") setView("month");
    if (view === "month") setView("year");
  };

  const renderHeader = () => {
    let label = "";
    if (view === "day") label = format(currentDate, "MMMM yyyy");
    if (view === "month") label = format(currentDate, "yyyy");
    if (view === "year") {
      const startYear = Math.floor(currentDate.getFullYear() / 10) * 10;
      label = `${startYear} - ${startYear + 9}`;
    }

    return (
      <div className="flex items-center justify-between mb-4 px-2">
        <button
          onClick={prev}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={20} className="text-gray-500" />
        </button>
        <button
          onClick={handleHeaderClick}
          className={`text-sm font-bold hover:bg-gray-50 px-2 py-1 rounded transition-colors ${
            view === "year" ? "cursor-default hover:bg-transparent" : ""
          }`}>
          {label}
        </button>
        <button
          onClick={next}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors">
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
    if (view === "year") {
      const currentYear = currentDate.getFullYear();
      const startYear = Math.floor(currentYear / 10) * 10;
      const years = Array.from({ length: 12 }, (_, i) => startYear - 1 + i);

      return (
        <div className="grid grid-cols-3 gap-2">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setFullYear(year);
                setCurrentDate(newDate);
                setView("month");
              }}
              className={`p-2 rounded-lg text-sm transition-colors ${
                year === new Date().getFullYear()
                  ? "bg-gray-100 font-bold"
                  : "hover:bg-gray-50"
              } ${
                selectedDate && selectedDate.getFullYear() === year
                  ? "bg-black text-white hover:bg-gray-800"
                  : ""
              }`}>
              {year}
            </button>
          ))}
        </div>
      );
    }

    if (view === "month") {
      const months = Array.from({ length: 12 }, (_, i) => {
        const d = new Date(currentDate);
        d.setMonth(i);
        return d;
      });

      return (
        <div className="grid grid-cols-3 gap-2">
          {months.map((month, idx) => (
            <button
              key={idx}
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setMonth(idx);
                setCurrentDate(newDate);
                setView("day");
              }}
              className={`p-2 rounded-lg text-sm transition-colors ${
                isSameMonth(month, new Date())
                  ? "bg-gray-100 font-bold"
                  : "hover:bg-gray-50"
              } ${
                selectedDate && isSameMonth(month, selectedDate)
                  ? "bg-black text-white hover:bg-gray-800"
                  : ""
              }`}>
              {format(month, "MMM")}
            </button>
          ))}
        </div>
      );
    }

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const daysInInterval = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    return (
      <>
        {renderDays()}
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
                  {format(dayItem, "d")}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div
      className={`bg-white p-4 rounded-xl shadow-lg border border-gray-100 ${className}`}>
      {renderHeader()}
      {renderCells()}
    </div>
  );
}
