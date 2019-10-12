export const delay = (time = 2000) =>
  new Promise((resolve: Function) => setTimeout(() => resolve(), time))
