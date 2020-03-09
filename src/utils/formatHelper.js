import dayjs from 'dayjs';

// date

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export function normalDate(time) {
  return dayjs(time).format('YYYY-MM-DD');
}

export function monthFirstDate(time) {
  return dayjs(time).format('MMM DD, YYYY');
}

export function monthFirstDateTime(time) {
  return dayjs(time).format('MMM DD HH:mm');
}

export function minimalDateTime(time) {
  return dayjs(time).format('HH:mm');
}

export function smartDate(time) {
  if (dayjs().diff(dayjs(time), 'day') >= 1) {
    return monthFirstDate(time);
  }

  return dayjs(time).fromNow();
}

export function formatIntradayDate(pointDate, pointTime) {
  return dayjs(`${pointDate} ${pointTime}`, 'YYYY-MM-DD HH:mm').unix();
}

// number

export function displayAsPercent(number) {
  return number && (number * 100).toFixed(2);
}

export function bigNumberFormat(number) {
  const billion = 1000000000;
  const million = 1000000;
  const thousand = 1000;
  if (number >= billion) {
    return (number / billion).toFixed(3) + 'B';
  } else if (number >= million) {
    return (number / million).toFixed(3) + 'M';
  } else if (number >= thousand) {
    return (number / thousand).toFixed(3) + 'K';
  } else {
    return number;
  }
}
