import { AppError } from '../errors';

export const getSubSetByKeys = <T extends Record<string, any>, K extends Array<keyof T & string>>(
  superset: T,
  keys: K,
  throwIfMissingProps = false,
): Pick<T, K[number]> => {
  const subset: any = {};
  keys.forEach((key) => {
    if (superset[key]) {
      subset[key] = superset[key];
    } else if (throwIfMissingProps) {
      throw new AppError('GET_SUB_SET_BY_KEYS_MISSING_PROPERTIES', { key }, false, 'INTERNAL_SERVER_ERROR', {}, 500);
    }
  });
  return subset;
};
