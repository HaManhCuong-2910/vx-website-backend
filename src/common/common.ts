import { ValidateIf, ValidationOptions } from 'class-validator';

export const formatNumberMoney = (value: number | string) => {
  let valueNumber = value;
  if (typeof value !== 'string') {
    valueNumber = Number(value);
  }
  const formatter = new Intl.NumberFormat('vi-VN');
  return formatter.format(valueNumber as number).split(',')[0];
};

export const randomNumberCustomLength = (length: number) => {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1),
  );
};

export const MAX_FILE_SIZE = 300000; //300 KB
