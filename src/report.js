const { getTrips, getDriver, getVehicle } = require('api');
const { Analytics, normalizeAmount } = require('./utils');

/**
 * This function should return the data for drivers in the specified format
 *
 * @returns {any} Driver report data
 */
async function driverReport() {
  try {
    const trips = await getTrips();
    const driverTrips = Analytics.groupTripsByDriverId(trips);
    const analyzedTripData = [];

    for (let driverId of driverTrips.keys()) {
      const vehicles = [];
      const tripAnalysis = {
        noOfCashTrips: 0,
        noOfNonCashTrips: 0,
        totalAmountEarned: 0,
        totalCashAmount: 0,
        totalNonCashAmount: 0,
        trips: [],
      };
      const driverData = {};

      const driverTrip = driverTrips.get(driverId);
      const noOfTrips = driverTrip.length;
      let driverDetails;

      try {
        driverDetails = await getDriver(driverId);

        driverData.fullName = driverDetails.name;
        driverData.id = driverId;
        driverData.phone = driverDetails.phone;

        for (let vehicleId of driverDetails['vehicleID']) {
          const vehicle = await getVehicle(vehicleId);
          vehicles.push({
            plate: vehicle.plate,
            manufacturer: vehicle.manufacturer,
          });
        }
      } catch (e) {
        driverData.id = driverId;
      }

      for (let trip of driverTrip) {
        if (trip['isCash']) {
          tripAnalysis.noOfCashTrips += 1;
          tripAnalysis.totalCashAmount += normalizeAmount(trip['billedAmount']);

        } else {
          tripAnalysis.noOfNonCashTrips += 1;
          tripAnalysis.totalNonCashAmount += normalizeAmount(trip['billedAmount']);
        }

        tripAnalysis.trips.push({
          user: trip.user.name,
          created: trip.created,
          pickup: trip.pickup.address,
          destination: trip.destination.address,
          billed: normalizeAmount(trip['billedAmount']),
          isCash: trip.isCash,
        });
      }

      const totalEarnedAmount = tripAnalysis.totalNonCashAmount + tripAnalysis.totalCashAmount;
      tripAnalysis.totalAmountEarned = normalizeAmount(totalEarnedAmount.toFixed(2));

      const totalCashAmount = tripAnalysis.totalCashAmount;
      const totalNonCashAmount = tripAnalysis.totalNonCashAmount;
      tripAnalysis.totalCashAmount = normalizeAmount(
        totalCashAmount.toFixed(2),
      );
      tripAnalysis.totalNonCashAmount = normalizeAmount(
        totalNonCashAmount.toFixed(2),
      );

      analyzedTripData.push({
        ...driverData,
        noOfTrips,
        vehicles,
        ...tripAnalysis,
      });
    }

    return analyzedTripData;
  } catch (e) {
    throw new Error(e.message);
  }
}

driverReport().then();

module.exports = driverReport;
