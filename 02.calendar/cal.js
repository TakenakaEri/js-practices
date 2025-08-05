#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";

function centerText(text, width = 20) {
  const padding = Math.max(0, width - text.length);
  const padLeft = Math.floor(padding / 2);
  const padRight = padding - padLeft;
  return `${" ".repeat(padLeft)}${text}${" ".repeat(padRight)}`;
}

const args = minimist(process.argv.slice(2));

const now = dayjs();
const targetDate = now
  .set("year", args.y ?? now.year())
  .set("month", (args.m ?? now.month() + 1) - 1)
  .startOf("month");

const monthName = targetDate.format("M月 YYYY");
const dayOfWeek = "日 月 火 水 木 金 土";

console.log(centerText(`${monthName}`, 20));
console.log(dayOfWeek);

const firstDayOfWeek = targetDate.day();
let calendarLine = Array(firstDayOfWeek).fill("  ");

const endDate = targetDate.endOf("month");

for (
  let dateObj = targetDate;
  dateObj.isSame(endDate) || dateObj.isBefore(endDate);
  dateObj = dateObj.add(1, "day")
) {
  const padded = String(dateObj.date()).padStart(2, " ");
  calendarLine.push(padded);

  if (dateObj.day() === 6) {
    console.log(calendarLine.join(" "));
    calendarLine = [];
  }
}

if (calendarLine.length > 0) {
  console.log(calendarLine.join(" "));
}

console.log(" ".repeat(20));
