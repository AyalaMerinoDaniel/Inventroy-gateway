export function cleanObject(obj: any): any {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value === null || value === undefined || value === '') {
        delete obj[key];
      }
    }
  }
  return obj;
}

