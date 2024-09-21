import { goToToday, nextWeek, prevWeek } from '@/store/calendarSlice';
import { addDays, format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const WeekNavigator = () => {
  const dispatch = useDispatch();
  
  const { startOfWeek } = useSelector((state) => state.calendar);
  const days = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek, i));

  const firstDay = days[0];
  const lastDay = days[6];

  const firstMonth = format(firstDay, 'MMMM');
  const lastMonth = format(lastDay, 'MMMM');
  const firstYear = format(firstDay, 'yyyy');
  const lastYear = format(lastDay, 'yyyy');

  // Logic to show the title like 'September - October 2024'
  const monthTitle = firstMonth === lastMonth
    ? `${firstMonth} ${firstYear}`
    : `${firstMonth} - ${lastMonth} ${firstYear === lastYear ? firstYear : `${firstYear} - ${lastYear}`}`;


    return (
        <div className="flex items-center justify-between">
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