const convertToDateStr = (epoch) => {
  const dt = new Date(+epoch);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const year = dt.getFullYear();
  const month = months[dt.getMonth()];
  const date = dt.getDate();
  let hour = dt.getHours();
  const min = dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes();
  const ampm = hour < 12 ? "am" : "pm";
  if (hour > 12) hour -= 12;
  if (hour === 0) hour = 12;
  if (hour < 10) hour = "0" + hour;
  return date + " " + month + " " + year + ", " + hour + ":" + min + ampm;
}

export default convertToDateStr;