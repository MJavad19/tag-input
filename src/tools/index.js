export function convertSpaceToDash(value) {
  const splitedValue = value.split(" ");
  if (splitedValue.length > 1) {
    value = splitedValue[0];
    for (let i = 1; i < splitedValue.length; i++) {
      value += "-" + splitedValue[i];
    }
    return value;
  }
  return value;
}
