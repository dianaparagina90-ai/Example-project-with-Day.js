import dayjs, { type Dayjs } from "dayjs";
import { useState } from "react";
import "dayjs/locale/sv";

dayjs.locale("sv");

const Calender = () => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");

  const firstDay = startOfMonth.day();

  const emptyDays = firstDay === 0 ? 6 : firstDay - 1;

  const daysInMonth = endOfMonth.date();

  const days: (Dayjs | null)[] = [];

  //Tomma dagar innan månadens första dag
  for (let i = 0; i < emptyDays; i++) {
    days.push(null);
  }

  //Lägg månadens dagar
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(currentMonth.date(i));
  }

  const previousMonth = () => {
    setCurrentMonth((month) => month.subtract(1, "month"));
  };

  const nextMonth = () => {
    setCurrentMonth((month) => month.add(1, "month"));
  };

  return (
    <div className="calendar">
      <header className="calendar-header">
        <button className="previous" onClick={previousMonth}>
          Previous
        </button>
        <h2>{currentMonth.format("MMMM YYYY")}</h2>
        <button className="next" onClick={nextMonth}>
          Next
        </button>
      </header>
      <div className="weekdays">
        <span>Mån</span>
        <span>Tis</span>
        <span>Ons</span>
        <span>Tor</span>
        <span>Fre</span>
        <span>Lör</span>
        <span>Sön</span>
      </div>
      <div className="days">
        {days.map((day, index) => (
          <div key={index} className="day">
            {day?.date()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calender;
