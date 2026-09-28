/**
 * Email service — placeholder-ready.
 * In v1 messages are logged to the console. Swap in a real provider (Resend/SES)
 * inside these functions without touching controllers.
 */

async function sendEmail({ to, subject, text }) {
  console.log(`[email] to=${to} | subject="${subject}"\n${text}`);
  return { queued: true };
}

async function sendOTP({ to, otp }) {
  return sendEmail({ to, subject: "Your CET verification code", text: `Your OTP is ${otp}` });
}

async function sendApplicationConfirmation({ to, applicationNumber }) {
  return sendEmail({
    to,
    subject: "CET 2027 — Application received",
    text: `Your application ${applicationNumber} has been submitted successfully.`,
  });
}

module.exports = { sendEmail, sendOTP, sendApplicationConfirmation };
