const groupedTrips = new Map();

groupedTrips.set('d247da84-ffcb-4ca8-8459-f98c99b59822', [
  {
    "tripID": "8aa40609-6b7d-4db1-a0de-2d508337b8b4",
    "driverID": "d247da84-ffcb-4ca8-8459-f98c99b59822",
    "isCash": true,
    "billedAmount": "1,715.16",
    "user": {
      "name": "Aurelia Rios",
      "gender": "female",
      "company": "EXERTA",
      "email": "aureliarios@exerta.com",
      "phone": "+234 808-375-2326"
    },
    "created": "2019-01-21T08:24:05+01:00",
    "pickup": {
      "address": "311 Woodbine Street, Catharine, Kentucky, 8240",
      "latitude": -7.99591,
      "longitude": 177.770392
    },
    "destination": {
      "address": "76 Cornelia Street, Tyro, Idaho, 8547",
      "latitude": 8.056252,
      "longitude": -103.758085
    }
  },
  {
    "tripID": "b7e6ce71-b311-4fd2-9a55-fe1d139771f6",
    "driverID": "d247da84-ffcb-4ca8-8459-f98c99b59822",
    "isCash": false,
    "billedAmount": "2,473.32",
    "user": {
      "name": "Weber Copeland",
      "gender": "male",
      "company": "CANDECOR",
      "email": "webercopeland@candecor.com",
      "phone": "+234 809-224-5533"
    },
    "created": "2019-03-23T11:15:23+01:00",
    "pickup": {
      "address": "934 Woodside Avenue, Boykin, North Carolina, 9777",
      "latitude": -12.698254,
      "longitude": 125.250806
    },
    "destination": {
      "address": "74 Hicks Street, Marbury, Virgin Islands, 4030",
      "latitude": -57.241625,
      "longitude": 76.858978
    }
  }
]);

groupedTrips.set('7ac0eabd-19b9-408f-a5bc-a2094361548d', [
  {
    "tripID": "5e6c6f5b-bc4c-40d8-a52a-308b12bbb426",
    "driverID": "7ac0eabd-19b9-408f-a5bc-a2094361548d",
    "isCash": false,
    "billedAmount": "1,212.17",
    "user": {
      "name": "Mcmahon Hester",
      "gender": "male",
      "company": "GEEKULAR",
      "email": "mcmahonhester@geekular.com",
      "phone": "+234 808-144-4628"
    },
    "created": "2019-04-11T05:46:12+01:00",
    "pickup": {
      "address": "930 Jackson Court, Tivoli, Missouri, 3260",
      "latitude": 77.508338,
      "longitude": -115.385046
    },
    "destination": {
      "address": "90 Saratoga Avenue, Carlos, Connecticut, 6548",
      "latitude": -50.42713,
      "longitude": -106.015292
    }
  }
]);

module.exports = groupedTrips;
