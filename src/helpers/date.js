module.exports = { formattedDate: (date) => {
        const verifyDate = date || Date.now();
        const d = new Date(verifyDate);
        const minute = `${d.getMinutes()}`.length === 1 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
        const hour = `${d.getHours()}`.length === 1 ? `0${d.getHours()}` : `${d.getHours()}`;
        const day = `${d.getDate()}`.length === 1 ? `0${d.getDate()}` : `${d.getDate()}`;
        const month = `${d.getMonth() + 1}`.length === 1 ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}`;
        return `${hour}:${minute} -- ${day}/${month}/${d.getFullYear()}`;
    }
 };