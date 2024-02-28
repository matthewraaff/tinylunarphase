// Minimal lunar phase calculator.
// Inspired by https://jasonsturges.medium.com/a5219acbfe6e
// & https://www.astrogreg.com/snippets/moonage.html
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

/**
 * Get the converted julian date from a date object.
 * @param {Date} date  The date object to convert.
 * @returns {number}   The julian date.
 */
const getJulianDate = (date = new Date()) => (date.getTime() / 86400000) - (date.getTimezoneOffset() / 1440) + 2440587.5;

/**
 * Get the age of the moon.
 * @returns {number}   The age of the moon.
 */
const ageOfMoon = (date = new Date()) => { return (getJulianDate(date) - 2451550.1) % lunarMonth };

/**
 * Get the moon phase.
 * @param {Date} date  The date object to get the moon phase for.
 * @returns {object}   The moon phase in the Object/dict. (Pythonic word spotted :siren:)
 */
const getMoonPhase = (date = new Date()) => {
  const phase = Math.floor((ageOfMoon(date) / lunarMonth) * 8) % 8;
  return phasesObject[phase] || "Oops";
};

