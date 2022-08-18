/** Date -> DD.MM.YYYY */
import { getMonth } from 'src/utils/get-month';

const prettyDate = (date: Date): string => {
  return date.toLocaleString().slice(0, 10);
};

/** return in format "DD.MM.YYYY" */
const getToday = () => {
  const todayDate = new Date();

  return prettyDate(todayDate);
};

/** return in format "DD.MM.YYYY" */
const getYesterday = () => {
  const todayDate = new Date();
  const previous = new Date(todayDate.getTime());
  previous.setDate(todayDate.getDate() - 1);

  return prettyDate(previous);
};

/** format dateStr: YYYY-MM-DDTHH:mm:ss+00:00 */
export const getRelativeDate = (dateStr: string) => {
  const date = new Date(dateStr);

  if (getToday() === prettyDate(date)) {
    return 'Сегодня';
  }

  if (getYesterday() === prettyDate(date)) {
    return 'Вчера';
  }

  const [day, month, year] = prettyDate(date).split('.');

  // Если год текущий
  if (getToday().slice(6) === year) {
    return day + ' ' + getMonth(Number(month) - 1);
  }

  return day + ' ' + getMonth(Number(month) - 1) + ' ' + year;
};
