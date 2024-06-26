export function generateOTP(numberOfdigits = 4): string {
  // Declare a digits variable
  // which stores all digits
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < numberOfdigits; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
