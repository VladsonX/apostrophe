const reformateDate = (date) => {
    const cleanedDateString = date.split(".")[0];

const newDate = new Date(cleanedDateString);

const formattedDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${newDate.getDate().toString().padStart(2, "0")} ${newDate
  .getHours()
  .toString()
  .padStart(2, "0")}:${newDate.getMinutes().toString().padStart(2, "0")}:${newDate
  .getSeconds()
  .toString()
  .padStart(2, "0")}`;
  return formattedDate;

}

export default reformateDate;