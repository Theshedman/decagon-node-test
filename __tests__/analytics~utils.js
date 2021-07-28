const { Analytics } = require('../src/utils');
const trips = require('../fixtures/trips.json');
const groupedTrips = require('../fixtures/groupedTrips');

describe('analytics utils spec', () => {
  test('group trips by driverId', () => {
    return expect(Analytics.groupTripsByDriverId(trips)).toEqual(groupedTrips);
  });

  test('get total amount earned by driver id', () => {
    const driverID = 'd247da84-ffcb-4ca8-8459-f98c99b59822';
    const driverTrips = groupedTrips.get(driverID);

    return expect(Analytics.getTotalAmountEarnedByDriverId(driverTrips)).toEqual(4188.48);
  });

  test('calculate number of cash trips', () => {
    return expect(Analytics.calculateNumberOfTrips(trips, true)).toEqual(1);
  });

  test('calculate number of non cash trips', () => {
    return expect(Analytics.calculateNumberOfTrips(trips, false)).toEqual(2);
  });

  test('calculate number of cash bills', () => {
    return expect(Analytics.calculateBills(trips, true)).toEqual(1715.16);
  });

  test('calculate number of non cash bills', () => {
    return expect(Analytics.calculateBills(trips, false)).toEqual(3685.49);
  });

  test('calculate total bills', () => {
    const cashBill = Analytics.calculateBills(trips, true);
    const nonCashBill = Analytics.calculateBills(trips, false);
    const totalBill = cashBill + nonCashBill;

    return expect(totalBill).toEqual(5400.65);
  });
});
