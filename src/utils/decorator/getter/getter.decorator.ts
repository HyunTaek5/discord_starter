import { capitalize } from 'lodash';

export const Getter = (target: any, key: string) => {
  const capitalizedKey = capitalize(key);
  const methodName = `get${capitalizedKey}`;
  Object.defineProperty(target, methodName, { value: () => target[key] });
};
