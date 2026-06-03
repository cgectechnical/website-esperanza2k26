export function convertTo12HourFormat(time24?: string) {
  if (!time24) return "";
  const [hoursStr, minutes = "00", seconds = "00"] = time24.split(":");
  let hours = parseInt(hoursStr, 10);
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  if (hours === 0) hours = 12;

  return `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
}
