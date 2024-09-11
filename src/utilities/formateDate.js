export const formateDate = (day, month, year) => {
    const date = new Date();

    if(!day) {
        day = date.getDate();
        month = date.getMonth();
        year = date.getFullYear();
    }

    return `${day}-${month}-${year}`;
}