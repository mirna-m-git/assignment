const toCamelCase = (str: string) => {
  return str
    .replace(/_([a-z])/g, (match, group1) => group1.toUpperCase())
    .replace(/^[A-Z]/, (match) => match.toLowerCase());
};

export const mapKeysToCamelCase = (json: any): any => {
  console.log(json);
  if (!json) {
    return json;
  }
  const returnObject: any = {};
  Object.keys(json).forEach(
    (key) => {
      returnObject[toCamelCase(key)] = json[key];
    }
  );
  return returnObject;
};
