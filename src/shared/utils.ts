export const generateSMSVerificationCode = () =>
  (Math.floor(Math.random() * 10000) + 10000).toString().slice(1)

export const jsonStringify = <T>(obj: T) => JSON.stringify(obj).replace(/"([^(")"]+)":/g, '$1:')
