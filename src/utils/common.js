export const numberWithSpaces = val => {
  let parts = val.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
};

export const cardNumber = val => {
  const symbols = val
    .substr(0, val.length - 4)
    .replace(/\B(?=(\*{4})+(?!\*))/g, ' ');
  const numbers = val.substr(12, 4);
  return [symbols, numbers].join(' ');
};
