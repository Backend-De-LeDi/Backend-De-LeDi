export const separator: () => string = () => {
  let str = "";
  for (let i = 0; i < 100; i++) {
    str += "-";
  }
  return str;
};
