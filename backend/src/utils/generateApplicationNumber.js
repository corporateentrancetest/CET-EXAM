/**
 * Generate a unique CET application number.
 * Format: CET<year><6-digit time slice><3-digit random> e.g. CET2027481920734
 */
function generateApplicationNumber(year = 2027) {
  const timeSlice = Date.now().toString().slice(-6);
  const random = Math.floor(100 + Math.random() * 900);
  return `CET${year}${timeSlice}${random}`;
}

module.exports = generateApplicationNumber;
