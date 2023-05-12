export const getId = (urlStr: string) => urlStr?.split('/').reverse()[1] ?? '';
