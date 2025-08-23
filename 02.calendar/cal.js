#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";

dayjs.extend(isSameOrBefore);

const args = minimist(process.argv.slice(2));
const now = dayjs();
const startDate = dayjs()
  .year(args.y ?? now.year())
  .month((args.m ?? now.month() + 1) - 1)
  .date(1);

const monthHeader = startDate.format("M月 YYYY");
const dayOfWeekHeader = "日 月 火 水 木 金 土";

console.log(`      ${monthHeader}`);
console.log(dayOfWeekHeader);

let calendarLine = Array(startDate.day()).fill("  ");

const endDate = startDate.endOf("month");

for (
  let currentDate = startDate;
  currentDate.isSameOrBefore(endDate);
  currentDate = currentDate.add(1, "day")
) {
  const dayString = String(currentDate.date()).padStart(2, " ");
  calendarLine.push(dayString);

  if (currentDate.day() === 6 || currentDate.isSame(endDate, "day")) {
    console.log(calendarLine.join(" "));
    calendarLine = [];
  }
}
