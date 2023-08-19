export const getNumber = (string) =>
string
  .split(" ")
  .map((item) => +item)
  .filter((item) => !isNaN(item));

// number acreage
export const getNumberAcreage = (string) => {
const numbers = string.match(/\d+/g);
return numbers.map((item) => +item).filter((item) => !item === false);
};