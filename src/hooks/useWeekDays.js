import { useMemo } from 'react';
import { addDays } from 'date-fns';
import { useSelector } from 'react-redux';

const useWeekDays = () => {
  const { startOfWeek } = useSelector((state) => state.calendar);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(startOfWeek, i));
  }, [startOfWeek]);

  return weekDays;
};

export default useWeekDays;
