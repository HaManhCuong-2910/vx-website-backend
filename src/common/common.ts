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

export const MAX_FILE_SIZE = 500000; //500 KB

export enum EStatusAccount {
  ACTIVE = 'ACTIVE',
  LOCK = 'LOCK',
}

export const saltOrRounds = 10;

export const filterAccount = (user: any) => {
  return {
    id: `${user._id || user.id}`,
    status: user.status,
    roles: user.roles,
  };
};
