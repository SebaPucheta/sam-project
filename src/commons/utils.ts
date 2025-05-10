export const cleanObject = (obj: any, allowedKeys: string[]): Partial<any> =>
  Object.entries(obj)
    .filter(([key, value]) => allowedKeys.includes(key) && value != null && value !== '')
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as any);