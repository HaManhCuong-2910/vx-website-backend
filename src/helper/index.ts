export const searchString = (value: string) => {
  return { $regex: value, $options: 'i' };
};
