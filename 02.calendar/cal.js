#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";

dayjs.extend(isSameOrBefore);

const args = minimist(process.argv.slice(2));
const now = dayjs();

const year = args.y ?? now.year();
const month = args.m ?? now.month() + 1;

const monthHeader = `${month}月 ${year}`;
const dayOfWeekHeader = "日 月 火 水 木 金 土";

console.log(`      ${monthHeader}`);
console.log(dayOfWeekHeader);

const startDate = dayjs(new Date(year, month - 1, 1));
let calendarLine = Array(startDate.day()).fill("  ");
const endDate = startDate.endOf("month");

for (
  let currentDate = startDate;
  currentDate.isSameOrBefore(endDate, "day");
  currentDate = currentDate.add(1, "day")
) {
  const dayString = String(currentDate.date()).padStart(2, " ");
  calendarLine.push(dayString);

  if (currentDate.day() === 6 || currentDate.isSame(endDate, "day")) {
    console.log(calendarLine.join(" "));
    calendarLine = [];
  }
}
