const { getTrips, getDriver } = require('api');
const { Analytics } = require('./utils');

/**
 * This function should return the trip data analysis
 *
 * @returns {any} Trip data analysis
 */
async function analysis() {
  try {
    const trips = await getTrips();
    const noOfCashTrips = Analytics.calculateNumberOfTrips(trips, true);
    const noOfNonCashTrips = Analytics.calculateNumberOfTrips(trips, false);
    const cashBilledTotal = Analytics.calculateBills(trips, true);
    const nonCashBilledTotal = Analytics.calculateBills(trips, false);
    const billedTotal = cashBilledTotal + nonCashBilledTotal;
    const noOfDriversWithMoreThanOneVehicle = await Analytics.getDriversWithMoreVehicles(trips, getDriver);
    const mostTripsByDriver = await Analytics.getDriverWithMostTrip(trips, getDriver);
    const highestEarningDriver = await Analytics.getHighestEarningDriver(trips, getDriver);


    return {
      noOfCashTrips,
      noOfNonCashTrips,
      billedTotal: Number(billedTotal.toFixed(2)),
      cashBilledTotal,
      nonCashBilledTotal: Number(nonCashBilledTotal.toFixed(2)),
      noOfDriversWithMoreThanOneVehicle,
      mostTripsByDriver,
      highestEarningDriver
    }
  } catch (e) {
      throw new Error(e.message);
  }
}

module.exports = analysis;
