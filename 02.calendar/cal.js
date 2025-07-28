#!/usr/bin/env node
import minimist from "minimist";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData.js";
dayjs.extend(localeData);
dayjs.locale("ja");

const args = minimist(process.argv.slice(2));

const now = dayjs();

const currentDate = now;
const year = args.y ?? currentDate.year();
const month = args.m ?? currentDate.month() + 1;

const targetDate = dayjs(`${year}-${month}-01`);
const dayMonth = targetDate.daysInMonth();
const monthName = targetDate.format("M月 YYYY");
const dayOfWeek = "日 月 火 水 木 金 土";

console.log("      " + monthName + "        ");
console.log(dayOfWeek + "  ");

const firstDayOfWeek = targetDate.day();
let calendarLine = "";

calendarLine += "   ".repeat(firstDayOfWeek);

for (let day = 1; day <= dayMonth; day++) {
  const padded = String(day).padStart(2, " ");
  calendarLine += padded + " ";
  const currentWeekday = (firstDayOfWeek + day - 1) % 7;
  if (currentWeekday === 6) {
    console.log(calendarLine.trimEnd() + "  ");
    calendarLine = "";
  }
}
if (calendarLine !== "") {
  console.log(calendarLine.trimEnd().padEnd(22, " "));
}
console.log(" ".repeat(22));
