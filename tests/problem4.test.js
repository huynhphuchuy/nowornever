const checkAvailability = require('../problems/problem4')

let arrivals1, departures1, arrivals2, departures2; 

beforeAll(() => {
    arrivals1 = [1, 3, 5, 6];
    departures1 = [2, 7, 10, 12];

    arrivals2 = [1, 3, 5];
    departures2 = [2, 6, 10];
});

test('Ensure checkAvailability return false due to no room available!', () => {
    expect(checkAvailability(arrivals1, departures1, 2)).toBe(false);
    expect(checkAvailability(arrivals2, departures2, 1)).toBe(false);
});
  
test('Ensure checkAvailability return true with available rooms!', () => {
    expect(checkAvailability(arrivals1, departures1, 3)).toBe(true);
    expect(checkAvailability(arrivals2, departures2, 2)).toBe(true);
});