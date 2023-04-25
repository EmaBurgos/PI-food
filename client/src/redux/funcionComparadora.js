export const ascendant = (a, b) => {
  if (a.toLowerCase() < b.toLowerCase()) {
    return -1;
  }
  if (a.toLowerCase() > b.toLowerCase()) {
    return 1;
  }
  return 0;
};
export const descendant = (a, b) => {
  if (a.toLowerCase() < b.toLowerCase()) {
    return 1;
  }
  if (a.toLowerCase() > b.toLowerCase()) {
    return -1;
  }
  return 0;
};
