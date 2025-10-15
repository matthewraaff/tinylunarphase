// Minimal lunar phase calculator.
// Inspired by https://jasonsturges.medium.com/a5219acbfe6e
// Moon age is calculated using methods from Astronomical Algorithms (Jean Meeus)
// License: BSD 3-Clause - Matthew Raaff
// Pull requests welcome :)

const lunarMonth = 29.530588853;
const phasesObject = {
  0: {
      text: 'New Moon',
      emoji: '🌑',
  },
  1: {
      text: 'Waxing Crescent',
      emoji: '🌒'
  },
  2: {
      text: 'First Quarter',
      emoji: '🌓'
  },
  3: {
      text: 'Waxing Gibbous',
      emoji: '🌔'
  },
  4: {
      text: 'Full Moon',
      emoji: '🌕'
  },
  5: {
      text: 'Waning Gibbous',
      emoji: '🌖'
  },
  6: {
      text: 'Last Quarter',
      emoji: '🌗'
  },
  7: {
      text: 'Waning Crescent',
      emoji: '🌘'
  }
};

const ASTRONOMICAL_CONSTS = {
  // J2000.0 epoch (2000-01-01 12:00:00 UT)
  EPOCH: 2451545.0,
  
  // Moon's mean elongation parameters
  ELONGATION_START: 297.85036,
  ELONGATION_SPEED: 445.26711148,
  
  // Moon's mean anomaly parameters
  ANOMALY_START: 134.9634,
  ANOMALY_SPEED: 13.064993,
  
  // Correction term coefficients (in degrees)
  CORRECTION_C1: 6.289,
  CORRECTION_C2: -1.274,
  CORRECTION_C3: 0.658,
};

/**
 * Get the converted julian date from a date object.
 * @param {Date} date  The date object to convert.
 * @returns {number}   The julian date.
 */
function getJulianDate(date) {
  return (date.getTime() / 86400000) + 2440587.5;
}

/**
 * Get the age of the moon.
 * @returns {number}   The age of the moon.
 */
function ageOfMoon(date) {
  const jd = getJulianDate(date);

  // Days since J2000.0 epoch
  const daysSinceEpoch = jd - ASTRONOMICAL_CONSTS.EPOCH;

  /*
  the moon's mean elongation from the sun. this is the primary angle that determines
  the phase of the moon, where 0 degrees is new and 180 is full.
  */
  const meanElongation = (ASTRONOMICAL_CONSTS.ELONGATION_START + ASTRONOMICAL_CONSTS.ELONGATION_SPEED * daysSinceEpoch) % 360;
  const moonMeanAnomaly = (ASTRONOMICAL_CONSTS.ANOMALY_START + ASTRONOMICAL_CONSTS.ANOMALY_SPEED * daysSinceEpoch) % 360;

  // we must convert to rad for the trig functions 
  const meanElongationRad = meanElongation * Math.PI / 180;
  const moonMeanAnomalyRad = moonMeanAnomaly * Math.PI / 180;

  // add perturbations to the mean elongation to get the real elongation.
  // this accounts for the gravitional effects of the sun and moon's orbit.
  const elongationCorrectionDeg =
    ASTRONOMICAL_CONSTS.CORRECTION_C1 * Math.sin(moonMeanAnomalyRad) +
    ASTRONOMICAL_CONSTS.CORRECTION_C2 * Math.sin(2 * meanElongationRad - moonMeanAnomalyRad) +
    ASTRONOMICAL_CONSTS.CORRECTION_C3 * Math.sin(2 * meanElongationRad);

  const trueElongationDeg = meanElongation + elongationCorrectionDeg;

  // make the final result & normalise to a fraction from 0 to 1.
  let phaseFraction = (trueElongationDeg / 360) % 1;
  if (phaseFraction < 0) {
      phaseFraction += 1;
  }

  return phaseFraction * lunarMonth;
}

/**
 * Get the moon phase.
 * @param {Date} date  The date object to get the moon phase for.
 * @returns {object}   The moon phase in the Object/dict. (Pythonic word spotted :siren:)
 */
function getMoonPhase (date = new Date()) {
  const phase = Math.floor((ageOfMoon(date) / lunarMonth) * 8);
  return phasesObject[phase] || "Oops";
};

