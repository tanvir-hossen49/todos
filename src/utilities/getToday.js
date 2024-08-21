export const getToday = (day, month, year) => {
    const date = new Date();

    if(!day) {
        day = date.getDate();
        month = date.getMonth() + 1;
        year = date.getFullYear();
    }

    return `${day}-${month}-${year}`;
}