const fs = require("fs");

let entries;
const longitudeUpperBound = -73.925956;
const longitudeLowerBound = -73.964527;
const lattitudeUpperBound = 40.740684;
const lattitudeLowerBound = 40.717454;

try {
  const jsonString = fs.readFileSync('./NYC_COVID_Sidewalk_Density_WGS84_toSplit.json');
  entries = JSON.parse(jsonString);
} catch(err) {
  console.log(err)
  return
}

function lattitudeIsInGP (lat) {
  if (lat <= lattitudeUpperBound && lat >= lattitudeLowerBound) {
    return true
  } else {
    return false;
  }
}

function longitudeIsInGP (long) {
  if (long <= longitudeUpperBound && long >= longitudeLowerBound) {
    return true;
  } else {
    return false;
  }
}

function firstCoordinatePairIsInGP (feature) {
  let firstPairCoordinates = feature.geometry.coordinates[0][0];
  let lattitude = firstPairCoordinates[1];
  let longitude = firstPairCoordinates[0];

  if (lattitudeIsInGP(lattitude) && longitudeIsInGP(longitude)) {
    return true;
  }
  return false;
}

let greenpointFeatures = entries.features.filter(feature => {
  return firstCoordinatePairIsInGP(feature) === true;
});

let greenpointOnlyEntries = {
  "type": "FeatureCollection",
  "name": "NYC_COVID_Sidewalk_Density_WGS84",
  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } }
}

greenpointOnlyEntries.features = greenpointFeatures;

console.log(greenpointOnlyEntries.features[0]);


let newEntries = JSON.stringify(greenpointOnlyEntries);

fs.writeFile('./greenpointCovidSidewalkData.json', newEntries, err => {
  if (err) {
    console.log('Error writing file', err)
  } else {
    console.log('Successfully wrote file')
  }
});

