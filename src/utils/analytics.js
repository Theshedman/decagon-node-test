/**
 * Utility class for trips analytics
 * @module utils/analytics
 */


/**
 * This callback is for getting driver details.
 * @callback getDriver - api for fetching driver's details
 * @param { string } driverId - the id of the driver
 */

const normalizeAmount = require('./normalizeAmount.js');

class AnalyticsUtilities {
  /**
   * Group driver trips
   * @param { array } trips - all trips data
   * @return { Map }
   */
  static groupTripsByDriverId(trips) {
    const map = new Map();

    trips.forEach((trip) => {
      const key = trip['driverID'];
      const collection = map.get(key);

      if (!collection) {
        map.set(key, [trip]);
      } else {
        collection.push(trip);
      }
    });

    return map;
  }

  /**
   * Get total amount earned by driver
   * @private
   * @param { array } trips - all trips data
   * @return { number }
   */
  static getTotalAmountEarnedByDriverId(trips) {
    let totalAmountEarned = 0;

    for (let trip of trips) {
      const tripAmount = normalizeAmount(trip['billedAmount']);

      totalAmountEarned += tripAmount;
    }

    return totalAmountEarned;
  }

  /**
   * Get total number of cash trips
   * @param { array } trips - all trips
   * @param { boolean } isCashTrip - type of the trip to calculate
   * @return { number }
   * */
  static calculateNumberOfTrips(trips, isCashTrip) {
    // Default value when there's no trip data
    if (!trips || trips.length === 0) {
      return 0;
    }

    // Avoid modifying the input data directly by creating a copy
    const tripCopy = JSON.parse(JSON.stringify(trips));

    // Calculate the total number of the trip type
    return tripCopy.reduce((accumulator, currentValue) => {
      if (currentValue['isCash'] === isCashTrip) {
        accumulator += 1;
      }

      return accumulator;
    }, 0);
  }

  /**
   * Calculate bills for trips
   * @param { array } trips - all trips
   * @param { boolean } isCashTrip - type of the trip to calculate
   * whether cash or not
   * @return { number }
   */
  static calculateBills(trips, isCashTrip) {
    // Default value when there's no trip data
    if (!trips || trips.length === 0) {
      return 0;
    }

    // Avoid modifying the input data directly by creating a copy
    const tripCopy = JSON.parse(JSON.stringify(trips));

    // Calculate the total bills for trip type
    return tripCopy.reduce((accumulator, currentValue) => {
      if (currentValue['isCash'] === isCashTrip) {

        accumulator += normalizeAmount(currentValue['billedAmount']);
      }

      return accumulator;
    }, 0);
  }

  /**
   * Get most trips by driver
   * @async
   * @param { array } trips - all trips
   * @param { getDriver } getDriver - callback function to get driver details
   * @return { Promise<any> }
   */
  static async getDriverWithMostTrip(trips, getDriver) {
    try {
      // Track highest trip
      const maxTrip = {
        count: 0,
        driverID: '',
      };

      // Group trips by drivers id
      const groupedTrips = AnalyticsUtilities.groupTripsByDriverId(trips);

      // Check for driver with the highest trips
      for (let trip of trips) {
        const driverID = trip['driverID'];
        const driverTrips = groupedTrips.get(driverID);
        const noOfTrips = driverTrips.length;

        if (noOfTrips > maxTrip.count) {
          maxTrip.count = noOfTrips;
          maxTrip.driverID = driverID;
        }
      }

      // Get the driver details
      const driverDetails = await getDriver(maxTrip.driverID);

      // Calculate the total amount earned by the driver
      const totalAmountEarned = AnalyticsUtilities.getTotalAmountEarnedByDriverId(groupedTrips.get(maxTrip.driverID));

      // return result
      return {
        name: driverDetails.name,
        email: driverDetails.email,
        phone: driverDetails.phone,
        noOfTrips: maxTrip.count,
        totalAmountEarned,
      };
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   * Get details of the highest earning driver
   * @async
   * @param { array } trips - all trips
   * @param { getDriver } getDriver - callback function to get driver details
   * @return { Promise<any> }
   */
  static async getHighestEarningDriver(trips, getDriver) {
    try {
      // Track highest trip
      const result = {
        amount: 0,
        noOfTrips: 0,
        driverID: '',
        driverDetails: {},
      };

      // Group trips by drivers id
      const groupedTrips = AnalyticsUtilities.groupTripsByDriverId(trips);

      // Check for driver with the highest trips
      for (let trip of trips) {
        const driverID = trip['driverID'];
        const driverTrips = groupedTrips.get(driverID);
        const noOfTrips = driverTrips.length;

        for (let driverTrip of driverTrips) {

          // Calculate the total amount earned by the driver
          let totalAmountEarned = AnalyticsUtilities.getTotalAmountEarnedByDriverId(groupedTrips.get(driverID));

          if (totalAmountEarned > result.amount) {
            result.amount = totalAmountEarned;
            result.driverID = driverID;
            result.noOfTrips = noOfTrips;
          }
        }
      }

        // Get the driver details
        result.driverDetails = await getDriver(result.driverID);

      // return result
      return {
        name: result.driverDetails.name,
        email: result.driverDetails.email,
        phone: result.driverDetails.phone,
        noOfTrips: result.noOfTrips,
        totalAmountEarned: result.amount,
      };
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   * Get number of drivers with more than one vehicles
   * @param { array } trips - trips data
   * @param { getDriver } getDriver - callback function to get driver details
   * @return { Promise<any> }
   */
  static async getDriversWithMoreVehicles(trips, getDriver) {
    try {
      // Track highest trip
      let driversWithMoreVehicles = 0;

      // Driver trips
      const driverTrips = AnalyticsUtilities.groupTripsByDriverId(trips);

      // Check for driver with the highest trips
      for (let driverId of driverTrips.keys()) {
        const driverID = driverId;

        // Skip invalid uuid
        if (driverID === '7ba0dc7ba0dce0-1de3-4971-82e0-a10acce52dd2') {
          continue;
        }

        const driverDetails = await getDriver(driverID);
        const driverVehicles = driverDetails['vehicleID'];


        if (driverVehicles.length > 1) {
          driversWithMoreVehicles += 1;
        }
      }

      return driversWithMoreVehicles;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = AnalyticsUtilities;
