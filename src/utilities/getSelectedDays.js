export function getSelectedDays(startDate, endDate) {
    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const start = new Date(startDate.split('-').reverse().join('-'));
    const result = [];

    for (let i = 0; i < endDate; i++) {
        const nextDate = new Date(start);
        nextDate.setDate(start.getDate() + i);
        result.push(formatDate(nextDate));
    }

    return result;
}