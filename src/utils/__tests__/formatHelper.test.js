import dayjs from 'dayjs';
import {
  normalDate,
  monthFirstDate,
  monthFirstDateTime,
  minimalDateTime,
  smartDate,
  formatIntradayDate,
  displayAsPercent,
  bigNumberFormat,
} from '../formatHelper';

const timeForTest = 1584190397000;

it('normalDate formats the date correctly', () => {
  expect(normalDate(timeForTest)).toBe('2020-03-14');
});

it('monthFirstDate formats the date correctly', () => {
  expect(monthFirstDate(timeForTest)).toBe('Mar 14, 2020');
});

it('monthFirstDateTime formats the date correctly', () => {
  expect(monthFirstDateTime(timeForTest)).toBe('Mar 14 20:53');
});

it('minimalDateTime formats the date correctly', () => {
  expect(minimalDateTime(timeForTest)).toBe('20:53');
});

it('smartDate formats the date correctly', () => {
  const TimeOfAnHourEarlier = dayjs().subtract('1', 'hour');

  expect(smartDate(timeForTest)).toBe('Mar 14, 2020');
  expect(smartDate(TimeOfAnHourEarlier)).toBe('an hour ago');
});

it('formatIntradayDate formats the date correctly', () => {
  const dateForTest = '2020-03-02';
  const minuteForTest = '08:50';
  expect(formatIntradayDate(dateForTest, minuteForTest)).toBe(1583110200000);
});

it('displayAsPercent format number correctly', () => {
  expect(displayAsPercent(-0.04175)).toBe('-4.17');
});

it('bigNumberFormat format number correctly', () => {
  expect(bigNumberFormat(19342947272)).toBe('19.343B');
  expect(bigNumberFormat(237725954)).toBe('237.726M');
  expect(bigNumberFormat(217073)).toBe('217.073K');
  expect(bigNumberFormat(573)).toBe('573');
});
