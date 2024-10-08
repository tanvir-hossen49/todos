import useWeekDays from '@/hooks/useWeekDays';
import { goToToday, nextWeek, prevWeek } from '@/store/calendarSlice';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { useDispatch } from 'react-redux';

const WeekNavigator = () => {
  const dispatch = useDispatch();
  const weekDays = useWeekDays();

  const firstDay = weekDays[0];
  const lastDay = weekDays[6];

  const firstMonth = format(firstDay, 'MMMM');
  const lastMonth = format(lastDay, 'MMMM');
  const firstYear = format(firstDay, 'yyyy');
  const lastYear = format(lastDay, 'yyyy');

  let monthTitle = '';

  if (firstMonth === lastMonth && firstYear === lastYear) {
    monthTitle = `${firstMonth} ${firstYear}`;
  } else if (firstYear === lastYear) {
    monthTitle = `${firstMonth} - ${lastMonth} ${firstYear}`;
  } else {
    monthTitle = `${firstMonth} ${firstYear} - ${lastMonth} ${lastYear}`;
  }

  return (
      <div className="flex items-center justify-between my-4">
        <span>
          <h2>{monthTitle}</h2>
        </span>
        <div className="flex items-center gap-3 select-none">
          <span>
            <ChevronLeft
              className="cursor-pointer"
              onClick={() => dispatch(prevWeek())}
            />
          </span>
          <span
            className="cursor-pointer" 
            onClick={() => dispatch(goToToday())}
          >
            Today
          </span>
          <span>
            <ChevronRight
              className="cursor-pointer"
              onClick={() => dispatch(nextWeek())}
            />
          </span>
        </div>
    </div>
  );
};

export default WeekNavigator;