/** Generate a numeric OTP of the given length (default 6). OTP-ready helper. */
function generateOTP(length = 6) {
  let otp = "";
  for (let i = 0; i < length; i += 1) {
    otp += Math.floor(Math.random() * 10).toString();
  }
  return otp;
}

module.exports = generateOTP;
