const dateUtils = {
    formatDate: (date) => {
        const month = date.split("-")[1];
        const newDate = new Date(date).toString().split(" ");
        const dayOfWeek = newDate[0];
        const day = newDate[2];

        return dayOfWeek + " " + day + "/" + month;
    }
}

export default dateUtils;