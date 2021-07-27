/**
 * Utility function for normalizing trips amount
 * @module utils/normalizeAmount
 */

/**
 * Normalize trip bills
 * @param { string } amount - trip amount
 * @return { number }
 */

function normalizeAmount(amount) {
  // Handle the edge case when the amount is not of type string
  if (typeof amount !== 'string') {
    amount = String(amount);
  }

  return Number(amount.split(',').join(''));
}

module.exports = normalizeAmount;
