import { parseISO, format } from "date-fns";

export function formatDate(dateString) {
  const date = parseISO(dateString);
  return format(date, "yyyy.MM.dd");
}
