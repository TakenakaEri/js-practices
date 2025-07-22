import minimist from "minimist";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData.js";
dayjs.extend(localeData);
dayjs.locale("ja");

const args = minimist(process.argv.slice(2));

const now = dayjs();
const currentYear = now.year();
const currentMonth = now.month() + 1;

const year = args.y || currentYear;
const month = args.m || currentMonth;

const targetDate = dayjs(`${year}-${month}-01`);
const dayMonth = targetDate.daysInMonth();
const monthName = targetDate.format("M月 YYYY年");
const DayOfWeek = "日 月 火 水 木 金 土";

console.log(monthName.padStart(14, " "));
console.log(DayOfWeek);

const firstDayOfWeek = targetDate.day();
let calendarLine = "";

calendarLine += "   ".repeat(firstDayOfWeek);

for (let day = 1; day <= dayMonth; day++) {
  const padded = String(day).padStart(2, " ");
  calendarLine += padded + " ";
  const currentWeekday = (firstDayOfWeek + day - 1) % 7;
  if (currentWeekday === 6) {
    console.log(calendarLine.trimEnd());
    calendarLine = "";
  }
}
if (calendarLine !== "") {
  console.log(calendarLine.trimEnd());
}
