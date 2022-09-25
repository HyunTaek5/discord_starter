import { capitalize } from 'lodash';

export const Setter = (target: any, key: string) => {
  const capitalizedKey = capitalize(key);
  const methodName = `set${capitalizedKey}`;
  Object.defineProperty(target, methodName, {
    value: (newValue: any) => {
      target[key] = newValue;
    },
  });
};
