export const urlValidate = (value) => {
  const urlRegexp = /https?/;
  return !urlRegexp.test(value);
};
