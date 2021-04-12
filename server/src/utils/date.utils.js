const allDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]


const allMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

const setHours = (hour) => {
    if( (hour - 12) > 0 ) {
        return  {
            hour : hour - 12,
            timePart : "PM"
        };
    }
    
    return {
        hour : hour,
        timePart : "AM",
    };
}


module.exports = {
    allDay,
    allMonth,
    setHours,
}