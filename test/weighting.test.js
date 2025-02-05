/* eslint-disable no-undef */
const weighting = require('../src/weighting');

const {
  extractDemographicsAndBehavioralData
} = weighting;

test('extract demographics and behavioral data', () => {
  const dataset = [
    {
      id: '541d25c9-9500-4265-8967-240f44ecf723',
      acceptedOffers: 49,
      canceledOffers: 92,
      averageReplyTime: 2598
    },
    {
      id: '41fd45bc-b166-444a-a69e-9d527b4aee48',
      acceptedOffers: 95,
      canceledOffers: 96,
      averageReplyTime: 1908
    },
    {
      id: '90592106-a0d9-4329-8159-af7ce4ba45ad',
      acceptedOffers: 69,
      canceledOffers: 24,
      averageReplyTime: 3452
    },
    {
      id: 'b483afb8-2ed7-4fd2-9cd6-c1fd7071f19f',
      acceptedOffers: 80,
      canceledOffers: 22,
      averageReplyTime: 2315
    },
    {
      id: '1ba1b882-6516-4e54-a1ef-453bb3137d02',
      acceptedOffers: 62,
      canceledOffers: 95,
      averageReplyTime: 3143
    },
    {
      id: 'ea97c92f-8605-4288-88b6-47da0984240d',
      acceptedOffers: 80,
      canceledOffers: 83,
      averageReplyTime: 3579
    },
    {
      id: '0f8b58a4-e9dd-456d-a8be-b92d67720661',
      acceptedOffers: 58,
      canceledOffers: 9,
      averageReplyTime: 1329
    }
  ];
  const result = extractDemographicsAndBehavioralData(dataset);
  const { acceptedOffersRange, canceledOffersRange } = result;

  // Validating accepted offers
  // there are these values: 50, 60, 70, 80, 100
  // should return 4 elements: 81 - 100 | 71 - 80 | 61 - 70 | 50 - 60
  expect(acceptedOffersRange.length).toBe(4);
  [100, 75, 50, 25].forEach((n, i) => {
    expect(acceptedOffersRange[i].percent).toBe(n);
  });

  // Validating canceled offers
  // should return: 10 - 20 | 21 - 80 | 81 - 90 | 91 - 100
  expect(canceledOffersRange.length).toBe(4);
  [100, 75, 50, 25].forEach((n, i) => {
    expect(canceledOffersRange[i].percent).toBe(n);
  });
});
