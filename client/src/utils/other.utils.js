const otherUtils = {
    formatDate: (date) => {
        const month = date.split("-")[1];
        const newDate = new Date(date).toString().split(" ");
        const dayOfWeek = newDate[0];
        const day = newDate[2];

        return dayOfWeek + " " + day + "/" + month;
    },
    formatPrice: (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }
}

export default otherUtils;