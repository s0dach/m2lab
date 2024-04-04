export const formatDate = (date) => {
    const day = String(new Date(date).getDate()).padStart(2, '0');
    const month = String(new Date(date).getMonth() + 1).padStart(2, '0');
    const year = new Date(date).getFullYear();

    const hours = String(new Date(date).getHours()).padStart(2, '0');
    const minutes = String(new Date(date).getMinutes()).padStart(2, '0');
    const seconds = String(new Date(date).getSeconds()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}