import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function formatDate(/** @type {string}*/ date) {
  return dayjs(dayjs(date)).from(Date.now());
}
