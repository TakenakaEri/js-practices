#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";

dayjs.extend(isSameOrBefore);

const args = minimist(process.argv.slice(2));

const now = dayjs();
const baseMonth = now
  .set("year", args.y ?? now.year())
  .set("month", (args.m ?? now.month() + 1) - 1)
  .startOf("month");

const monthHeader = baseMonth.format("M月 YYYY");
const dayOfWeekHeader = "日 月 火 水 木 金 土";

console.log(`      ${monthHeader}`);
console.log(dayOfWeekHeader);

const startDayIndex = baseMonth.day();
let calendarLine = Array(startDayIndex).fill("  ");

const endDate = baseMonth.endOf("month");

for (
  let currentDate = baseMonth;
  currentDate.isSameOrBefore(endDate);
  currentDate = currentDate.add(1, "day")
) {
  const dayString = String(currentDate.date()).padStart(2, " ");
  calendarLine.push(dayString);

  if (currentDate.day() === 6) {
    console.log(calendarLine.join(" "));
    calendarLine = [];
  }
}

if (calendarLine.length > 0) {
  console.log(calendarLine.join(" "));
}
