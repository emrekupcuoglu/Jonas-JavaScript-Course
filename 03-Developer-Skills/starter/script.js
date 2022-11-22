// Remember, we're gonna use strict mode in all scripts now!
"use strict";

const temperatures = ["error", 3, -2, -6, -1, "error", 9, 13, 17, 15, 4, 9, 5];
const temperatures2 = ["error", 23, -4, -9, 11, 6, 19];

let maxTemp;
let minTemp;
let temps = [];
const calcTemperature = function (temps) {
  minTemp = 0;
  maxTemp = 0;

  for (let i = 0; i < temps.length; i++) {
    if (typeof temps[i] === "number") {
      maxTemp = temps[i];
      minTemp = temps[i];
      break;
    }
  }

  for (let i = 0; i < temps.length; i++) {
    if (typeof temps[i] !== "number") {
      continue;
    } else {
      if (maxTemp < temps[i]) {
        maxTemp = temps[i];
      }
      if (minTemp > temps[i]) {
        minTemp = temps[i];
      }
    }
  }
  return maxTemp - minTemp;
};

const amplitude = calcTemperature(temperatures);
console.log(minTemp, maxTemp, amplitude);

//MERGE TWO ARRAYS

const calcTemperatureNew = function (t1, t2) {
  minTemp = 0;
  maxTemp = 0;

  temps = t1.concat(t2);

  for (let i = 0; i < temps.length; i++) {
    if (typeof temps[i] === "number") {
      minTemp = temps[i];
      maxTemp = temps[i];
    }
    for (let i = 0; i < temps.length; i++) {
      if (typeof temps[i] !== "number") {
        continue;
      } else {
        if (maxTemp < temps[i]) {
          maxTemp = temps[i];
        }
        if (minTemp > temps[i]) {
          minTemp = temps[i];
        }
      }
    }
  }
  return maxTemp - minTemp;
};
const amplitude2 = calcTemperatureNew(temperatures, temperatures2);

console.log(minTemp, maxTemp, amplitude2);
