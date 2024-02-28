// getCurrentDayAndTime.js
const getCurrentDayAndTime = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
  
    const currentDate = new Date();
    const currentDay = daysOfWeek[currentDate.getDay()];
  
    let hours = currentDate.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutes = currentDate.getMinutes();
  
    const formattedTime = `${currentDay}, ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
  
    return formattedTime;
  };
  
  export default getCurrentDayAndTime;
  