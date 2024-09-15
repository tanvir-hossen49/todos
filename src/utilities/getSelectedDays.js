import { format, addDays, parse } from 'date-fns';

export function getSelectedDays(startDate, endDate) {
    const formatDate = (date) => format(date, 'd-M-yyyy'); // Format the date as '15-9-2024'

    // Parse the start date using date-fns (expecting 'dd-MM-yyyy' format)
    const start = parse(startDate, 'd-M-yyyy', new Date());
    const result = [];

    // Loop through the number of days (endDate) and calculate each subsequent day
    for (let i = 0; i < endDate; i++) {
        const nextDate = addDays(start, i);
        result.push(formatDate(nextDate));
    }

    return result;
}
