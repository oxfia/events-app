// regex101.com
const GUESTS_REGEX = new RegExp(/^[0-9]$/);

// mm/dd/yyyy , m/d/yyyy
const DATE_REGEX = new RegExp(/^(\d{2}|\d)\/(\d{2}|\d)\/\d{4}$/);

// h:mm am/pm, hh:mm AM/PM
const TIME_REGEX = new RegExp(/^((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))$/);


// Convert date + time strings to a Date object.
// Date and time parameters should have already
// been validated with DATE_REGEX and TIME_REGEX.
function stringsToDate(dateStr: string, timeStr: string) {
  if (!DATE_REGEX.test(dateStr) || !TIME_REGEX.test(timeStr)) {
    console.error('Cannot convert date/time to Date object.');
    return;
  }
  const date = new Date(dateStr);
  const timeArr = timeStr.split(/[\s:]+/);
  let hour = parseInt(timeArr[0], 10);
  const min = parseInt(timeArr[1], 10);
  const pm = timeArr[2].toLowerCase() === 'pm';

  if (!pm && hour === 12) {
    hour = 0;
  }
  if (pm && hour < 12) {
    hour += 12;
  }
  date.setHours(hour);
  date.setMinutes(min);
  return date;
}


export { GUESTS_REGEX, DATE_REGEX, TIME_REGEX, stringsToDate };

