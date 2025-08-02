#!/usr/bin/env node
import minimist from "minimist";
import dayjs from "dayjs";

const args = minimist(process.argv.slice(2));

const now = dayjs();
const targetDate = now
  .set("year", args.y ?? now.year())
  .set("month", (args.m ?? now.month() + 1) - 1)
  .startOf("month");

const dayMonth = targetDate.daysInMonth();
const monthName = targetDate.format("M月 YYYY");
const dayOfWeek = "日 月 火 水 木 金 土";

function centerText(text, width = 20) {
  const padding = Math.max(0, width - text.length);
  const padLeft = Math.floor(padding / 2);
  const padRight = padding - padLeft;
  return `${" ".repeat(padLeft)}${text}${" ".repeat(padRight)}`;
}

console.log(centerText(`${monthName}`, 20));
console.log(dayOfWeek);

let calendarLine = [];

const firstDayOfWeek = targetDate.day();
calendarLine = Array(firstDayOfWeek).fill("  ");

for (let day = 1; day <= dayMonth; day++) {
  const padded = String(day).padStart(2, " ");
  calendarLine.push(padded);

  const dateObj = targetDate.set("date", day);
  const currentWeekday = dateObj.day();

  if (currentWeekday === 6) {
    console.log(calendarLine.join(" "));
    calendarLine = [];
  }
}
if (calendarLine.length > 0) {
  console.log(calendarLine.join(" "));
}
console.log(" ".repeat(20));
