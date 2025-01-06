const convertPublishedDate = (timestamp) => {

    const date = new Date(timestamp);

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekday = weekdays[date.getDay()];

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const month = months[date.getMonth()];

    const day = date.getDate();
    const year = date.getFullYear();

    return `${formattedHours}:${minutes} ${period}, ${weekday} ${month} ${day}, ${year}`;
};