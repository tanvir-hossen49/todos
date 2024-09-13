import { ChevronLeft, ChevronRight } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";

const Calendar = lazy(() => import('@/components/Calendar'));

const Home = () => {
  const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [initialWeek, setInitialWeek] = useState(0);
  const [countCurrentWeekFunCall, setCountCurrentWeekFunCall] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(0);
  
  useEffect(() => {
    updateCalendar();
  }, [currentMonth, currentYear, currentDate]);

  const updateCalendar = () => {
    const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDay();

    const prevDays = new Date(currentYear, currentMonth, 0).getDate() - firstDayOfMonth + 1;
    const nextDays = 7 - lastDayOfMonth - 1;

    const calendarDays = [];

    // Add Previous Month's Days reverse
    const prevMonthDays = [];
    for (let x = firstDayOfMonth; x > 0; x--) {
      prevMonthDays.push({
        day: prevDays + (x - 1),
        inCurrentMonth: false,
        monthName: MONTH_NAMES[currentMonth === 0 ? 11 : currentMonth - 1]
      });
    };
    calendarDays.push(...prevMonthDays.reverse());

    // Add Current Month's Days
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      calendarDays.push({
        day: i,
        inCurrentMonth: true,
        monthName: MONTH_NAMES[currentMonth]
      });
    };

    // Add Next Month's Days
    for (let j = 1; j <= nextDays; j++) {
      calendarDays.push({
        day: j,
        inCurrentMonth: false,
        monthName: MONTH_NAMES[currentMonth === 11 ? 0 : currentMonth + 1]
      });
    };

    setDaysInMonth(calendarDays);
    getCurrentWeek(calendarDays);
  }

  // Function to split days into blocks and manage month transitions
  const makeDaysBlock = (days) => {
    const blocks = [];
    const blockSize = days.length / 5;

    // Split the days array into blocks (weeks)
    for (let i = 0; i < days.length; i += blockSize) {
      blocks.push(days.slice(i, i + blockSize));
    }

    // Handle month transition at the end of the month
    if(currentWeek + 1 === 4) {
      const isTrue = blocks[4].every(obj => obj.inCurrentMonth === true);
      if(isTrue) {
        setCurrentMonth(prev => prev + 1)
        setCurrentWeek(0)
      }
    }
    return blocks;
    
  }
  
  // Function to determine the current week based on today's date
  const getCurrentWeek = (calendarDays) => {
    if (countCurrentWeekFunCall > 0 
      || currentDate.getMonth() !== currentMonth
      || calendarDays.length === 0) return;

    setCountCurrentWeekFunCall(prev => prev + 1);
    

    // Check if calendarDays is empty
    if (calendarDays.length === 0) return;

    // Split Days into Weeks (Blocks)
    const blocks = [];
    const blockSize = calendarDays.length / 5;

    for (let i = 0; i < calendarDays.length; i += blockSize) {
      blocks.push(calendarDays.slice(i, i + blockSize));
    }

    // Find the block (week) that contains today's date
    for (let i = 0; i < blocks.length; i++) {
      for (let j = 0; j < blocks[i].length; j++) {
        if (blocks[i][j].day === currentDate.getDate()) {
          setCurrentWeek(i);
          setInitialWeek(i);
          return; // Exit the inner loop if found
        }
      }
    }
  }

  // Function to get the days of the current week
  const getWeekDays = () => {
    const start = currentWeek * 7;
    const end = start + 7;
    return daysInMonth.slice(start, end);
  };

  // Function to handle moving to the next week
  const handleNextWeek = () => {
    if ((currentWeek + 1) * 7 < daysInMonth.length) {
      setCurrentWeek((prev) => prev + 1);
    } else {
      const blocks = makeDaysBlock(daysInMonth);
      const isEndOfYear = currentMonth === 11;
      const isEndOfMonth = blocks[4].every((obj) => obj.inCurrentMonth === true);
      
      if (isEndOfYear) {
        setCurrentMonth(0);
        setCurrentYear((prev) => prev + 1);
      } else {
        setCurrentMonth((prev) => prev + 1);
      }

      isEndOfMonth ? setCurrentWeek(0) : setCurrentWeek(1);
    }
  };

  // Function to handle moving to the previous week
  const handlePrevWeek = () => {
    if (currentWeek > 0) {
      setCurrentWeek((prev) => prev - 1);
    } else {
      const blocks = makeDaysBlock(daysInMonth);
      const isStartOfYear = currentMonth === 0;
      const isStartOfMonth = blocks[0].every((obj) => obj.inCurrentMonth === true);

      if (isStartOfYear) {
        setCurrentMonth(11);
        setCurrentYear((prev) => prev - 1);
      } else {
        setCurrentMonth((prev) => prev - 1);
      }

      isStartOfMonth ? setCurrentWeek(4) : setCurrentWeek(3);
    }
  };

  // Function to handle resetting the calendar to today
  const handleTodayButton = () => {
    setCurrentWeek(initialWeek);
    setCurrentMonth(currentDate.getMonth());
  };

  // Function to get the name of the month of first and last week
  const getMonthName = () => {
    if(daysInMonth.length === 0) return;

    const blocks = makeDaysBlock(daysInMonth);
    let uniqueMonths;

    // Handle first and last weeks of the month
    if(currentWeek === 0){
      const monthSet = new Set(blocks[0].map(item => item.monthName));
      uniqueMonths = Array.from(monthSet);
    } else if(currentWeek === 4) {
      const monthSet = new Set(blocks[4].map(item => item.monthName));
      uniqueMonths = Array.from(monthSet);
    } else{
      return;
    }
    
    // Determine the display text based on the number of unique months
    let displayText;

    if (uniqueMonths.length === 2) {
      displayText = `${uniqueMonths[0]} - ${uniqueMonths[1]}`;
    } else {
      displayText = uniqueMonths[0];
    }

    return displayText;
  };

  return (
    <div className="font-semibold mt-5">
      <div className="flex items-center justify-between">
        <span>
          {currentWeek === 0 || currentWeek === 4 ? getMonthName() : MONTH_NAMES[currentMonth] } {currentYear} 
        </span>
        <div className="flex items-center gap-3 select-none">
          <span>
            <ChevronLeft
              className="cursor-pointer"
              onClick={() => handlePrevWeek()}
            />
          </span>
          <span onClick={handleTodayButton} className="cursor-pointer">
            Today
          </span>
          <span>
            <ChevronRight
              className="cursor-pointer"
              onClick={() => handleNextWeek()}
            />
          </span>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Calendar
          weeksName={WEEKDAY_NAMES}
          currentMonth={currentMonth}
          currentDate={currentDate}
          currentYear={currentYear}
          getWeekDays={getWeekDays}
        />
      </Suspense>
    </div>
  );
};

export default Home;
