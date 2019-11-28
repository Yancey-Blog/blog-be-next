export const generateSMSVerificationCode = () =>
  (Math.floor(Math.random() * 10000) + 10000).toString().slice(1)
