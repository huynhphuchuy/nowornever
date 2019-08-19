/**
 * Check hotel reservation availability.
 * @param {array} arrivals The arrival time array.
 * @param {array} departures The departure time array.
 * @param {number} k number of available rooms.
 * @return {boolean} The availability of hotel reservation.
**/
const checkAvailability = (arrivals, departures, k) => {
    let arrival = arrivals.shift(); // {1}
    for (let i = 0; i < departures.length; i++) { // {2}
        while (arrival < departures[i]) { // {3}
            arrival = arrivals.shift(); // {4}
            k -= 1;
            if (k < 0) return false;
        }
        k += 1;
    }
    return true;
}

module.exports = checkAvailability;